import React, { useState } from "react";
import { Calendar, PlusCircle, X, Clock, CreditCard } from "lucide-react";
import { appointments } from "../../../data/patientData";

const specialties = [
	{ id: 1, name: "Cardiology" },
	{ id: 2, name: "Dermatology" },
	{ id: 3, name: "General Medicine" },
	{ id: 4, name: "Orthopedics" },
	{ id: 5, name: "Pediatrics" },
];

const doctors = {
	"Cardiology": [
		{ id: 1, name: "Dr. Sharma", experience: "15 years", rating: 4.8, fee: 75 },
		{ id: 2, name: "Dr. Patel", experience: "12 years", rating: 4.6, fee: 70 },
	],
	"Dermatology": [
		{ id: 3, name: "Dr. Singh", experience: "10 years", rating: 4.7, fee: 65 },
		{ id: 4, name: "Dr. Kumar", experience: "8 years", rating: 4.5, fee: 60 },
	],
	"General Medicine": [
		{ id: 5, name: "Dr. Gupta", experience: "20 years", rating: 4.9, fee: 80 },
		{ id: 6, name: "Dr. Verma", experience: "14 years", rating: 4.7, fee: 70 },
	],
};

const generateTimeSlots = () => {
	const slots = [];
	const days = 7;
	const today = new Date();

	for (let i = 0; i < days; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);

		const daySlots = [];
		for (let hour = 9; hour < 17; hour++) {
			daySlots.push({
				time: `${hour}:00`,
				available: Math.random() > 0.3,
			});
		}

		slots.push({
			date: date.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
			}),
			slots: daySlots,
		});
	}
	return slots;
};

const Appointments = () => {
	const [activeTab, setActiveTab] = useState("upcoming");
	const [showBooking, setShowBooking] = useState(false);
	const [bookingStep, setBookingStep] = useState(1);
	const [selectedSpecialty, setSelectedSpecialty] = useState("");
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [timeSlots, setTimeSlots] = useState([]);

	const currentDate = new Date();

	const upcomingAppointments = appointments
		.filter((app) => new Date(app.date) >= currentDate)
		.sort((a, b) => new Date(a.date) - new Date(b.date));

	const pastAppointments = appointments
		.filter((app) => new Date(app.date) < currentDate)
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	const handleSpecialtySelect = (specialty) => {
		setSelectedSpecialty(specialty);
		setBookingStep(2);
	};

	const handleDoctorSelect = (doctor) => {
		setSelectedDoctor(doctor);
		setTimeSlots(generateTimeSlots());
		setBookingStep(3);
	};

	const handleSlotSelect = (date, time) => {
		setSelectedSlot({ date, time });
		setBookingStep(4);
	};

	const handlePayment = () => {
		alert("Payment successful! Appointment booked.");
		setShowBooking(false);
		setBookingStep(1);
		setSelectedSpecialty("");
		setSelectedDoctor(null);
		setSelectedSlot(null);
	};

	const BookingModal = () => (
		<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white border border-[#E5E7EB] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Book Appointment</h2>
					<button
						onClick={() => setShowBooking(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>

				{bookingStep === 1 && (
					<div>
						<h3 className="text-lg font-medium mb-4">Select Specialty</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{specialties.map((specialty) => (
								<button
									key={specialty.id}
									onClick={() => handleSpecialtySelect(specialty.name)}
									className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
								>
									{specialty.name}
								</button>
							))}
						</div>
					</div>
				)}

				{bookingStep === 2 && doctors[selectedSpecialty] && (
					<div>
						<h3 className="text-lg font-medium mb-4">Select Doctor</h3>
						<div className="space-y-4">
							{doctors[selectedSpecialty].map((doctor) => (
								<button
									key={doctor.id}
									onClick={() => handleDoctorSelect(doctor)}
									className="w-full p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
								>
									<div className="flex justify-between items-start">
										<div>
											<h4 className="font-medium">{doctor.name}</h4>
											<p className="text-sm text-gray-500">
												Experience: {doctor.experience}
											</p>
										</div>
										<div className="text-right">
											<div className="text-sm font-medium">${doctor.fee}</div>
											<div className="text-sm text-gray-500">
												Rating: {doctor.rating}/5
											</div>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				)}

				{bookingStep === 3 && (
					<div>
						<h3 className="text-lg font-medium mb-4">Select Time Slot</h3>
						<div className="space-y-4">
							{timeSlots.map((day, index) => (
								<div key={index} className="border rounded-lg p-4">
									<h4 className="font-medium mb-2">{day.date}</h4>
									<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
										{day.slots.map((slot, slotIndex) => (
											<button
												key={slotIndex}
												disabled={!slot.available}
												onClick={() => handleSlotSelect(day.date, slot.time)}
												className={`p-2 rounded text-sm ${
													slot.available
														? "bg-blue-50 hover:bg-blue-100 text-blue-700"
														: "bg-gray-100 text-gray-400 cursor-not-allowed"
												}`}
											>
												<Clock size={14} className="inline mr-1" />
												{slot.time}
											</button>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{bookingStep === 4 && (
					<div>
						<h3 className="text-lg font-medium mb-4">Confirm & Pay</h3>
						<div className="bg-gray-50 p-4 rounded-lg mb-4">
							<div className="space-y-2">
								<p>
									<span className="font-medium">Doctor:</span>{" "}
									{selectedDoctor.name}
								</p>
								<p>
									<span className="font-medium">Specialty:</span>{" "}
									{selectedSpecialty}
								</p>
								<p>
									<span className="font-medium">Date:</span> {selectedSlot.date}
								</p>
								<p>
									<span className="font-medium">Time:</span> {selectedSlot.time}
								</p>
								<p>
									<span className="font-medium">Fee:</span> $
									{selectedDoctor.fee}
								</p>
							</div>
						</div>
						<button
							onClick={handlePayment}
							className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
						>
							<CreditCard size={18} className="mr-2" />
							Pay ${selectedDoctor.fee}
						</button>
					</div>
				)}
			</div>
		</div>
	);

	const formatDate = (dateString) => {
		const options = {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const renderAppointments = (appointmentsList) => {
		if (appointmentsList.length === 0) {
			return (
				<EmptyState
					title={`No ${activeTab} Appointments`}
					icon={Calendar}
					message={`You don't have any ${activeTab} appointments`}
				/>
			);
		}

		return (
			<div className="space-y-4">
				{appointmentsList.map((appointment) => (
					<div
						key={appointment.id}
						className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between">
							<div>
								<div className="flex items-center">
									<div
										className={`w-2 h-2 rounded-full mr-2 ${
											appointment.status === "confirmed"
												? "bg-green-500"
												: appointment.status === "pending"
												? "bg-yellow-500"
												: "bg-gray-400"
										}`}
									></div>
									<span className="text-sm font-medium text-gray-500 capitalize">
										{appointment.status}
									</span>
								</div>
								<h3 className="font-medium text-gray-800 mt-1">
									{appointment.doctor}
								</h3>
								<p className="text-sm text-gray-500">{appointment.specialty}</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-medium text-gray-600">
									{formatDate(appointment.date)}
								</p>
								<p className="text-sm text-gray-500 mt-1">{appointment.time}</p>
							</div>
						</div>
						<div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
							<div className="text-sm text-gray-500">
								<span>{appointment.location}</span>
							</div>
							<div>
								<button className="text-sm text-blue-600 hover:text-blue-800">
									Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
				<button
					onClick={() => setShowBooking(true)}
					className="flex items-center text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
				>
					<PlusCircle size={16} className="mr-1" />
					New Appointment
				</button>
			</div>

			<div className="mb-6">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						<button
							onClick={() => setActiveTab("upcoming")}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
								activeTab === "upcoming"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							Upcoming
						</button>
						<button
							onClick={() => setActiveTab("past")}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
								activeTab === "past"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							Past
						</button>
					</nav>
				</div>
			</div>

			{activeTab === "upcoming"
				? renderAppointments(upcomingAppointments)
				: renderAppointments(pastAppointments)}
			{showBooking && <BookingModal />}
		</div>
	);
};

export default Appointments;
