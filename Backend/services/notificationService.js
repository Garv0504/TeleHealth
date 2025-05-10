const User = require("../models/User");
const { sendEmail } = require("./emailService");
// const { sendSMS } = require('./smsService');
const Notification = require("../models/Notification");
const moment = require("moment");

exports.sendAppointmentNotification = async (appointment, action) => {
  try {
    const [patient, doctor] = await Promise.all([
      User.findById(appointment.patient),
      User.findById(appointment.doctor),
    ]);

    const dateStr = moment(appointment.date).format("MMMM Do YYYY");
    const timeStr = `${appointment.startTime}-${appointment.endTime}`;

    let subject, message;

    switch (action) {
      case "created":
        subject = "New Appointment Scheduled";
        message = `Your appointment has been scheduled for ${dateStr} at ${timeStr}`;
        break;
      case "updated":
        subject = "Appointment Updated";
        message = `Your appointment has been updated to ${dateStr} at ${timeStr}`;
        break;
      case "reminder":
        subject = "Appointment Reminder";
        message = `Reminder: You have an appointment tomorrow at ${timeStr}`;
        break;
      default:
        subject = "Appointment Notification";
        message = `Appointment details: ${dateStr} at ${timeStr}`;
    }

    // Send to patient
    if (patient.email) {
      await sendEmail({
        email: patient.email,
        subject,
        html: `<p>${message}</p>`,
      });
    }

    // if (patient.phone) {
    //   await sendSMS({
    //     phone: patient.phone,
    //     message: `${subject}: ${message}`
    //   });
    // }

    // Send to doctor
    if (doctor.email) {
      await sendEmail({
        email: doctor.email,
        subject,
        html: `<p>${message}</p>`,
      });
    }

    // if (doctor.phone) {
    //   await sendSMS({
    //     phone: doctor.phone,
    //     message: `${subject}: ${message}`
    //   });
    // }
  } catch (err) {
    console.error("Notification error:", err);
  }
};
