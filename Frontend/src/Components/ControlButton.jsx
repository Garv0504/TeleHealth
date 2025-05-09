import React from "react";

function ControlButton({ Icon, active = false }) {
	return (
		<button
			className={`w-8 h-8 rounded-full flex items-center justify-center ${
				active ? "bg-red-500" : "bg-white/80"
			}`}
		>
			<Icon size={16} color={active ? "white" : "black"} />
		</button>
	);
}

export default ControlButton;
