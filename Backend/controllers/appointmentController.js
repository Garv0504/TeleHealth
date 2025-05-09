const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const {
  sendAppointmentNotification,
} = require("../services/notificationService");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse ");
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
  const { doctorId, date, startTime, endTime, reason } = req.body;
  const patientId = req.user.id;

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

  // Check for existing appointments in this slot
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    startTime,
    endTime,
    status: { $in: ["confirmed", "pending"] },
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
    status: "pending",
  });

  // Send notifications
  await sendAppointmentNotification(appointment, "created");

  res.status(201).json({
    success: true,
    data: appointment,
  });
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

// @desc    Get user appointments
// @route   GET /api/appointments
exports.getUserAppointments = asyncHandler(async (req, res, next) => {
  let query = {};
  const { status, startDate, endDate } = req.query;

  if (req.user.role === "patient") {
    query.patient = req.user.id;
  } else if (req.user.role === "doctor") {
    query.doctor = req.user.id;
  } else {
    query = {}; // Admin can see all
  }

  if (status) query.status = status;
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const appointments = await Appointment.find(query)
    .populate(req.user.role === "patient" ? "doctor" : "patient")
    .sort({ date: 1, startTime: 1 });

  res.status(200).json({ success: true, data: appointments });
});
