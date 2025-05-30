import React from "react";
import ControlButton from "./ControlButton";
import {
	Plus,
	Minus,
	Video,
	Monitor,
	Settings,
	MessageCircle,
} from "lucide-react";
// import docvideo from "../assets/docvideo.avif";
// import profilephoto from "../assets/profilephoto.jpg";

const VideoCard = () => {
	return (
		<div className=" hidden md:block relative mt-16 px-4 max-w-3xl mx-auto  ">
			<div className="bg-white rounded-xl overflow-hidden shadow-lg ">
				<div className="relative">
					<img
						src="./docvideo.avif"
						alt="Doctor office"
						className="w-full h-[500px]"
					/>
					<div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow flex items-center space-x-2">
						<img
							src="./profilephoto.jpg"
							alt="Doctor"
							className="w-10 h-10 object-cover rounded-full"
						/>
						<span className="font-medium">Dr. Billal</span>
					</div>

					{/* Controls */}
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
						<ControlButton Icon={Plus} />
						<ControlButton Icon={Minus} />
						<ControlButton Icon={Video} active={true} />
						<ControlButton Icon={Monitor} />
						<ControlButton Icon={Settings} />
					</div>
				</div>
			</div>
			<div className="absolute -left-8 top-32 bg-white p-3 rounded-lg shadow-lg">
				<div className="flex items-center space-x-2">
					<div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
						<MessageCircle size={16} color="white" />
					</div>
					<div>
						<p className="font-medium text-sm">Consultant</p>
						<p className="text-xs text-gray-500">
							First consultant is totally free
						</p>
					</div>
				</div>
			</div>

			<div className="absolute -right-4 top-44 bg-white p-3 rounded-lg shadow-lg">
				<div className="flex items-center space-x-2">
					<div className="bg-yellow-500 w-6 h-6 rounded-full flex items-center justify-center">
						<MessageCircle size={16} color="white" />
					</div>
					<div>
						<p className="font-medium text-sm">24/7 Service</p>
						<p className="text-xs text-gray-500">
							We are available when you need
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
