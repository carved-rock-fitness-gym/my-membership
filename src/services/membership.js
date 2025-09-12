// Import centralized cache manager for better performance
import { membershipCache } from '../utils/cache.js';

export const membershipService = {
    async getCurrentMembership() {
      // Check cache first for performance optimization
      const cacheKey = 'current_membership';
      if (membershipCache.has(cacheKey)) {
        return membershipCache.get(cacheKey);
      }
      
      const membership = {
        tier: 'Basic',
        startDate: '2024-01-01',
        nextBillingDate: '2024-02-01',
        status: 'active'
      };
      
      // Cache membership data for faster subsequent access
      membershipCache.set(cacheKey, membership);
      return membership;
    },

    async upgradeMembership(newTier, paymentDetails) {
      // Removed artificial delay for better performance
      const transactionId = Math.floor(Math.random() * 1000000);
      const startDate = new Date().toISOString().split('T')[0];
      
      const upgradedMembership = {
        success: true,
        tier: newTier,
        startDate,
        transactionId
      };
      
      // Update cache with new membership data
      membershipCache.set('current_membership', {
        tier: newTier,
        startDate,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active'
      });
      
      return upgradedMembership;
    },

    async getMembershipHistory() {
      // Check cache first for performance optimization
      const cacheKey = 'membership_history';
      if (membershipCache.has(cacheKey)) {
        return membershipCache.get(cacheKey);
      }
      
      const history = [
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
      
      // Cache history for faster subsequent access
      membershipCache.set(cacheKey, history);
      return history;
    },

    async processMembershipPayment(paymentDetails) {
      // Removed artificial delay for better performance
      const transactionId = Math.floor(Math.random() * 1000000);
      
      return {
        success: true,
        transactionId,
        amount: paymentDetails.amount,
        processedAt: new Date().toISOString()
      };
    }
  };