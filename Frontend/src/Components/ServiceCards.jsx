import React from "react";

const ServiceCard = ({ icon, title, description, bgColor }) => {
	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs">
			<div className={`${bgColor} p-4 flex justify-center`}>{icon}</div>
			<div className="p-4">
				<h3 className="font-bold text-xl text-slate-800">{title}</h3>
				<p className="text-slate-600 mt-1">{description}</p>
			</div>
		</div>
	);
};

const ServiceCards = () => {
	return (
		<div className="flex flex-col md:flex-row gap-6 justify-center mt-8 px-4">
			<ServiceCard
				bgColor="bg-blue-200"
				icon={
					<div className="rounded-full bg-white p-3">
						<svg
							className="h-6 w-6 text-blue-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</div>
				}
				title="Instant Video Consultation"
				description="Connect within 60 secs"
			/>

			<ServiceCard
				bgColor="bg-teal-200"
				icon={
					<div className="rounded-full bg-white p-3">
						<svg
							className="h-6 w-6 text-teal-500"
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
					</div>
				}
				title="Find Doctors Near You"
				description="Confirmed appointments"
			/>

			<ServiceCard
				bgColor="bg-purple-200"
				icon={
					<div className="rounded-full bg-white p-3">
						<svg
							className="h-6 w-6 text-purple-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>
					</div>
				}
				title="Find Specialists"
				description="Book appointments with top specialists in your area"
			/>
		</div>
	);
};

export default ServiceCards;
