import React, { useState } from 'react';
import { Calendar, PlusCircle } from 'lucide-react';
import { appointments } from '../../../data/patientData'; // Assuming you have a payments data file

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const currentDate = new Date();
  
  const upcomingAppointments = appointments.filter(
    app => new Date(app.date) >= currentDate
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const pastAppointments = appointments.filter(
    app => new Date(app.date) < currentDate
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderAppointments = (appointmentsList) => {

    return (
      <div className="space-y-4">
        {appointmentsList.map((appointment) => (
          <div key={appointment.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    appointment.status === 'confirmed' ? 'bg-green-500' : 
                    appointment.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-500 capitalize">{appointment.status}</span>
                </div>
                <h3 className="font-medium text-gray-800 mt-1">{appointment.doctor}</h3>
                <p className="text-sm text-gray-500">{appointment.specialty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{formatDate(appointment.date)}</p>
                <p className="text-sm text-gray-500 mt-1">{appointment.time}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <div className="text-sm text-gray-500">
                <span>{appointment.location}</span>
              </div>
              <div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <button className="flex items-center text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <PlusCircle size={16} className="mr-1" />
          New Appointment
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'upcoming' ? renderAppointments(upcomingAppointments) : renderAppointments(pastAppointments)}
    </div>
  );
};

export default Appointments