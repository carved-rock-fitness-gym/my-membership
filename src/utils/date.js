export const dateUtils = {
    formatTime(time) {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },
  
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  
    getTimeSlots(duration = 60) {
      const slots = [];
      const start = 6; // 6 AM
      const end = 21; // 9 PM
      
      for (let hour = start; hour < end; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (duration <= 30) {
          slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
      
      return slots;
    }
  };