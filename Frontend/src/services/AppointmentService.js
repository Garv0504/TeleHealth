/**
 * Appointment Service
 * Contains functions for interacting with the appointment API
 */

// Get all appointments for current user with optional filters
export const getUserAppointments = async (filters = {}) => {
  try {
    // Build query params
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    
    const response = await fetch(`/api/appointments?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get available slots for a doctor on a specific date
export const getAvailableSlots = async (doctorId, date) => {
  try {
    const dateStr = new Date(date).toISOString().split('T')[0];
    const response = await fetch(`/api/appointments/availability/${doctorId}?date=${dateStr}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

// Book an appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to book appointment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

// Update appointment status (e.g., cancel, reschedule)
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await fetch(`/api/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update appointment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

// Helper function to format appointment date for display
export const formatAppointmentDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to check if an appointment can be cancelled
export const canCancelAppointment = (appointment) => {
  if (appointment.status !== 'confirmed' && appointment.status !== 'pending') {
    return false;
  }
  
  // Check if appointment is within 24 hours
  const appointmentDate = new Date(appointment.date);
  appointmentDate.setHours(
    parseInt(appointment.startTime.split(':')[0]),
    parseInt(appointment.startTime.split(':')[1])
  );
  
  const now = new Date();
  const diffInHours = (appointmentDate - now) / (1000 * 60 * 60);
  
  return diffInHours >= 24;
};