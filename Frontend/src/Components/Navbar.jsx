import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Navbar() {
	const [isHovered, setIsHovered] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const navItems = [
		{ name: "Home", link: "#" },
		{ name: "Find Doctors", link: "#" },
		{ name: "Find Medical", link: "#" },
		{ name: "Consulto Prime", link: "#" },
		{ name: "Help", link: "#" },
	];

	useEffect(() => {
		// Check if user is logged in via local storage
		const userInfo = localStorage.getItem("user");
		if (userInfo) {
			try {
				const parsedUser = JSON.parse(userInfo);
				setUser(parsedUser);
				setIsLoggedIn(true);
			} catch (error) {
				console.error("Error parsing user info from localStorage", error);
			}
		}

		// Handle clicks outside dropdown to close it
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		// Clear user data from local storage
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		// Update state
		setIsLoggedIn(false);
		setUser(null);
		setShowDropdown(false);

		// Redirect to home page or login page
		navigate("/");
	};

	return (
		<div className="w-full bg-blue-50 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<div className="flex items-center">
					<div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center mr-2">
						<div className="w-4 h-3 border-2 border-white rounded-sm"></div>
					</div>
					<span className="text-blue-900 font-bold text-xl tracking-tight">
						TeleHealth
					</span>
				</div>

				{/* Navigation Items */}
				<div className="hidden md:flex space-x-8">
					{navItems.map((item, index) => (
						<a
							key={index}
							href={item.link}
							className={`text-gray-700 hover:text-blue-900 font-medium ${
								isHovered === index ? "text-blue-900" : ""
							}`}
							onMouseEnter={() => setIsHovered(index)}
							onMouseLeave={() => setIsHovered(null)}
						>
							{item.name}
						</a>
					))}
				</div>

				{/* Authentication Section */}
				<div className="flex items-center space-x-4">
					{isLoggedIn ? (
						<div className="relative" ref={dropdownRef}>
							<button
								className="flex items-center space-x-2 focus:outline-none"
								onClick={() => setShowDropdown(!showDropdown)}
							>
								<div className="w-9 h-9 bg-blue-900 rounded-full flex items-center justify-center text-white">
									<User size={20} />
								</div>
								<ChevronDown
									className={`h-4 w-4 text-gray-700 transition-transform duration-200 ${
										showDropdown ? "transform rotate-180" : ""
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{showDropdown && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-200 ease-in-out origin-top-right">
									<div className="px-4 py-2 border-b border-gray-100">
										<p className="text-sm font-medium text-gray-900">
											{user?.role.charAt(0).toUpperCase() +
												user?.role.slice(1) || "Patient"}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{user?.email || ""}
										</p>
									</div>
									<Link
										to={user?.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"}
										className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
									>
										<LayoutDashboard className="mr-2 h-4 w-4" />
										Dashboard
									</Link>
									<button
										onClick={handleLogout}
										className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
									>
										<LogOut className="mr-2 h-4 w-4" />
										Log out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							<Link
								to="/login"
								className="text-gray-700 hover:text-blue-900 font-medium"
							>
								Log in
							</Link>
							<Link
								to="/register"
								className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium transition-colors duration-200"
							>
								Sign in
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
