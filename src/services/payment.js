// Payment service for handling payment processing API calls
export const paymentService = {
  /**
   * Process payment for membership subscription
   * @param {Object} paymentDetails - Payment information
   * @param {string} paymentDetails.cardNumber - Credit card number
   * @param {string} paymentDetails.expiryDate - Card expiry date (MM/YY)
   * @param {string} paymentDetails.cvv - Card security code
   * @param {string} paymentDetails.name - Name on card
   * @param {string} paymentDetails.email - Customer email
   * @param {number} amount - Payment amount
   * @param {string} memberId - Member ID for the subscription
   * @returns {Promise<Object>} Payment processing result
   */
  async processPayment(paymentDetails, amount, memberId = null) {
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentDetails,
          amount,
          memberId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }

      return await response.json();
    } catch (error) {
      // Log error for debugging while providing user-friendly message
      console.error('Payment processing error:', error);
      throw new Error(`Payment failed: ${error.message}`);
    }
  },

  /**
   * Process membership upgrade payment
   * @param {Object} paymentDetails - Payment information  
   * @param {string} newTier - New membership tier
   * @param {string} memberId - Member ID
   * @returns {Promise<Object>} Payment and upgrade result
   */
  async processMembershipPayment(paymentDetails, newTier, memberId) {
    try {
      const response = await fetch('/api/payments/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentDetails,
          newTier,
          memberId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Membership payment processing failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Membership payment error:', error);
      throw new Error(`Membership upgrade failed: ${error.message}`);
    }
  },

  /**
   * Validate payment details before processing
   * @param {Object} paymentDetails - Payment information to validate
   * @returns {Object} Validation result with any errors
   */
  validatePaymentDetails(paymentDetails) {
    const errors = {};

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 13) {
      errors.cardNumber = 'Valid card number is required';
    }

    if (!paymentDetails.expiryDate || !paymentDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      errors.expiryDate = 'Valid expiry date is required (MM/YY format)';
    }

    if (!paymentDetails.cvv || !paymentDetails.cvv.match(/^[0-9]{3,4}$/)) {
      errors.cvv = 'Valid CVV is required';
    }

    if (!paymentDetails.name || paymentDetails.name.trim().length === 0) {
      errors.name = 'Name on card is required';
    }

    if (!paymentDetails.email || !paymentDetails.email.includes('@')) {
      errors.email = 'Valid email address is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};