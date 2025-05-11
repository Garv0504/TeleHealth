import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Specialties({id}) {
	const [hoveredCard, setHoveredCard] = useState(null);
	const navigate = useNavigate();

const handleSeeAllClick = () => {
  const token = localStorage.getItem('token');
  if (token) {
    navigate('/patient-dashboard');
  } else {
    navigate('/login');
  }
};


	return (
		<div className="bg-white py-16">
			<div className="max-w-6xl mx-auto px-4">
				{/* Headings */}
				<h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
					Consult Top Doctors Online For
				</h2>
				<h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mt-1">
					Any Health Concern
				</h2>

				<p className="text-slate-500 text-center mt-2">
					Private online consultations with verified doctors in all specialists
				</p>

				{/* Specialty Cards */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
					<SpecialtyCard
						icon={<BabyHealthIcon />}
						title="Baby Health"
						id="baby"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
					<SpecialtyCard
						icon={<StomachIcon />}
						title="Stomach"
						id="stomach"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
					<SpecialtyCard
						icon={<PsychiatryIcon />}
						title="Psychiatry"
						id="psychiatry"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
					<SpecialtyCard
						icon={<UrologyIcon />}
						title="Urology"
						id="urology"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
					<SpecialtyCard
						icon={<DermatologyIcon />}
						title="Dermatology"
						id="dermatology"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
					<SpecialtyCard
						icon={<InfectiousIcon />}
						title="Infectious Disease"
						id="infectious"
						hoveredCard={hoveredCard}
						setHoveredCard={setHoveredCard}
					/>
				</div>

				{/* See All Button */}
				<div className="flex justify-center mt-12">
					<button onClick={handleSeeAllClick} className="bg-indigo-800 text-white px-8 py-3 rounded-full text-sm font-medium cursor-pointer">
						Book Appointments
					</button>
				</div>
			</div>
		</div>
	);
}

function SpecialtyCard({ icon, title, id, hoveredCard, setHoveredCard }) {
	const isHovered = hoveredCard === id;
	const navigate = useNavigate();

	const handleConsultClick = (specialty) => {
		navigate(`/consultation/${specialty.toLowerCase().replace(/\s+/g, "-")}`);
	};

	return (
		<div
			className={`bg-gray-50 rounded-lg p-6 flex flex-col items-center relative transition-all duration-300 ${
				isHovered ? "shadow-lg transform -translate-y-1" : ""
			}`}
			onMouseEnter={() => setHoveredCard(id)}
			onMouseLeave={() => setHoveredCard(null)}
		>
			<div className="h-16 flex items-center justify-center">{icon}</div>
			<p className="text-slate-800 font-medium mt-2 pb-4 text-center">
				{title}
			</p>

			{/* Consult Now button with transition */}
			{/* <div
				className={`absolute bottom-4 w-full flex justify-center transition-opacity duration-300 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			>
				<button
					onClick={() => handleConsultClick(title)}
					className="bg-white text-indigo-800 text-xs font-medium px-4 py-1 rounded-full shadow-sm cursor-pointer"
				>
					Consult Now
				</button>
			</div> */}
		</div>
	);
}

// Custom Icons
function BabyHealthIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#E6F7FF" />
			<path
				d="M20 14C23 14 24 17 24 19C24 21 22 24 20 24C18 24 16 21 16 19C16 17 17 14 20 14Z"
				fill="#4BB5F5"
			/>
			<path
				d="M20 14C21 14 22 12 22 10C22 8 21 6 20 6C19 6 18 8 18 10C18 12 19 14 20 14Z"
				fill="#FF89A9"
			/>
		</svg>
	);
}

function StomachIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#FFEEEE" />
			<path
				d="M28 18C28 22.4183 24.4183 26 20 26C15.5817 26 12 22.4183 12 18C12 13.5817 15.5817 10 20 10C24.4183 10 28 13.5817 28 18Z"
				fill="#FF7E7E"
			/>
			<circle cx="20" cy="18" r="4" fill="#FF5555" />
		</svg>
	);
}

function PsychiatryIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#FFF6EC" />
			<circle cx="20" cy="20" r="8" fill="#FF9A56" />
			<path
				d="M20 15V25M15 20H25"
				stroke="#FFF6EC"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function UrologyIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#FFEEEE" />
			<path
				d="M26 16C26 19.866 23.3137 23 20 23C16.6863 23 14 19.866 14 16C14 12.134 16.6863 9 20 9C23.3137 9 26 12.134 26 16Z"
				fill="#FF7E7E"
			/>
			<path
				d="M26 24C26 27.866 23.3137 31 20 31C16.6863 31 14 27.866 14 24C14 20.134 16.6863 17 20 17C23.3137 17 26 20.134 26 24Z"
				fill="#FF7E7E"
			/>
		</svg>
	);
}

function DermatologyIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#F6F6F6" />
			<path
				d="M20 12L22 16H27L23 19L25 24L20 21L15 24L17 19L13 16H18L20 12Z"
				fill="#666666"
			/>
		</svg>
	);
}

function InfectiousIcon() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="20" cy="20" r="16" fill="#F0E6FF" />
			<circle cx="20" cy="20" r="8" fill="#9966FF" />
			<circle cx="20" cy="20" r="4" fill="#7F3FFF" />
			<path
				d="M20 8V12M20 28V32M8 20H12M28 20H32M11.8 11.8L14.6 14.6M25.4 25.4L28.2 28.2M11.8 28.2L14.6 25.4M25.4 14.6L28.2 11.8"
				stroke="#7F3FFF"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}