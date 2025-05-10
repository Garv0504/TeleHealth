const express = require("express");
const {
  setAvailability,
  getAvailability,
} = require("../controllers/availabilityController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("doctor", "admin"), setAvailability)
  .get(getAvailability);

module.exports = router;
