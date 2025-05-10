import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, X, Check } from 'lucide-react';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const appointments = {
    upcoming: [
      { 
        id: 1, 
        patientName: 'John Smith', 
        patientId: 'P12345',
        date: '2025-05-12', 
        time: '10:00 AM', 
        type: 'Check-up',
        status: 'confirmed'
      },
      { 
        id: 2, 
        patientName: 'Emily Johnson', 
        patientId: 'P12346',
        date: '2025-05-12', 
        time: '11:30 AM', 
        type: 'Follow-up',
        status: 'confirmed'
      },
      { 
        id: 3, 
        patientName: 'Michael Brown', 
        patientId: 'P12347',
        date: '2025-05-13', 
        time: '09:15 AM', 
        type: 'Consultation',
        status: 'pending'
      },
    ],
    past: [
      { 
        id: 4, 
        patientName: 'Sarah Wilson', 
        patientId: 'P12348',
        date: '2025-05-08', 
        time: '02:00 PM', 
        type: 'Check-up',
        status: 'completed'
      },
      { 
        id: 5, 
        patientName: 'Robert Davis', 
        patientId: 'P12349',
        date: '2025-05-07', 
        time: '10:45 AM', 
        type: 'Follow-up',
        status: 'completed'
      },
    ],
    cancelled: [
      { 
        id: 6, 
        patientName: 'Jessica Lee', 
        patientId: 'P12350',
        date: '2025-05-09', 
        time: '03:30 PM', 
        type: 'Consultation',
        status: 'cancelled'
      },
    ]
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const tabs = [
    { key: 'Appointment', label: 'Appointment' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({appointments[tab.key]?.length})
            </button>
          ))}
        </nav>
      </div>
      
      {/* Appointment List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {appointments[activeTab].length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {appointments[activeTab].map((appointment) => (
              <li key={appointment.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 rounded-full p-2">
                      <User size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">ID: {appointment.patientId}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(appointment.status)}</div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText size={16} className="mr-2 text-gray-400" />
                    {appointment.type}
                  </div>
                </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 px-4 text-center">
            <p className="text-gray-500">No {activeTab} appointments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;