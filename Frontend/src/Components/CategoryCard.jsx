import React from "react";
function CategoryCard({ title, description, active }) {
	return (
		<div
			className={`p-4 rounded-xl text-center w-36 ${
				active ? "bg-orange-100" : "bg-white"
			}`}
		>
			<p className="font-medium text-slate-800">{title}</p>
			<p className="text-xs text-slate-600 mt-1">{description}</p>
		</div>
	);
}

export default CategoryCard;
