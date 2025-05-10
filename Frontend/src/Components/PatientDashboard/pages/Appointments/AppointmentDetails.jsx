// src/pages/Appointments.js
import React, { useState, useEffect } from "react";
import { Calendar, PlusCircle, X, Clock, AlertCircle } from "lucide-react";
import axios from "axios";
import BookAppointment from "./AppointmentList.jsx"
const EmptyState = ({ title, icon: Icon, message }) => (
	<div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-gray-200">
		<Icon size={48} className="text-gray-300 mb-4" />
		<h3 className="text-lg font-medium text-gray-700">{title}</h3>
		<p className="text-gray-500 mt-2 text-center max-w-sm">{message}</p>
	</div>
);

const Appointments = () => {
	const [activeTab, setActiveTab] = useState("upcoming");
	const [showBooking, setShowBooking] = useState(false);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchAppointments = async () => {
		setLoading(true);
		setError(null);
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get("/api/appointments", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setAppointments(response.data.data);
		} catch (err) {
			setError(err.response?.data?.error || "Failed to load appointments");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	const currentDate = new Date();

	const upcomingAppointments = appointments?.filter((app) => new Date(app.date) >= currentDate)
		.sort((a, b) => new Date(a.date) - new Date(b.date));

	const pastAppointments = appointments?.filter((app) => new Date(app.date) < currentDate)
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	const formatDate = (dateString) => {
		const options = {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const formatTime = (time) => {
		// Convert 24-hour format to 12-hour format
		if (!time) return "";
		const [hours, minutes] = time.split(":");
		const h = parseInt(hours, 10);
		const period = h >= 12 ? "PM" : "AM";
		const formattedHours = h > 12 ? h - 12 : h === 0 ? 12 : h;
		return `${formattedHours}:${minutes} ${period}`;
	};

	const handleAppointmentBooked = () => {
		fetchAppointments();
	};

	const renderAppointments = (appointmentsList) => {
		if (loading) {
			return (
				<div className="flex justify-center items-center py-16">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
				</div>
			);
		}

		if (error) {
			return (
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
					<AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
					<p className="text-red-600">{error}</p>
					<button
						onClick={fetchAppointments}
						className="mt-4 text-blue-500 hover:text-blue-700"
					>
						Try Again
					</button>
				</div>
			);
		}

		if (appointmentsList?.length === 0) {
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
				{appointmentsList?.map((appointment) => (
					<div
						key={appointment._id}
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
									{appointment.doctor && appointment.doctor.firstName
										? `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`
										: appointment.doctor}
								</h3>
								<p className="text-sm text-gray-500">
									{appointment.doctor &&
										appointment.doctor.doctorDetails &&
										appointment.doctor.doctorDetails.specialty}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-medium text-gray-600">
									{formatDate(appointment.date)}
								</p>
								<p className="text-sm text-gray-500 mt-1">
									{formatTime(appointment.startTime)} -{" "}
									{formatTime(appointment.endTime)}
								</p>
							</div>
						</div>
						<div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
							<div className="text-sm text-gray-500">
								<span>Reason: {appointment.reason}</span>
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
		<div className="container mx-auto px-4 py-8">
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

			{showBooking && (
				<BookAppointment
					onClose={() => setShowBooking(false)}
					onAppointmentBooked={handleAppointmentBooked}
				/>
			)}
		</div>
	);
};

export default Appointments;
