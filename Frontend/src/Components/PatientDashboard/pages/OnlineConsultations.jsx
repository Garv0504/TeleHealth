import React from 'react';
import { Video, Calendar } from 'lucide-react';
import { consultations } from '../../../data/patientData'; // Assuming you have a payments data file

const OnlineConsultations = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Online Consultations</h1>
        <button className="flex items-center text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Calendar size={16} className="mr-1" />
          Book Consultation
        </button>
      </div>

      {consultations.length === 0 ? (
        "no"
      ) : (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      consultation.status === 'upcoming' ? 'bg-green-500' : 
                      consultation.status === 'completed' ? 'bg-gray-400' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-500 capitalize">{consultation.status}</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mt-1">{consultation.doctor}</h3>
                  <p className="text-sm text-gray-500">{consultation.specialty}</p>
                </div>
                <div className="mt-3 sm:mt-0 sm:text-right">
                  <p className="text-sm font-medium text-gray-600">{consultation.date}</p>
                  <p className="text-sm text-gray-500">{consultation.time}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                <div>
                  {consultation.status === 'upcoming' && (
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                      <Video size={14} className="mr-1" />
                      Join Consultation
                    </button>
                  )}
                  {consultation.status === 'completed' && (
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      View Summary
                    </button>
                  )}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineConsultations;