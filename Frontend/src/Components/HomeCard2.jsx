import React from "react";
import doctors from "../assets/doctorwithNurse.png";
import consultBackground from "../assets/lightBG.jpg";

export default function HomeCard2() {
  return (
    <div className="hidden md:block w-[1110px] h-[400px] mx-auto rounded-xl overflow-hidden relative m-10">
      <img 
        src={consultBackground} 
        alt="background" 
        className="absolute inset-0 w-full  object-cover opacity-30"
      />
      {/* Content */}
      <div className="relative z-10 p-5 flex gap-12">
        <img 
          src={doctors} 
          alt="bunch of doctors" 
          className="relative top-10 h-90 w-auto rounded-lg" 
        />
        <div className="mt-10">
            <div className="uppercase tracking-wide text-lg text-blue-950 bg-white rounded-full px-4 py-2 font-semibold mb-4 inline-block">
            TeleHealth Plus
            </div>
            <h2 className="text-5xl font-bold text-blue-950 mb-2 leading-15">
            Free Online Consultations
            Starting at $49/month
            </h2>
            
            <button className="bg-blue-950 hover:bg-blue-600 text-white h-12 font-bold py-2 px-4 rounded-3xl transition duration-200 mt-10">
            Get Membership
            </button>
        </div>
      </div>
    </div>
  );
}