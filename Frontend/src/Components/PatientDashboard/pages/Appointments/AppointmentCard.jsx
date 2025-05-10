import React from 'react';
import { X, Calendar, Clock, MapPin, AlertTriangle, Download } from 'lucide-react';

const AppointmentDetails = ({ appointment, onClose, onCancel }) => {
  if (!appointment) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
          
          <p className="text-sm text-gray-500">
            Appointment #{appointment.id?.substring(0, 8) || '000000'}
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Doctor Information</h4>
          <p className="mt-1 text-lg font-semibold">Dr. {appointment.doctor?.name || appointment.doctorName}</p>
          <p className="text-sm text-gray-600">{appointment.doctor?.specialty || appointment.specialty}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Date</h4>
            <div className="flex items-center mt-1">
              <Calendar size={16} className="text-gray-400 mr-1" />
              <span>{formatDate(appointment.date)}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Time</h4>
            <div className="flex items-center mt-1">
              <Clock size={16} className="text-gray-400 mr-1" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
          </div>
        </div>
        
        {appointment.location && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <div className="flex items-center mt-1">
              <MapPin size={16} className="text-gray-400 mr-1" />
              <span>{appointment.location}</span>
            </div>
          </div>
        )}
        
        {appointment.reason && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Reason for Visit</h4>
            <p className="mt-1 text-gray-700">{appointment.reason}</p>
          </div>
        )}
        
        {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please arrive 15 minutes before your scheduled appointment time.
                  If you need to cancel, please do so at least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {appointment.status === 'completed' && appointment.summary && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Appointment Summary</h4>
            <p className="mt-1 text-gray-700">{appointment.summary}</p>
            <button className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800">
              <Download size={14} className="mr-1" />
              Download Summary
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
        {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
          <button
            onClick={() => {
              onClose();
              onCancel(appointment.id);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 mr-3"
          >
            Cancel Appointment
          </button>
        )}
        
        <button
          onClick={onClose}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;