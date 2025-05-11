import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
	User,
	Calendar,
	Clock,
	FileText,
	MessageSquare,
	CreditCard,
	Settings,
	Users,
} from "lucide-react";

const DoctorSidebar = () => {
	const [doctorData, setDoctorData] = useState([]);
	const navItems = [
		{
			path: "/doctor-dashboard/manage-slots",
			name: "Manage Slots",
			icon: Clock,
		},
		{
			path: "/doctor-dashboard/appointments",
			name: "Appointments",
			icon: Calendar,
		},
	];

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/auth/me", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				console.log(response.data.data);
				setDoctorData(response.data.data);

				// log actual response data
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className="flex flex-col h-full bg-white border-r">
			{/* Doctor Profile */}
			<div className="p-5 border-b">
				<div className="flex items-center space-x-3">
					<div className="bg-gray-200 rounded-full p-1">
						<User size={32} className="text-gray-500" />
					</div>
					<div>
						<h2 className="font-medium text-gray-800">
							{doctorData.user?.firstName} {doctorData.user?.lastName}
						</h2>
						<p className="text-sm text-gray-500">
							{doctorData.profile?.specialty}
						</p>
						<p className="text-xs text-gray-400">
							License: {doctorData.profile?.licenseNumber}
						</p>
					</div>
				</div>
			</div>

			{/* Navigation Links */}
			<nav className="flex-1 pt-2">
				<ul>
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<li key={item.path}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										`flex items-center px-5 py-3 text-sm transition-colors duration-150 ${
											isActive
												? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
												: "text-gray-700 hover:bg-gray-50"
										}`
									}
								>
									<Icon size={18} className="mr-3" />
									<span>{item.name}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default DoctorSidebar;
