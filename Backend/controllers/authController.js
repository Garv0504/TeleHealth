const User = require("../models/User");
const Patient = require("../models/Patients");
const Doctor = require("../models/Doctor");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse ");


// @desc    Register user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { role, firstName, lastName, email, password } = req.body;

  // Create base user
  const user = await User.create({
    role,
    firstName,
    lastName,
    email,
    password,
  });

  // Create role-specific profile
  if (role === "patient") {
    await Patient.create({
      user: user._id,
      ...req.body.patientDetails,
    });
  } else if (role === "doctor") {
    await Doctor.create({
      user: user._id,
      ...req.body.doctorDetails,
    });
  }

  // Mark profile as complete if all required fields are provided
  user.isProfileComplete = true;
  await user.save();

  // Generate token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Generate token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// // ... (keep other methods the same)
