import { MapPin, Phone } from "lucide-react";
import React from "react";
import urgentcall from '../assets/urgentcall.jpg';
import doctorOnlineIcon from '../assets/doctorOnlineIcon.png';

export default function HomeCard1() {
  return (
    <div className="hidden md:block max-w-6xl mx-auto p-4 font-sans">
      {/* Bottom Section - Urgent Online Care */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden ">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Urgent Online Care</h1>
          <p className="text-gray-600 mb-8">
            Ted way you're better, awesome and new will always work a huge fucking shit there.
          </p>
          
          <button className="bg-blue-900 hover:bg-blue-600 text-white font-medium py-3 p rounded-3xl w-40 transition-colors">
            Take Appointment
          </button>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          {/* Image container with floating label */}
          <div className="relative w-full h-64 md:h-full">
            <img
              src={urgentcall} 
              alt="Doctor consultation"
              className="w-full h-full object-cover rounded-3xl shadow-lg shadow-cyan-500/50"
              style={{ boxShadow: '30px 30px 2px rgba(0, 255, 255, 0.3)' }}
            />
            
            {/* Floating Doctors Online rectangle */}
            <div className="absolute top-7 -left-8 bg-white text-white px-6 py-3 rounded-lg shadow-md">
                <div className="flex gap-2">
                    <img src={doctorOnlineIcon}
                     alt="doctor online icon" 
                     className="h-7 w-7 -ml-2"

                     />
                    <div>
                        <div className="text-sm text-blue-950 font-semibold">Doctors Online</div>
                        <div className="text-xs text-blue-950 max-w-[110px] text-left leading-tight mt-1">Make an consult appointment</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}