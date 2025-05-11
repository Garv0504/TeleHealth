const express = require("express");
const {
  getAvailableSlots,
  bookAppointment,
  updateAppointmentStatus,
  getUserAppointments,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorAndPatient,
} = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/availability/:doctorId", getAvailableSlots);
router.get("/", protect, getUserAppointments);
router.post("/book-appointment", bookAppointment);
router.put("/:id/status", protect, updateAppointmentStatus);

// Getting the appointment Details for patient and doctor

router.get("/doctor/:doctorId", protect, getAppointmentsByDoctorId);
router.get("/patient/:patientId", protect, getAppointmentsByPatientId);
router.get(
  "/doctor/:doctorId/patient/:patientId",
  protect,
  getAppointmentsByDoctorAndPatient
);

module.exports = router;