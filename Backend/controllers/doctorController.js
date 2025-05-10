const Doctor = require("../models/Doctor"); // path to Doctor model

// GET /api/doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "-password"); // populate user, exclude password
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

module.exports = { getAllDoctors };
