const express = require("express");
const {
<<<<<<< HEAD
	getAvailableSlots,
	bookAppointment,
	updateAppointmentStatus,
	getUserAppointments,
	getAppointmentsByDoctorId,
	getAppointmentsByPatientId,
	getAppointmentsByDoctorAndPatient,
=======
  getAvailableSlots,
  bookAppointment,
  updateAppointmentStatus,
  getUserAppointments,
  getAppointmentsByDoctorId,
  getAppointmentsByPatient,
  getAppointmentsByDoctorAndPatient,
>>>>>>> 7ddd034 (After Correcting Dashboard data)
} = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/availability/:doctorId", getAvailableSlots);
router.get("/", protect, getUserAppointments);
router.post("/book-appointment", bookAppointment);
router.put("/:id/status", protect, updateAppointmentStatus);

// Getting the appointment Details for patient and doctor

<<<<<<< HEAD
router.get("/doctor/:doctorId", protect, getAppointmentsByDoctorId);
router.get("/patient/:patientId", protect, getAppointmentsByPatientId);
router.get(
	"/doctor/:doctorId/patient/:patientId",
	protect,
	getAppointmentsByDoctorAndPatient
);
=======
// router.get("/doctor/:doctorId", protect, getAppointmentsByPatient);
router.get("/patient/:patientId", protect, getAppointmentsByPatient);
// router.get(
//   "/doctor/:doctorId/patient/:patientId",
//   protect,
//   getAppointmentsByDoctorAndPatient
// );
>>>>>>> 7ddd034 (After Correcting Dashboard data)

module.exports = router;
