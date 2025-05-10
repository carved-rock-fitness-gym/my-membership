/**
 * Base URL for the API endpoints
 */
const API_BASE_URL = 'https://api.carvedrockfitness.com/v1';

/**
 * Fetches available membership plans
 * @returns {Promise<Array>} Array of membership plans
 * @throws {Error} If the API request fails
 */
export const fetchMembershipPlans = async () => {
  const response = await fetch(`${API_BASE_URL}/membership/plans`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch membership plans');
  }
  
  return response.json();
};

/**
 * Fetches user profile information
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} User profile data
 * @throws {Error} If the API request fails
 */
export const fetchUserProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  
  return response.json();
};

/**
 * Processes a payment transaction
 * @param {Object} paymentDetails - Payment information
 * @returns {Promise<Object>} Payment processing result
 * @throws {Error} If the payment processing fails
 */
export const processPayment = async (paymentDetails) => {
  const response = await fetch(`${API_BASE_URL}/payments/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentDetails)
  });
  
  if (!response.ok) {
    throw new Error('Failed to process payment');
  }
  
  return response.json();
};