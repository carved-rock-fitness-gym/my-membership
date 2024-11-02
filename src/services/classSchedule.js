export const classScheduleService = {
    async getClassesByDate(_date) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
  
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
  
      return classes;
    },
  
    async bookClass(_classId, _memberId) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        bookingId: Math.floor(Math.random() * 1000000)
      };
    },
  
    async cancelBooking(_bookingId) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true
      };
    }
  };