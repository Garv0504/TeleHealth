import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
	Calendar,
	Clock,
	User,
	AlertCircle,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import axios from "axios";
import { handlepay } from "../../../../services/Payments";

// Memoized components to prevent unnecessary re-renders
const DoctorItem = memo(({ doctor, isSelected, onClick }) => (
	<div
		className={`p-4 border rounded-lg cursor-pointer transition-all ${
			isSelected
				? "border-blue-500 bg-blue-50"
				: "border-gray-200 hover:border-blue-300"
		}`}
		onClick={onClick}
	>
		<div className="flex items-center">
			<div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
				{doctor.image ? (
					<img
						src={doctor.image}
						alt={doctor.name}
						className="h-16 w-16 rounded-full"
					/>
				) : (
					<User className="h-8 w-8 text-gray-500" />
				)}
			</div>
			<div className="ml-4">
				<h3 className="text-lg font-medium text-gray-900">
					{doctor.user.firstName}
				</h3>
				{doctor.rating && (
					<div className="flex items-center text-sm text-yellow-500 mt-1">
						{"★".repeat(Math.floor(doctor.rating))}
						<span className="text-gray-500 ml-1">{doctor.rating}</span>
					</div>
				)}
			</div>
		</div>
	</div>
));

const TimeSlot = memo(({ slot, isSelected, onClick }) => (
	<button
		className={`py-2 px-3 border rounded-md text-sm transition-colors ${
			isSelected
				? "bg-blue-600 text-white border-blue-600"
				: slot.isAvailable
				? "border-gray-300 hover:border-blue-500"
				: "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
		}`}
		onClick={() => slot.isAvailable && onClick(slot)}
		disabled={!slot.isAvailable}
	>
		<div className="flex items-center justify-between">
			<span>
				{slot.startTime} - {slot.endTime}
			</span>
			<span className="text-xs">
				{slot.isAvailable ? "✓ Available" : "✕ Booked"}
			</span>
		</div>
	</button>
));

const BookAppointment = ({ onClose, onSuccess }) => {
	const [step, setStep] = useState(1);
	const [doctors, setDoctors] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [weekDates, setWeekDates] = useState([]);
	const [timeSlots, setTimeSlots] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [loadingDoctors, setLoadingDoctors] = useState(false);
	const [loadingSlots, setLoadingSlots] = useState(false);
	const [loadingBooking, setLoadingBooking] = useState(false);
	const [error, setError] = useState(null);
	const [reason, setReason] = useState("");
	const navigate = useNavigate();

	// API endpoints
	const API_BASE_URL = "http://localhost:5000/api";
	const ENDPOINTS = {
		doctors: `${API_BASE_URL}/auth/doctors`,
		availability: `${API_BASE_URL}/appointments/availability`,
		appointments: `${API_BASE_URL}/appointments/book-appointment`,
	};

	// Generate a week of dates starting from the selected date
	useEffect(() => {
		const generateWeekDates = () => {
			const dates = [];
			const startDate = new Date(selectedDate);
			startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday

			for (let i = 0; i < 7; i++) {
				const date = new Date(startDate);
				date.setDate(startDate.getDate() + i);
				dates.push(date);
			}

			return dates;
		};

		setWeekDates(generateWeekDates());
	}, [selectedDate]);

	// Fetch all doctors on component mount
	useEffect(() => {
		const fetchAllDoctors = async () => {
			setLoadingDoctors(true);
			setError(null);

			try {
				const response = await axios.get(ENDPOINTS.doctors, {
					headers: {
						"Cache-Control": "no-cache",
						"Pragma": "no-cache",
					},
				});
				setDoctors(response.data);
				if (response.data.length === 0) {
					setError("No doctors available.");
				}
			} catch (err) {
				setError("Failed to load doctors. Please try again.");
				console.error("Error fetching doctors:", err);
				setDoctors([]);
			} finally {
				setLoadingDoctors(false);
			}
		};

		fetchAllDoctors();
	}, []);

	// Fetch time slots when doctor and date are selected
	useEffect(() => {
		const fetchAvailableSlots = async () => {
			if (!selectedDoctor || !selectedDate) return;

			setLoadingSlots(true);
			setError(null);
			setSelectedSlot(null); // Reset selected slot when changing date/doctor

			try {
				const formattedDate = selectedDate.toISOString().split("T")[0];
				const response = await axios.get(
					`${ENDPOINTS.availability}/${selectedDoctor.user._id}?date=${formattedDate}`,
					{
						headers: {
							"Cache-Control": "no-cache",
							"Pragma": "no-cache",
						},
					}
				);
				setTimeSlots(response.data.data);
			} catch (err) {
				setError("Failed to load time slots. Please try again.");
				console.error("Error fetching time slots:", err);
				setTimeSlots([]);
			} finally {
				setLoadingSlots(false);
			}
		};

		const debounceTimer = setTimeout(() => {
			fetchAvailableSlots();
		}, 300);

		return () => clearTimeout(debounceTimer);
	}, [selectedDoctor, selectedDate]);

	// Book the appointment
	const handleBookAppointment = async () => {
		if (!selectedDoctor || !selectedSlot || !reason.trim()) {
			setError("Please fill all required fields");
			return;
		}

		setLoadingBooking(true);
		setError(null);

		try {
			const appointmentData = {
				patientId: JSON.parse(localStorage.getItem("user")),
				doctorId: selectedDoctor.user,
				date: selectedDate.toISOString().split("T")[0],
				startTime: selectedSlot.startTime,
				endTime: selectedSlot.endTime,
				reason,
				meetingUrl: "",
			};

			// 1. Initiate payment
			const paymentResponse = await handlepay({
				amount: selectedDoctor.consultationFee,
				name: `${selectedDoctor.user.firstName} ${selectedDoctor.user.lastName}`,
				email: JSON.parse(localStorage.getItem("user")).email,
				phone: "4835487234", // Should come from user profile
			});
      console.log(paymentResponse)

			// 2. Only proceed if payment was successful
			if (paymentResponse.success) {
				const token = localStorage.getItem("token");
				const response = await axios.post(
					"http://localhost:5000/api/appointments/book-appointment",
					{
						...appointmentData,
						status: "confirmed",
						paymentId: paymentResponse.paymentId,
						meetingUrl: "https:google.com", // Implement this function
					},
					{
						headers: {
							"Authorization": `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (onSuccess) onSuccess(response.data);
			}
		} catch (err) {
			const errorMessage =
				err.response?.data?.message ||
				err.message ||
				"Failed to book appointment";
			setError(errorMessage);
			console.error("Booking error:", err);
		} finally {
			setLoadingBooking(false);
		}
	};

	const nextStep = () => {
		if (step === 1 && !selectedDoctor) {
			setError("Please select a doctor");
			return;
		}
		if (step === 2 && !selectedSlot) {
			setError("Please select a time slot");
			return;
		}

		setError(null);
		setStep(step + 1);
	};

	const prevStep = () => {
		setError(null);
		setStep(step - 1);
	};

	const handlePrevWeek = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 7);
		setSelectedDate(newDate);
	};

	const handleNextWeek = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 7);
		setSelectedDate(newDate);
	};

	const isSameDay = (date1, date2) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const closeAppointment = () => {
		setStep(1);
		setSelectedDoctor(null);
		setSelectedDate(new Date());
		setTimeSlots([]);
		setSelectedSlot(null);
		setReason("");
		navigate("/patient-dashboard/appointments");
	};

	const renderDoctorSelection = () => {
		return (
			<div>
				<h2 className="text-lg font-medium text-gray-800 mb-4">
					Select a Doctor
				</h2>

				{loadingDoctors ? (
					<div className="text-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
						<p className="mt-2 text-gray-500">Loading doctors...</p>
					</div>
				) : doctors.length === 0 ? (
					<div className="text-center py-8 bg-gray-50 rounded-lg">
						<p className="text-gray-500">No doctors found</p>
					</div>
				) : (
					<div className="space-y-4">
						{doctors.map((doctor) => (
							<DoctorItem
								key={doctor._id}
								doctor={doctor}
								isSelected={selectedDoctor?._id === doctor._id}
								onClick={() => {
									if (selectedDoctor?._id !== doctor._id) {
										setSelectedDoctor(doctor);
									}
								}}
							/>
						))}
					</div>
				)}
			</div>
		);
	};

	const renderCalendarSelection = () => {
		const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		return (
			<div>
				<h2 className="text-lg font-medium text-gray-800 mb-4">
					Select Date & Time for Dr. {selectedDoctor?.user.firstName}
				</h2>

				{/* Date Selection */}
				<div className="mb-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-700">Select Date</h3>
						<div className="flex space-x-2">
							<button
								onClick={handlePrevWeek}
								className="p-1 rounded-full hover:bg-gray-200"
							>
								<ChevronLeft size={16} />
							</button>
							<button
								onClick={handleNextWeek}
								className="p-1 rounded-full hover:bg-gray-200"
							>
								<ChevronRight size={16} />
							</button>
						</div>
					</div>

					<div className="grid grid-cols-7 gap-1">
						{weekDates.map((date, index) => (
							<div key={index} className="text-center">
								<div className="text-xs text-gray-500 mb-1">
									{daysOfWeek[date.getDay()]}
								</div>
								<button
									className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
										isSameDay(date, selectedDate)
											? "bg-blue-600 text-white"
											: "hover:bg-gray-100"
									}`}
									onClick={() => setSelectedDate(date)}
								>
									{date.getDate()}
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Time Slot Selection */}
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-2">
						Select Time
					</h3>

					{loadingSlots ? (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-2 text-gray-500">Loading available slots...</p>
						</div>
					) : timeSlots.length === 0 ? (
						<div className="text-center py-8 bg-gray-50 rounded-lg">
							<Clock className="h-8 w-8 text-gray-400 mx-auto" />
							<p className="mt-2 text-gray-500">
								No available slots for this date
							</p>
						</div>
					) : (
						<div className="grid grid-cols-3 gap-2">
							{timeSlots.map((slot) => (
								<TimeSlot
									key={slot._id}
									slot={slot}
									isSelected={selectedSlot?._id === slot._id}
									onClick={setSelectedSlot}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		);
	};

	const renderConfirmation = () => {
		return (
			<div>
				<h2 className="text-lg font-medium text-gray-800 mb-4">
					Confirm Appointment
				</h2>

				<div className="bg-gray-50 p-4 rounded-lg mb-4">
					<div className="mb-3">
						<span className="text-sm text-gray-500">Doctor</span>
						<p className="font-medium">{selectedDoctor?.user.firstName}</p>
						{selectedDoctor?.specialty && (
							<p className="text-sm text-gray-500">
								{selectedDoctor.specialty}
							</p>
						)}
					</div>
					<div className="mb-3">
						<span className="text-sm text-gray-500">Date</span>
						<p className="font-medium">
							{selectedDate.toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
					<div className="mb-3">
						<span className="text-sm text-gray-500">Time</span>
						<p className="font-medium">
							{selectedSlot?.startTime} - {selectedSlot?.endTime}
						</p>
					</div>
				</div>

				<div className="mb-4">
					<label
						htmlFor="reason"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Reason for Visit*
					</label>
					<textarea
						id="reason"
						rows="3"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Please describe your symptoms or reason for this appointment"
						value={reason}
						onChange={(e) => setReason(e.target.value)}
					></textarea>
				</div>

				<div className="bg-blue-50 border-l-4 border-blue-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<AlertCircle className="h-5 w-5 text-blue-400" />
						</div>
						<div className="ml-3">
							<p className="text-sm text-blue-700">
								By confirming this appointment, you agree to our cancellation
								policy. Please arrive 15 minutes before your scheduled time.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white rounded-lg shadow-lg">
			{/* Header */}
			<div className="px-6 py-4 border-b">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-800">
						Book an Appointment
					</h2>
					<button
						onClick={() => closeAppointment()}
						className="text-gray-400 hover:text-gray-500"
					>
						&times;
					</button>
				</div>
			</div>

			{/* Progress Tracker */}
			<div className="px-6 py-4 border-b bg-gray-50">
				<div className="flex items-center">
					<div
						className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
							step >= 1
								? "bg-blue-600 border-blue-600 text-white"
								: "border-gray-300 text-gray-500"
						}`}
					>
						1
					</div>
					<div
						className={`flex-1 h-0.5 mx-2 ${
							step >= 2 ? "bg-blue-600" : "bg-gray-300"
						}`}
					></div>
					<div
						className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
							step >= 2
								? "bg-blue-600 border-blue-600 text-white"
								: "border-gray-300 text-gray-500"
						}`}
					>
						2
					</div>
					<div
						className={`flex-1 h-0.5 mx-2 ${
							step >= 3 ? "bg-blue-600" : "bg-gray-300"
						}`}
					></div>
					<div
						className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
							step >= 3
								? "bg-blue-600 border-blue-600 text-white"
								: "border-gray-300 text-gray-500"
						}`}
					>
						3
					</div>
				</div>
				<div className="flex justify-between mt-1 text-xs text-gray-500">
					<span>Doctor</span>
					<span>Schedule</span>
					<span>Confirm</span>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{error && (
					<div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
						<div className="flex">
							<div className="flex-shrink-0">
								<AlertCircle className="h-5 w-5 text-red-400" />
							</div>
							<div className="ml-3">
								<p className="text-sm text-red-700">{error}</p>
							</div>
						</div>
					</div>
				)}

				{step === 1 && renderDoctorSelection()}
				{step === 2 && renderCalendarSelection()}
				{step === 3 && renderConfirmation()}
			</div>

			{/* Footer */}
			<div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
				{step > 1 ? (
					<button
						onClick={prevStep}
						className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
						disabled={loadingDoctors || loadingSlots || loadingBooking}
					>
						Back
					</button>
				) : (
					<button
						onClick={() => navigate("/patient-dashboard/appointments")}
						className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
						disabled={loadingDoctors || loadingSlots || loadingBooking}
					>
						Cancel
					</button>
				)}

				{step < 3 ? (
					<button
						onClick={nextStep}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
						disabled={loadingDoctors || loadingSlots || loadingBooking}
					>
						Next
					</button>
				) : (
					<button
						onClick={handleBookAppointment}
						disabled={loadingBooking}
						className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
							loadingBooking ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
						}`}
					>
						{loadingBooking ? "Booking..." : "Confirm Booking"}
					</button>
				)}
			</div>
		</div>
	);
};

export default BookAppointment;
