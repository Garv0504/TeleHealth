import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	Calendar,
	Clock,
	User,
	Check,
	X,
	Clock as PastIcon,
} from "lucide-react";

const Appointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState("upcoming");

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:5000/api/appointments", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
        console.log(response.data)
				setAppointments(response.data);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch appointments");
			} finally {
				setLoading(false);
			}
		};

		fetchAppointments();
	}, []);

	// Filter appointments based on active tab
	const filteredAppointments = appointments.filter((appt) => {
		const now = new Date();
		const apptDate = new Date(appt.date);

		if (activeTab === "upcoming") {
			return (
				apptDate >= now ||
				(apptDate.toDateString() === now.toDateString() &&
					appt.endTime >=
						now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
			);
		} else {
			return (
				apptDate < now ||
				(apptDate.toDateString() === now.toDateString() &&
					appt.endTime <
						now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
			);
		}
	});

	// Format date for display
	const formatDate = (dateString) => {
		const options = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl md:text-3xl font-bold text-gray-800">
					My Appointments
				</h1>
				<Link
					to="/patient-dashboard/book-appointments"
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
				>
					Book New Appointment
				</Link>
			</div>

			{/* Tabs */}
			<div className="flex border-b border-gray-200 mb-6">
				<button
					className={`py-2 px-4 font-medium text-sm md:text-base flex items-center ${
						activeTab === "upcoming"
							? "text-blue-600 border-b-2 border-blue-600"
							: "text-gray-500 hover:text-gray-700"
					}`}
					onClick={() => setActiveTab("upcoming")}
				>
					<Clock className="w-4 h-4 mr-2" />
					Upcoming
				</button>
				<button
					className={`py-2 px-4 font-medium text-sm md:text-base flex items-center ${
						activeTab === "past"
							? "text-blue-600 border-b-2 border-blue-600"
							: "text-gray-500 hover:text-gray-700"
					}`}
					onClick={() => setActiveTab("past")}
				>
					<PastIcon className="w-4 h-4 mr-2" />
					Past
				</button>
			</div>

			{/* Loading and Error States */}
			{loading && (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			)}

			{error && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
					<div className="flex">
						<X className="h-5 w-5 text-red-500 mr-2" />
						<p className="text-red-700">{error}</p>
					</div>
				</div>
			)}

			{/* Appointments Table */}
			{!loading && !error && (
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Doctor
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date & Time
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredAppointments.length > 0 ? (
									filteredAppointments.map((appointment) => (
										<tr key={appointment._id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
														<User className="h-5 w-5 text-gray-500" />
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{appointment.doctor?.name || "Dr. Unknown"}
														</div>
														<div className="text-sm text-gray-500">
															{appointment.doctor?.specialty || "General"}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<Calendar className="h-4 w-4 text-gray-400 mr-2" />
													<div>
														<div className="text-sm text-gray-900">
															{formatDate(appointment.date)}
														</div>
														<div className="text-sm text-gray-500 flex items-center">
															<Clock className="h-3 w-3 mr-1" />
															{appointment.startTime} - {appointment.endTime}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
														appointment.status === "confirmed"
															? "bg-green-100 text-green-800"
															: appointment.status === "cancelled"
															? "bg-red-100 text-red-800"
															: "bg-yellow-100 text-yellow-800"
													}`}
												>
													{appointment.status}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												{activeTab === "upcoming" &&
													appointment.status !== "cancelled" && (
														<button className="text-red-600 hover:text-red-900 mr-4">
															Cancel
														</button>
													)}
												<button className="text-blue-600 hover:text-blue-900">
													Details
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="4"
											className="px-6 py-4 text-center text-gray-500"
										>
											No {activeTab} appointments found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Mobile View (Cards) */}
			<div className="mt-6 sm:hidden">
				{!loading &&
					!error &&
					filteredAppointments.map((appointment) => (
						<div
							key={appointment._id}
							className="bg-white rounded-lg shadow p-4 mb-4"
						>
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
										<User className="h-5 w-5 text-gray-500" />
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-gray-900">
											{appointment.doctor?.name || "Dr. Unknown"}
										</h3>
										<p className="text-xs text-gray-500">
											{appointment.doctor?.specialty || "General"}
										</p>
									</div>
								</div>
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										appointment.status === "confirmed"
											? "bg-green-100 text-green-800"
											: appointment.status === "cancelled"
											? "bg-red-100 text-red-800"
											: "bg-yellow-100 text-yellow-800"
									}`}
								>
									{appointment.status}
								</span>
							</div>

							<div className="flex items-center text-sm text-gray-500 mb-2">
								<Calendar className="h-4 w-4 text-gray-400 mr-2" />
								{formatDate(appointment.date)}
							</div>

							<div className="flex items-center text-sm text-gray-500 mb-4">
								<Clock className="h-4 w-4 text-gray-400 mr-2" />
								{appointment.startTime} - {appointment.endTime}
							</div>

							<div className="flex justify-between">
								{activeTab === "upcoming" &&
									appointment.status !== "cancelled" && (
										<button className="text-red-600 text-sm font-medium">
											Cancel
										</button>
									)}
								<button className="text-blue-600 text-sm font-medium">
									Details
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Appointment;
