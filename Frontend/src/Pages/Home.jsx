import React from "react";
import CategoryCard from "../Components/CategoryCard";
import Navbar from "../Components/Navbar";
import VideoCard from "../Components/VideoCard";
import Footer from "../Components/Footer";
import Specialties from "../Components/Specialities";
import ServiceCards from "../Components/ServiceCards";
import HomeCard2 from "../Components/HomeCard2";
import HomeCard1 from "../Components/HomeCard1";

const Home = () => {
	return (
		<>
		<Navbar/>
			<div className="bg-[#D1E9FE] pb-15  pt-3">
				<div className="text-center">
					<p className="text-slate-700 text-lg font-bold">Remove Doubts</p>
					<h1 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2">
						Free Doctor Consultation
					</h1>
					<p className="text-slate-600 mt-4">
						24/7 Video consultations. Private consultation
					</p>
					<p className="text-slate-600">
						Starts at just Rs.299
					</p>

					<ServiceCards/>

				</div>

				<div className="mt-12 px-4">
					<p className="text-slate-700 text-center mb-4">
						Are You Looking For:
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<CategoryCard
							title="Doctors"
							description="Book an appointment"
							active={true}
						/>
						<CategoryCard
							title="Consult"
							description="With top doctors"
							active={false}
						/>
						<CategoryCard
							title="Pharmacy"
							description="Medicine products"
							active={true}
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
			<HomeCard1/>
			<HomeCard2/>
			<Footer/>
		</>
	);
};

export default Home;