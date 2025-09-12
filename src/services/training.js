export const trainingService = {
    async getAvailableTrainers() {
      // Reduced simulated delay from 500ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return [
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
    },
  
    async bookTrainingSession(trainerId, date, time) {
      // Reduced simulated delay from 800ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return {
        success: true,
        sessionId: Math.floor(Math.random() * 1000000),
        trainer: 'Sarah Johnson',
        date,
        time
      };
    },
  
    async getTrainingHistory() {
      // Reduced simulated delay from 500ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return [
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
    }
  };