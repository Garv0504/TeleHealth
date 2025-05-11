import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Appointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				setLoading(true);
				// Assuming you have an API endpoint to fetch user's appointments
				// Replace with your actual API endpoint
				const patientId = JSON.parse(localStorage.getItem("user"));
				console.log(patientId.id);
				const response = await axios.get(
					`http://localhost:5000/api/appointments/patient/${patientId.id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
        console.log(response);
				setAppointments(response.data.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch appointments");
				setLoading(false);
				console.error("Error fetching appointments:", err);
			}
		};

		fetchAppointments();
	}, []);

	// Function to get appropriate status badge color
	const getStatusBadgeClass = (status) => {
		switch (status) {
			case "confirmed":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "completed":
				return "bg-blue-100 text-blue-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			case "no-show":
				return "bg-gray-100 text-gray-800";
			case "success":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	// Function to get appropriate payment status badge color
	const getPaymentBadgeClass = (paymentStatus) => {
		switch (paymentStatus) {
			case "paid":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "refunded":
				return "bg-red-100 text-red-800";
			case "success":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	// Function to format date
	const formatAppointmentDate = (dateString) => {
		const date = new Date(dateString);
		return format(date, "PPP"); // "Jan 1, 2021"
	};

  const navigate = useNavigate();

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
				<Link
					to="/patient-dashboard/book-appointments"
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
				>
					Book New Appointment
				</Link>
			</div>

			{loading ? (
				<div className="text-center py-8">
					<svg
						className="animate-spin h-8 w-8 mx-auto text-blue-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p className="mt-2 text-gray-600">Loading appointments...</p>
				</div>
			) : error ? (
				<div className="bg-red-50 p-4 rounded-md">
					<p className="text-red-800">{error}</p>
				</div>
			) : appointments.length === 0 ? (
				<div className="text-center py-10 bg-gray-50 rounded-lg">
					<svg
						className="h-16 w-16 text-gray-400 mx-auto mb-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<h2 className="text-xl font-medium text-gray-700 mb-2">
						No appointments found
					</h2>
					<p className="text-gray-500 mb-6">
						You haven't booked any appointments yet.
					</p>
					<Link
						to="/patient-dashboard/book-appointments"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
					>
						Book Your First Appointment
					</Link>
				</div>
			) : (
				<div className="bg-white shadow overflow-hidden sm:rounded-md">
					<ul className="divide-y divide-gray-200">
						{appointments.map((appointment) => (
							<li
								key={appointment._id}
								className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex flex-col">
										<p className="text-sm font-medium text-gray-900">
											Appointment with Dr.{" "}
											{appointment.doctor.firstName || "Doctor Name"}
										</p>
										<p className="text-sm text-gray-500">
											{formatAppointmentDate(appointment.date)} •{" "}
											{appointment.startTime} - {appointment.endTime}
										</p>
									</div>
									<div className="flex space-x-2">
										<span
											className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
												appointment.status
											)}`}
										>
											{appointment.status.charAt(0).toUpperCase() +
												appointment.status.slice(1)}
										</span>
										<span
											className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadgeClass(
												appointment.paymentStatus
											)}`}
										>
											Payment:{" "}
											{appointment.paymentStatus.charAt(0).toUpperCase() +
												appointment.paymentStatus.slice(1)}
										</span>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										<span className="font-medium">Reason:</span>{" "}
										{appointment.reason}
									</p>
                  {/* <p>Meeting Url: {appointment.meetingUrl}</p> */}
                  {/* <button onClick={() => {navigate(`/room/${appointment.meetingUrl}`)}}>Join Session</button> */}
									{appointment.notes && (
										<p className="text-sm text-gray-500 mt-1">
											<span className="font-medium">Notes:</span>{" "}
											{appointment.notes}
										</p>
									)}
								</div>
								<div className="mt-3 flex space-x-3">
									
										
											<a
												onClick={() => {navigate(`/room/${appointment.meetingUrl}`)}}
												rel="noopener noreferrer"
												className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
											>
												Join Meeting
											</a>
										
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Appointment;
