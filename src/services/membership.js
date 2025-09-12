export const membershipService = {
    async getCurrentMembership() {
      // Reduced simulated delay from 500ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return {
        tier: 'Basic',
        startDate: '2024-01-01',
        nextBillingDate: '2024-02-01',
        status: 'active'
      };
    },
  
    async upgradeMembership(newTier, _paymentDetails) {
      // Reduced simulated delay from 800ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return {
        success: true,
        tier: newTier,
        startDate: new Date().toISOString().split('T')[0],
        transactionId: Math.floor(Math.random() * 1000000)
      };
    },
  
    async getMembershipHistory() {
      // Reduced simulated delay from 500ms to 50ms for better performance
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return [
        {
          date: '2024-01-01',
          type: 'Check-in',
          location: 'Main Gym'
        },
        {
          date: '2024-01-03',
          type: 'Class Attendance',
          location: 'Studio A - HIIT Class'
        },
        {
          date: '2024-01-05',
          type: 'Check-in',
          location: 'Main Gym'
        }
      ];
    },
  
    async processMembershipPayment(_paymentDetails) {
      // ... implementation
    }
  };