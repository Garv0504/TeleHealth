import React from "react";
import CategoryCard from "../Components/CategoryCard";
import Navbar from "../components/Navbar";
import VideoCard from "../Components/VideoCard";
import Footer from "../Components/Footer";
import Specialties from "../Components/Specialities";

const Home = () => {
	return (
		<>
		<Navbar/>
			<div className="bg-[#D1E9FE] pb-3 h-[800px]">
				<div className="text-center">
					<p className="text-slate-700 text-lg">Remove Doubts</p>
					<h1 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2">
						Free Doctor Consultation
					</h1>
					<p className="text-slate-600 mt-4">
						24/7 Video consultations. Private consultation + Audio call
					</p>
					<p className="text-slate-600">
						Starts at just $10. Exclusively on mobile app.
					</p>

					{/* Search Bar */}
					<div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 px-4">
						<div className="flex items-center bg-white p-3 rounded-full shadow-sm w-full md:w-auto">
							<svg
								className="h-5 w-5 text-gray-400 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span className="text-slate-700">New York, USA</span>
						</div>
						<div className="flex items-center bg-white p-3 rounded-full shadow-sm w-full md:w-auto">
							<svg
								className="h-5 w-5 text-gray-400 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<span className="text-slate-400">Gastrologist</span>
						</div>
						<button className="bg-indigo-800 text-white px-6 py-3 rounded-full shadow-sm flex items-center justify-center w-full md:w-auto">
							<svg
								className="h-5 w-5 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							Search
						</button>
					</div>
				</div>

				<div className="mt-12 px-4">
					<p className="text-slate-700 text-center mb-4">
						Are You Looking For:
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<CategoryCard
							title="Doctors"
							description="Book an appointment"
							active={false}
						/>
						<CategoryCard
							title="Consult"
							description="With top doctors"
							active={true}
						/>
						<CategoryCard
							title="Pharmacy"
							description="Medicine products"
							active={false}
						/>
						<CategoryCard
							title="Diagnostics"
							description="Tests & checkups"
							active={false}
						/>
					</div>
				</div>
			</div>
			<VideoCard/>
			<Specialties/>
			<Footer/>
		</>
	);
};

export default Home;
