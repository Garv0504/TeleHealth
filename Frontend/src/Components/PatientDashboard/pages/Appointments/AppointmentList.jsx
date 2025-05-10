import React, { useState, useEffect } from 'react';
import { Calendar, Filter, RefreshCcw } from 'lucide-react';
import AppointmentCard from './AppointmentCard';
import BookAppointment from './BookAppointment';
import AppointmentDetails from './AppointmentDetails';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters based on filters
      let queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);

      const response = await fetch(`/api/appointments?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update the local state to reflect the change
        setAppointments(appointments.map(app => 
          app.id === appointmentId ? { ...app, status: 'cancelled' } : app
        ));
      } else {
        throw new Error(data.message || 'Failed to cancel appointment');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleNewAppointment = (newAppointment) => {
    setShowBookingModal(false);
    setAppointments([newAppointment, ...appointments]);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">My Appointments</h1>
          <p className="text-gray-500 mt-1">View and manage your appointments</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Calendar size={16} className="mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Filter size={16} className="text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Filter Appointments</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="status" className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-xs font-medium text-gray-500 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-xs font-medium text-gray-500 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-3">
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-2"
          >
            Clear Filters
          </button>
          <button
            onClick={fetchAppointments}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCcw size={12} className="mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {/* Appointment List */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading appointments...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchAppointments}
            className="mt-2 text-sm text-red-700 underline"
          >
            Try again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <EmptyState 
          title="No Appointments" 
          icon={Calendar} 
          message="You don't have any appointments yet"
          actionText="Book Your First Appointment"
          onAction={() => setShowBookingModal(true)}
        />
      ) : (
        <div className="space-y-4">
          {appointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment}
              onViewDetails={handleViewDetails}
              onCancelAppointment={handleCancelAppointment}
            />
          ))}
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <BookAppointment 
                onClose={() => setShowBookingModal(false)}
                onSuccess={handleNewAppointment}
              />
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <AppointmentDetails 
                appointment={selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                onCancel={handleCancelAppointment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;