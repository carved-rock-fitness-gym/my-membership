import React from 'react';
import PropTypes from 'prop-types';

export const TrainerList = ({ onTrainerSelect }) => {
  const trainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialties: ['Weight Training', 'HIIT'],
      experience: '8 years',
      rating: 4.8,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Mike Chen',
      specialties: ['Yoga', 'Rehabilitation'],
      experience: '5 years',
      rating: 4.9,
      imageUrl: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      specialties: ['Nutrition', 'Strength Training'],
      experience: '10 years',
      rating: 4.7,
      imageUrl: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="space-y-4">
      {trainers.map((trainer) => (
        <div
          key={trainer.id}
          className="p-4 bg-white rounded-lg shadow flex items-start space-x-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onTrainerSelect(trainer)}
        >
          <img
            src={trainer.imageUrl}
            alt={trainer.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{trainer.name}</h3>
            <p className="text-sm text-gray-600">Experience: {trainer.experience}</p>
            <p className="text-sm text-gray-600">
              Specialties: {trainer.specialties.join(', ')}
            </p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">{trainer.rating}/5.0</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

TrainerList.propTypes = {
  onTrainerSelect: PropTypes.func.isRequired
};