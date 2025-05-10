// Fixed linting issues - 2025-05-02
// Fixed linting issues - 2025-04-30
// This service has various linting issues
const API_BASE_URL = 'https://api.carvedrockfitness.com/v1';

// Function with line length and indentation issues
export const fetchMembershipPlans = async () => {
  const response = await fetch(`${API_BASE_URL}/membership/plans`);

  if (!response.ok) {
    throw new Error('Failed to fetch membership plans:');
  }

  return response.json();
};

// Function with camelCase violations
export const fetchUserProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
  return response.json();
};

// Function with multiple issues
export const processPayment = async (paymentDetails) => {
  const response = await fetch(`${API_BASE_URL}/payments/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentDetails),
  });

  return response.json();
};
