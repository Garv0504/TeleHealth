const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const moment = require("moment");

// @desc    Check if slot is valid and available
// @route   POST /api/appointments/check-availability
exports.checkSlotAvailability = async (doctorId, date, startTime, endTime) => {
  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.getDay();

  // Check if slot exists in doctor's availability
  const availability = await Availability.findOne({
    doctor: doctorId,
    dayOfWeek,
    "slots.startTime": startTime,
    "slots.endTime": endTime,
    "slots.isAvailable": true,
    validFrom: { $lte: appointmentDate },
    $or: [
      { validTo: { $exists: false } },
      { validTo: { $gte: appointmentDate } },
    ],
  });

  if (!availability) {
    return { available: false, reason: "Slot not in availability" };
  }

  // Check if slot is already booked
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    startTime,
    endTime,
    status: { $in: ["confirmed", "pending"] },
  });

  if (existingAppointment) {
    return { available: false, reason: "Slot already booked" };
  }

  return { available: true };
};

// @desc    Get doctor's working hours for a specific date
exports.getDoctorWorkingHours = async (doctorId, date) => {
  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.getDay();

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
    return null;
  }

  return availability.slots
    .filter((slot) => slot.isAvailable)
    .map((slot) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));
};
