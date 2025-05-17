// Fixed linting issues - 2025-04-30
// This service has various linting issues
const API_BASE_URL = "https://api.carvedrockfitness.com/v1";

// Function with line length and indentation issues
export const fetchMembershipPlans = async () => {
  const response = await fetch("/membership/plans");

  if (!response.ok) {
    throw new Error(`Failed to fetch membership plans: ${response.status}`);
  }

  return response.json();
};

// Function with camelCase violations
export const fetchUserProfile = async (userId) => {
  const response = await fetch(`/users/${userId}/profile`);
  return response.json();
};

// Function with multiple issues
export const processPayment = async (paymentDetails) => {
  console.log("Processing payment", paymentDetails);

  const response = await fetch("/payments/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentDetails),
  });

  return response.json();
};
