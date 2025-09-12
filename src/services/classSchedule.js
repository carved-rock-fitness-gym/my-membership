// Import centralized cache manager for better performance
import { classCache } from '../utils/cache.js';

export const classScheduleService = {
    async getClassesByDate(date) {
      // Check cache first for performance optimization
      const cacheKey = `classes_${date}`;
      if (classCache.has(cacheKey)) {
        return classCache.get(cacheKey);
      }
  
      // Mock class data
      const classes = [
        {
          id: 1,
          name: 'Morning HIIT',
          instructor: 'Sarah Johnson',
          time: '07:00',
          duration: 45,
          capacity: 20,
          enrolled: 15,
          level: 'Intermediate'
        },
        {
          id: 2,
          name: 'Power Yoga',
          instructor: 'Mike Chen',
          time: '09:00',
          duration: 60,
          capacity: 15,
          enrolled: 12,
          level: 'All Levels'
        },
        {
          id: 3,
          name: 'Spin Class',
          instructor: 'Lisa Thompson',
          time: '17:30',
          duration: 45,
          capacity: 25,
          enrolled: 20,
          level: 'Advanced'
        }
      ];
  
      // Cache the results for improved performance
      classCache.set(cacheKey, classes);
      return classes;
    },

    async bookClass(classId, memberId) {
      // Removed artificial delay for better performance
      const bookingId = Math.floor(Math.random() * 1000000);
      
      // Store booking in cache for faster retrieval
      const bookingKey = `booking_${bookingId}`;
      classCache.set(bookingKey, { classId, memberId, bookingId, timestamp: Date.now() });
      
      return {
        success: true,
        bookingId
      };
    },

    async cancelBooking(bookingId) {
      // Removed artificial delay for better performance
      const bookingKey = `booking_${bookingId}`;
      classCache.delete(bookingKey); // Remove from cache
      
      return {
        success: true
      };
    }
  };