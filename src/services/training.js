// Import centralized cache manager for better performance
import { trainingCache } from '../utils/cache.js';

export const trainingService = {
    async getAvailableTrainers() {
      // Check cache first for performance optimization
      const cacheKey = 'available_trainers';
      if (trainingCache.has(cacheKey)) {
        return trainingCache.get(cacheKey);
      }
      
      const trainers = [
        {
          id: 1,
          name: 'Sarah Johnson',
          specialties: ['Weight Training', 'HIIT'],
          experience: '8 years',
          rating: 4.8,
          availability: [
            { date: '2024-01-15', slots: ['09:00', '10:00', '14:00'] },
            { date: '2024-01-16', slots: ['11:00', '13:00', '15:00'] }
          ]
        },
        {
          id: 2,
          name: 'Mike Chen',
          specialties: ['Yoga', 'Rehabilitation'],
          experience: '5 years',
          rating: 4.9,
          availability: [
            { date: '2024-01-15', slots: ['08:00', '13:00', '16:00'] },
            { date: '2024-01-16', slots: ['09:00', '14:00', '17:00'] }
          ]
        }
      ];
      
      // Cache trainers data for faster subsequent access
      trainingCache.set(cacheKey, trainers);
      return trainers;
    },

    async bookTrainingSession(trainerId, date, time) {
      // Removed artificial delay for better performance
      const sessionId = Math.floor(Math.random() * 1000000);
      
      // Get trainer info from cache for efficiency
      const trainers = trainingCache.get('available_trainers') || [];
      const trainer = trainers.find(t => t.id === parseInt(trainerId));
      
      const session = {
        success: true,
        sessionId,
        trainer: trainer ? trainer.name : 'Sarah Johnson',
        date,
        time
      };
      
      // Store session in cache for tracking
      const sessionKey = `session_${sessionId}`;
      trainingCache.set(sessionKey, { trainerId, date, time, sessionId, timestamp: Date.now() });
      
      return session;
    },

    async getTrainingHistory() {
      // Check cache first for performance optimization
      const cacheKey = 'training_history';
      if (trainingCache.has(cacheKey)) {
        return trainingCache.get(cacheKey);
      }
      
      const history = [
        {
          date: '2024-01-01',
          trainer: 'Sarah Johnson',
          type: 'Weight Training',
          notes: 'Focused on proper form for deadlifts'
        },
        {
          date: '2024-01-08',
          trainer: 'Sarah Johnson',
          type: 'HIIT',
          notes: 'Increased intensity, good progress'
        }
      ];
      
      // Cache history for faster subsequent access
      trainingCache.set(cacheKey, history);
      return history;
    }
  };