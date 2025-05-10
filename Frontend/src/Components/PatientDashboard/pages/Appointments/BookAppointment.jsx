import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const BookAppointment = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  // API endpoints based on provided backend routes
  const API_BASE_URL = 'http://localhost:5000/api/appointment'; // Adjust this based on your backend URL
  const ENDPOINTS = {
    specialties: `${API_BASE_URL}/`,
    doctors: `${API_BASE_URL}/`,
    availability: `${API_BASE_URL}/availability`,
    appointments: `${API_BASE_URL}/`,
    userAppointments: `${API_BASE_URL}/`
  };

  // Fetch specialties on component mount
  useEffect(() => {
    fetchSpecialties();
  }, []);

  // Generate a week of dates starting from the selected date
  useEffect(() => {
    const generateWeekDates = () => {
      const dates = [];
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
      
      return dates;
    };
    
    setWeekDates(generateWeekDates());
  }, [selectedDate]);

  // Fetch doctors when specialty is selected
  useEffect(() => {
    if (selectedSpecialty) {
      fetchDoctorsBySpecialty(selectedSpecialty.id);
    }
  }, [selectedSpecialty]);

  // Fetch time slots when doctor and date are selected
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  // Fetch all specialties
  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.specialties);
      setSpecialties(response.data);
    } catch (err) {
      setError('Failed to load specialties. Please try again.');
      console.error('Error fetching specialties:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors by specialty ID
  const fetchDoctorsBySpecialty = async (specialtyId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${ENDPOINTS.doctors}?specialtyId=${specialtyId}`);
      setDoctors(response.data);
      if (response.data.length === 0) {
        setError('No doctors available for this specialty.');
      }
    } catch (err) {
      setError('Failed to load doctors. Please try again.');
      console.error('Error fetching doctors:', err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available time slots for selected doctor and date
  const fetchAvailableSlots = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      // Using the availability endpoint with doctorId as path parameter
      const response = await axios.get(`${ENDPOINTS.availability}/${selectedDoctor.id}?date=${formattedDate}`);
      setTimeSlots(response.data);
      if (response.data.length === 0) {
        setError('No available slots for this date.');
      }
    } catch (err) {
      setError('Failed to load time slots. Please try again.');
      console.error('Error fetching time slots:', err);
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Book the appointment with backend
  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedSlot || !reason.trim()) {
      setError('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Format data according to your backend requirements
      const appointmentData = {
        doctorId: selectedDoctor.id,
        specialtyId: selectedSpecialty.id,
        date: selectedDate.toISOString().split('T')[0],
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        reason
      };
      
      // This endpoint requires authentication (JWT token should be included in headers)
      const token = localStorage.getItem('token'); // Adjust based on where you store your token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(ENDPOINTS.appointments, appointmentData, config);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      // Handle specific error types from backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        setError('Please log in to book an appointment');
        // Optionally redirect to login page
        // navigate('/login', { state: { returnUrl: '/appointment' } });
      } else {
        setError('Failed to book appointment. Please try again.');
      }
      console.error('Error booking appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedSpecialty) {
      setError('Please select a specialty');
      return;
    }
    if (step === 2 && !selectedDoctor) {
      setError('Please select a doctor');
      return;
    }
    if (step === 3 && !selectedSlot) {
      setError('Please select a time slot');
      return;
    }
    
    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };

  const renderSpecialtySelection = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Select a Specialty</h2>
        
        {loading && specialties?.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading specialties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties?.map((specialty) => (
              <div 
                key={specialty.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                  selectedSpecialty?.id === specialty.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                <div className="text-2xl mb-2">{specialty.icon}</div>
                <h3 className="text-sm font-medium">{specialty.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDoctorSelection = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Select a {selectedSpecialty?.name} Doctor
        </h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading doctors...</p>
          </div>
        ) : doctors?.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No doctors found for this specialty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {doctors?.map((doctor) => (
              <div 
                key={doctor.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                    {doctor.image ? (
                      <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-full" />
                    ) : (
                      <User className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      {'★'.repeat(Math.floor(doctor.rating))}
                      <span className="text-gray-500 ml-1">{doctor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{doctor.availability}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCalendarSelection = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Select Date & Time for Dr. {selectedDoctor?.name}
        </h2>
        
        {/* Date Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Select Date</h3>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevWeek}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNextWeek}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {weekDates.map((date, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{daysOfWeek[date.getDay()]}</div>
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                    isSameDay(date, selectedDate)
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.getDate()}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Time Slot Selection */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Select Time</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading available slots...</p>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Clock className="h-8 w-8 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-500">No available slots for this date</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.isAvailable}
                  className={`py-2 px-3 border rounded-md text-sm transition-colors ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : slot.isAvailable
                        ? 'border-gray-300 hover:border-blue-500'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                  onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                >
                  <div className="flex items-center justify-between">
                    <span>{slot.startTime}</span>
                    <span className="text-xs">
                      {slot.isAvailable ? '✓ Available' : '✕ Booked'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Confirm Appointment</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="mb-3">
            <span className="text-sm text-gray-500">Specialty</span>
            <p className="font-medium">{selectedSpecialty?.name}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm text-gray-500">Doctor</span>
            <p className="font-medium">{selectedDoctor?.name}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm text-gray-500">Date</span>
            <p className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="mb-3">
            <span className="text-sm text-gray-500">Time</span>
            <p className="font-medium">{selectedSlot?.startTime} - {selectedSlot?.endTime}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Visit*
          </label>
          <textarea
            id="reason"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please describe your symptoms or reason for this appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                By confirming this appointment, you agree to our cancellation policy. Please arrive 15 minutes before your scheduled time.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Book an Appointment</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            &times;
          </button>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
            step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
          }`}>
            1
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
            step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
          }`}>
            2
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
            step >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
          }`}>
            3
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
            step >= 4 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'
          }`}>
            4
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Specialty</span>
          <span>Doctor</span>
          <span>Schedule</span>
          <span>Confirm</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {step === 1 && renderSpecialtySelection()}
        {step === 2 && renderDoctorSelection()}
        {step === 3 && renderCalendarSelection()}
        {step === 4 && renderConfirmation()}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
        {step > 1 ? (
          <button 
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          >
            Back
          </button>
        ) : (
          <button 
            onClick={() => navigate('/patient-dashboard/appointments')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        
        {step < 4 ? (
          <button 
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleBookAppointment}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;