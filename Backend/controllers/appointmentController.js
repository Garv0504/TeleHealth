const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const {
  sendAppointmentNotification,
} = require("../services/notificationService");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const moment = require("moment");

// @desc    Get available slots for doctor on specific date
// @route   GET /api/appointments/availability/:doctorId
exports.getAvailableSlots = asyncHandler(async (req, res, next) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date) {
    return next(
      new ErrorResponse("Please provide date in YYYY-MM-DD format", 400)
    );
  }

  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.getDay();

  // Get doctor's availability for this day of week
  const availability = await Availability.findOne({
    doctor: doctorId,
    dayOfWeek,
    validFrom: { $lte: appointmentDate },
    $or: [
      { validTo: { $exists: false } },
      { validTo: { $gte: appointmentDate } },
    ],
  });

  if (!availability) {
    return res.status(200).json({ success: true, data: [] });
  }

  // Get existing appointments for this date
  const existingAppointments = await Appointment.find({
    doctor: doctorId,
    date: appointmentDate,
    status: { $in: ["confirmed", "pending"] },
  });

  // Filter available slots
  const availableSlots = availability.slots.filter((slot) => {
    const isBooked = existingAppointments.some(
      (appt) =>
        appt.startTime === slot.startTime && appt.endTime === slot.endTime
    );
    return slot.isAvailable && !isBooked;
  });

  res.status(200).json({
    success: true,
    data: availableSlots,
  });
});

// @desc    Book appointment from available slot
// @route   POST /api/appointments
exports.bookAppointment = asyncHandler(async (req, res, next) => {
  const { doctorId, date, startTime, endTime, reason, meetingUrl } = req.body;
  const patientId = req.body.patientId.id;

  // Validate input
  if (!doctorId || !date || !startTime || !endTime || !reason) {
    return next(new ErrorResponse("Missing required fields", 400));
  }

  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.getDay();

  console.log(dayOfWeek);

  // Verify slot is in doctor's availability
  const availability = await Availability.findOne({
    doctor: doctorId,
    dayOfWeek,
    slots: {
      $elemMatch: {
        startTime,
        endTime,
        isAvailable: true,
      },
    },
  });

  if (!availability) {
    return next(new ErrorResponse("Selected slot is not available", 400));
  }

  // Check for exis         ting appointments in this slot
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    startTime,
    endTime,
    status: { $in: ["confirmed", "pending", "completed"] },
  });

  if (existingAppointment) {
    return next(new ErrorResponse("Slot is already booked", 400));
  }

  // Create appointment
  const appointment = await Appointment.create({
    patient: patientId,
    doctor: doctorId,
    date: appointmentDate,
    startTime,
    endTime,
    reason,
    status: "completed",
    paymentStatus: "paid",
    meetingUrl,
  });

  await Availability.updateOne(
    {
      doctor: doctorId,
      dayOfWeek: dayOfWeek,
      "slots.startTime": startTime,
      "slots.endTime": endTime,
    },
    {
      $set: { "slots.$.isAvailable": false },
    }
  );

  // Send notifications
  await sendAppointmentNotification(appointment, "created");

  res.status(201).json({
    success: true,
    data: appointment,
  });
  // const { doctorId, date, startTime, endTime, reason } = req.body;
  // const patientId = req.body.patientId.id;

  // // Validate input
  // if (!doctorId || !date || !startTime || !endTime || !reason) {
  // 	return next(new ErrorResponse("Missing required fields", 400));
  // }

  // const appointmentDate = new Date(date);
  // const dayOfWeek = appointmentDate.getDay();
  // // Adjust for Sunday

  // // Verify slot is in doctor's availability
  // const availability = await Availability.findOne({
  // 	doctor: doctorId,
  // 	dayOfWeek: dayOfWeek,
  // 	slots: {
  // 		$elemMatch: {
  // 			startTime: startTime,
  // 			endTime: endTime,
  // 			isAvailable: true,
  // 		},
  // 	},
  // });

  // if (!availability) {
  // 	return next(new ErrorResponse("Selected slot is not available", 400));
  // }

  // // Check for existing appointments in this slot
  // const existingAppointment = await Appointment.findOne({
  // 	doctor: doctorId,
  // 	date: appointmentDate,
  // 	startTime,
  // 	endTime,
  // 	status: { $in: ["confirmed", "pending"] },
  // });

  // if (existingAppointment) {
  // 	return next(new ErrorResponse("Slot is already booked", 400));
  // }

  // // Create appointment
  // const appointment = await Appointment.create({
  // 	patient: patientId,
  // 	doctor: doctorId,
  // 	date: appointmentDate,
  // 	startTime,
  // 	endTime,
  // 	reason,
  // 	status: "success",
  // 	paymentStatus: "success",
  // });

  // // Send notifications
  // await sendAppointmentNotification(appointment, "created");

  // res.status(201).json({
  // 	success: true,
  // 	data: appointment,
  // });
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
exports.updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate("patient doctor");

  if (!appointment) {
    return next(new ErrorResponse("Appointment not found", 404));
  }

  await sendAppointmentNotification(appointment, "updated");

  res.status(200).json({ success: true, data: appointment });
});

// @desc    Get user appointments with populated doctor and patient details
// @route   GET /api/appointments
exports.getUserAppointments = asyncHandler(async (req, res, next) => {
  let query = {};
  const { status, startDate, endDate } = req.query;

  // Set base query based on user role
  if (req.user.role === "patient") {
    query.patient = req.user.id;
  } else if (req.user.role === "doctor") {
    query.doctor = req.user.id;
  }
  // Admin case - no specific filtering needed

  // Add status filter if provided
  if (status) query.status = status;

  // Add date range filter if provided
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Fetch appointments with populated data
  const appointments = await Appointment.find(query)
    .populate({
      path: "patient",
      select: "user bloodGroup height weight",
      populate: {
        path: "user",
        select:
          "firstName lastName email phone dateOfBirth gender profilePicture",
      },
    })
    .populate({
      path: "doctor",
      select: "user specialty qualifications consultationFee",
      populate: {
        path: "user",
        select: "firstName lastName email phone profilePicture",
      },
    })
    .populate("payment")
    .sort({ date: 1, startTime: 1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
});

// @desc    Get appointments by doctor ID (Admin or Doctor only)
// @route   GET /api/appointments/doctor/:doctorId
// GET /api/appointments/patient/:patientId
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    })
      .populate({
        path: "doctor",
        populate: { path: "user", select: "firstName lastName email" },
      })
      .populate("patient");

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving patient appointments", error });
  }
};

// @desc    Get appointments by patient ID (Admin, Doctor, or Patient themselves)
// @route   GET /api/appointments/patient/:patientId
// exports.getAppointmentsByPatientId = asyncHandler(async (req, res, next) => {
//   const { patientId } = req.params;

//   // Only admin, doctor, or the patient themselves can access this
//   if (req.user.role === "patient" && req.user.id !== patientId) {
//     return next(
//       new ErrorResponse("Not authorized to access these appointments", 403)
//     );
//   }

//   const { status, startDate, endDate } = req.query;
//   const query = { patient: patientId };

//   if (status) query.status = status;
//   if (startDate && endDate) {
//     query.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate),
//     };
//   }

//   const appointments = await Appointment.find(query)
//     .populate("doctor", "name specialty")
//     .sort({ date: 1, startTime: 1 });

//   res.status(200).json({
//     success: true,
//     count: appointments.length,
//     data: appointments,
//   });
// });

// @desc    Get appointments by both doctor and patient ID (Admin or the users themselves)
// @route   GET /api/appointments/doctor/:doctorId/patient/:patientId
// exports.getAppointmentsByDoctorAndPatient = asyncHandler(
//   async (req, res, next) => {
//     const { doctorId, patientId } = req.params;

//     // Authorization check
//     if (req.user.role === "patient" && req.user.id !== patientId) {
//       return next(
//         new ErrorResponse("Not authorized to access these appointments", 403)
//       );
//     }
//     if (req.user.role === "doctor" && req.user.id !== doctorId) {
//       return next(
//         new ErrorResponse("Not authorized to access these appointments", 403)
//       );
//     }

//     const { status, startDate, endDate } = req.query;
//     const query = {
//       doctor: doctorId,
//       patient: patientId,
//     };

//     if (status) query.status = status;
//     if (startDate && endDate) {
//       query.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }

//     const appointments = await Appointment.find(query)
//       .populate("doctor", "name specialty")
//       .populate("patient", "name email phone")
//       .sort({ date: 1, startTime: 1 });

//     res.status(200).json({
//       success: true,
//       count: appointments.length,
//       data: appointments,
//     });
//   }
// );
