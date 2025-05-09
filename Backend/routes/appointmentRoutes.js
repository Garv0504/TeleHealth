const express = require("express");
const {
  getAvailableSlots,
  bookAppointment,
  updateAppointmentStatus,
  getUserAppointments,
} = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/availability/:doctorId", getAvailableSlots);
router.get("/", protect, getUserAppointments);
router.post("/", protect, authorize("patient", "admin"), bookAppointment);
router.put("/:id/status", protect, updateAppointmentStatus);

module.exports = router;
