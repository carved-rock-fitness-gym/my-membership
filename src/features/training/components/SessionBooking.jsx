import React, { useState } from 'react';
import { trainingService } from '../../../services/training';
import PropTypes from 'prop-types';

export const SessionBooking = ({ trainer, onBookingComplete }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const availableSlots = trainer?.availability?.find(a => a.date === selectedDate)?.slots || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      return;
    }

    setLoading(true);

    try {
      await trainingService.bookTrainingSession(trainer.id, selectedDate, selectedTime);
      onBookingComplete();
    } catch (error) {
      console.error('Failed to book session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Book a Session with {trainer.name}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose a date</option>
            {trainer.availability?.map(date => (
              <option key={date.date} value={date.date}>
                {new Date(date.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={!selectedDate}
          >
            <option value="">Choose a time</option>
            {availableSlots.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedDate || !selectedTime}
          className={`w-full py-2 px-4 rounded-md font-medium text-white 
            ${loading || !selectedDate || !selectedTime 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Booking...' : 'Book Session'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Session Details:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Duration: 60 minutes</li>
          <li>Specialties: {trainer.specialties.join(', ')}</li>
          <li>Experience: {trainer.experience}</li>
        </ul>
      </div>
    </div>
  );
};

SessionBooking.propTypes = {
  trainer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    availability: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      times: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
    experience: PropTypes.string.isRequired
  }).isRequired,
  onBookingComplete: PropTypes.func.isRequired
};