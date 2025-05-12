const Availability = require("../models/Availability");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Set doctor availability
// @route   POST /api/availability
exports.setAvailability = asyncHandler(async (req, res, next) => {
  const { dayOfWeek, slots, isRecurring, validTo } = req.body;
  const doctorId = req.user.id;

  // Validate input
  if (!dayOfWeek || !slots || !Array.isArray(slots)) {
    return next(new ErrorResponse("Invalid availability data", 400));
  }

  // Check for existing availability
  let availability = await Availability.findOne({
    doctor: doctorId,
    dayOfWeek,
  });

  if (availability) {
    // Update existing availability
    availability.slots = slots;
    availability.isRecurring = isRecurring;
    if (validTo) availability.validTo = new Date(validTo);
  } else {
    // Create new availability
    availability = await Availability.create({
      doctor: doctorId,
      dayOfWeek,
      slots,
      isRecurring,
      validTo: validTo ? new Date(validTo) : null,
    });
  }

  await availability.save();

  res.status(200).json({
    success: true,
    data: availability,
  });
});

// @desc    Get doctor availability
// @route   GET /api/availability
exports.getAvailability = asyncHandler(async (req, res, next) => {
  // console.log(req)
  const availabilities = await Availability.find({});

  res.status(200).json({
    success: true,
    data: availabilities,
  });
});
