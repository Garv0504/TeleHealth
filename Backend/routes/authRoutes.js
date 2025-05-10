const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { getAllDoctors } = require("../controllers/doctorController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

router.get("/doctors", getAllDoctors); // GET /api/doctors

module.exports = router;
