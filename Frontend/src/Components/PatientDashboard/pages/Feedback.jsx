import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { feedback } from '../../../data/patientData'; // Assuming you have a payments data file

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  
  const doctors = [...new Set(feedback.map(f => f.doctor))];
  
  const filteredFeedback = selectedDoctor 
    ? feedback.filter(f => f.doctor === selectedDoctor)
    : feedback;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Feedback & Reviews</h1>
        <p className="text-gray-500 mt-1">Share your experience with our doctors</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Submit Feedback</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">All Doctors</option>
            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rate your experience</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  fill={(hoverRating || rating) >= star ? "#FBBF24" : "none"}
                  stroke={(hoverRating || rating) >= star ? "#FBBF24" : "#D1D5DB"}
                  className="transition-colors"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your feedback
          </label>
          <textarea
            id="feedback"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </div>

      <h2 className="text-lg font-medium text-gray-800 mb-4">Previous Feedback</h2>
      
      {filteredFeedback.length === 0 ? (
        <EmptyState 
          title="No Feedback" 
          icon={MessageSquare} 
          message={selectedDoctor ? `No feedback for ${selectedDoctor}` : "You haven't submitted any feedback yet"} 
        />
      ) : (
        <div className="space-y-4">
          {filteredFeedback.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{item.doctor}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < item.rating ? "#FBBF24" : "none"}
                      stroke={i < item.rating ? "#FBBF24" : "#D1D5DB"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mt-3">{item.comment}</p>
              {item.response && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700">Response from {item.doctor}:</p>
                  <p className="text-sm text-gray-600 mt-1">{item.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback