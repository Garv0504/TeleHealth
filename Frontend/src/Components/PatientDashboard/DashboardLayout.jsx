import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			<div className="flex h-screen bg-gray-50">
				{/* Mobile sidebar toggle */}
				<div className="lg:hidden fixed top-4 left-4 z-50">
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-md bg-white shadow-md"
					>
						<Menu size={24} />
					</button>
				</div>

				{/* Sidebar */}
				<div
					className={`fixed lg:static inset-y-0 left-0 z-10 w-64 transition-all duration-300 transform ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} lg:translate-x-0 shadow-lg`}
				>
					<Sidebar />
				</div>

				{/* Mobile overlay */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 z-[5] bg-black bg-opacity-50 lg:hidden"
						onClick={toggleSidebar}
					></div>
				)}

				{/* Main content */}
				<div className="flex-1 overflow-y-auto">
					<main className="p-6 lg:p-8">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
