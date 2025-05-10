import React, { useState } from 'react';
import { Calendar, Clock, Plus, X } from 'lucide-react';

const ManageSlots = () => {
  const DAYS_OF_WEEK = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const [status, setStatus] = useState({
    loading: false,
    message: '',
    isError: false
  });
  
  const [newAvailability, setNewAvailability] = useState({
    dayOfWeek: '',
    slots: [{ startTime: '', endTime: '' }],
    isRecurring: true,
    validTo: ''
  });

  const handleDayChange = (e) => {
    setNewAvailability(prev => ({
      ...prev,
      dayOfWeek: e.target.value
    }));
  };

  const handleRecurringChange = (e) => {
    setNewAvailability(prev => ({
      ...prev,
      isRecurring: e.target.checked,
      validTo: e.target.checked ? '' : prev.validTo
    }));
  };

  const handleValidToChange = (e) => {
    setNewAvailability(prev => ({
      ...prev,
      validTo: e.target.value
    }));
  };

  const handleSlotChange = (index, field, value) => {
    setNewAvailability(prev => {
      const updatedSlots = [...prev.slots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [field]: value
      };
      return { ...prev, slots: updatedSlots };
    });
  };

  const addSlotField = () => {
    setNewAvailability(prev => ({
      ...prev,
      slots: [...prev.slots, { startTime: '', endTime: '' }]
    }));
  };

  const removeSlotField = (index) => {
    setNewAvailability(prev => {
      const updatedSlots = prev.slots.filter((_, i) => i !== index);
      return { ...prev, slots: updatedSlots };
    });
  };

  const validateForm = () => {
    if (!newAvailability.dayOfWeek) {
      setStatus({
        loading: false,
        message: 'Please select a day of the week',
        isError: true
      });
      return false;
    }
    
    if (!newAvailability.isRecurring && !newAvailability.validTo) {
      setStatus({
        loading: false,
        message: 'Please provide a valid until date for non-recurring availability',
        isError: true
      });
      return false;
    }
    
    const validSlots = newAvailability.slots.every(slot => 
      slot.startTime && slot.endTime
    );
    
    if (!validSlots) {
      setStatus({
        loading: false,
        message: 'Please fill all time slots',
        isError: true
      });
      return false;
    }
    
    return true;
  };

  const saveAvailability = async () => {
    if (!validateForm()) return;
    
    setStatus({
      loading: true,
      message: 'Saving availability...',
      isError: false
    });
    
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dayOfWeek: newAvailability.dayOfWeek,
          slots: newAvailability.slots,
          isRecurring: newAvailability.isRecurring,
          validTo: newAvailability.validTo || undefined
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset the form
        setNewAvailability({
          dayOfWeek: '',
          slots: [{ startTime: '', endTime: '' }],
          isRecurring: true,
          validTo: ''
        });
        
        setStatus({
          loading: false,
          message: 'Availability saved successfully!',
          isError: false
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setStatus(prev => ({...prev, message: ''}));
        }, 3000);
      } else {
        setStatus({
          loading: false,
          message: data.error || 'Failed to save availability',
          isError: true
        });
      }
    } catch (err) {
      console.error('Error saving availability:', err);
      setStatus({
        loading: false,
        message: 'Error connecting to server. Please try again.',
        isError: true
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Availability</h1>
      
      {/* Status messages */}
      {status.message && (
        <div className={`p-4 mb-6 rounded-md ${status.isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {status.message}
        </div>
      )}
      
      {/* Add new availability form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium mb-4">Set Your Availability</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
            <select
              value={newAvailability.dayOfWeek}
              onChange={handleDayChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a day</option>
              {DAYS_OF_WEEK.map((day, index) => (
                <option key={day} value={index}>{day}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <input
                type="checkbox"
                id="isRecurring"
                checked={newAvailability.isRecurring}
                onChange={handleRecurringChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-gray-700">
                Recurring weekly
              </label>
            </div>
            
            {!newAvailability.isRecurring && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                <input
                  type="date"
                  value={newAvailability.validTo}
                  onChange={handleValidToChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-medium text-gray-700">Time Slots</h3>
            <button
              type="button"
              onClick={addSlotField}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Another Slot
            </button>
          </div>
          
          {newAvailability.slots.map((slot, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {index === 0 ? 'Start Time' : <span className="opacity-0">Start Time</span>}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {index === 0 ? 'End Time' : <span className="opacity-0">End Time</span>}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {newAvailability.slots.length > 1 && (
                <div className="flex items-end pb-1">
                  <button
                    type="button"
                    onClick={() => removeSlotField(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={saveAvailability}
          disabled={status.loading}
          className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            status.loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {status.loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Save Availability
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Note:</h3>
        <p className="text-gray-600 text-sm">
          Set your availability for each day of the week. You can add multiple time slots per day.
          For recurring schedules, these slots will be available every week. For non-recurring 
          schedules, you need to set an end date.
        </p>
      </div>
    </div>
  );
};

export default ManageSlots;