// @desc    Book appointment from available slot
// @route   POST /api/appointments
exports.bookAppointment = asyncHandler(async (req, res, next) => {
	const { doctorId, date, startTime, endTime, reason } = req.body;
	const patientId = req.user.id;

	// Validate input
	if (!doctorId || !date || !startTime || !endTime || !reason) {
		return next(new ErrorResponse("Missing required fields", 400));
	}

	const appointmentDate = new Date(date);
	const dayOfWeek = appointmentDate.getDay();

	// Verify slot is in doctor's availability
	const availability = await Availability.findOne({
		doctor: doctorId,
		dayOfWeek,
		slots: {
			$elemMatch: {
				startTime,
				endTime,
				isAvailable: true,
			},
		},
	});

	if (!availability) {
		return next(new ErrorResponse("Selected slot is not available", 400));
	}

	// Check for existing appointments in this slot
	const existingAppointment = await Appointment.findOne({
		doctor: doctorId,
		date: appointmentDate,
		startTime,
		endTime,
		status: { $in: ["confirmed", "pending"] },
	});

	if (existingAppointment) {
		return next(new ErrorResponse("Slot is already booked", 400));
	}

	// Create appointment
	const appointment = await Appointment.create({
		patient: patientId,
		doctor: doctorId,
		date: appointmentDate,
		startTime,
		endTime,
		reason,
		status: "confirmed", // or "pending" depending on your flow
		paymentStatus: "paid", // or "pending" if payment isn't complete yet
	});

	// Send notifications
	await sendAppointmentNotification(appointment, "created");

	res.status(201).json({
		success: true,
		data: appointment,
	});
});