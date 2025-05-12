import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function TeleHealthFooter() {
	return (
		<div className="bg-white border-t border-gray-200">
			<div className="container mx-auto px-4 py-10">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
					{/* Column 1: TeleHealth */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-700">TeleHealth</h3>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									About
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Careers
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Press
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* Column 2: For Patients */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-700">For Patients</h3>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Search for Doctors
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Search for Clinics
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Search for Hospitals
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Book Diagnostic Tests
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Book Full Body Checkups
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									TeleHealth Plus
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Read Health Articles
								</a>
							</li>
						</ul>
					</div>

					{/* Column 3: For Doctors & For Clinics */}
					<div className="space-y-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-700">For Doctors</h3>
							<ul className="space-y-3">
								<li>
									<a href="#" className="text-gray-400 hover:text-gray-600">
										TeleHealth Profile
									</a>
								</li>
							</ul>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-700">For Clinics</h3>
							<ul className="space-y-3">
								<li>
									<a href="#" className="text-gray-400 hover:text-gray-600">
										Ray by TeleHealth
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-gray-600">
										TeleHealth Reach
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-gray-600">
										Ray Tab
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-gray-600">
										TeleHealth Pro
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Column 4: For Hospitals */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-700">For Hospitals</h3>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Insta by TeleHealth
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Qikwell by TeleHealth
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									TeleHealth Profile
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									TeleHealth Reach
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									TeleHealth Drive
								</a>
							</li>
						</ul>
					</div>

					{/* Column 5: More */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-700">More</h3>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Help
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Developers
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Terms & Conditions
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Healthcare Directory
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									TeleHealth Health Wiki
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 hover:text-gray-600">
									Corporate Wellness
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom line with logo and social media icons */}
				<div className="border-t border-gray-200 mt-10 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center mb-4 md:mb-0">
							<div className="h-8 w-8 bg-indigo-700 text-white flex items-center justify-center rounded mr-2">
								<span className="font-bold text-sm">+</span>
							</div>
							<span className="text-gray-700 font-medium">telehealth</span>
						</div>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-400 hover:text-gray-600">
								<Facebook size={20} />
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-600">
								<Twitter size={20} />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-gray-600 bg-indigo-700 p-1 rounded-full"
							>
								<Instagram size={20} />
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-600">
								<Youtube size={20} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}