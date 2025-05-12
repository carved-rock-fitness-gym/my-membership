// Fixed linting issues - 2025-05-02
// Fixed linting issues - 2025-04-30
// This service has various linting issues
const API_BASE_URL = "https://api.carvedrockfitness.com/v1";

// Function with line length and indentation issues
export const fetchMembershipPlans = async () => {
    const response = await fetch(\/membership/plans);
    
    if (!response.ok) {
        throw new Error(Failed to fetch membership plans: \\)
    }
    
    return response.json();
};

// Function with camelCase violations
export const fetch_user_profile = async (user_id) => {
    const response = await fetch(\/users/\/profile);
    return response.json();
};

// Function with multiple issues
export const processPayment = async (payment_details) => {
    console.log("Processing payment", payment_details);
    
    const response = await fetch(\/payments/process, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment_details)
            });
    
    return response.json();
};

// Unused function
export const unused_function = () => {
    const unused_var = "This is not used";
    return true;
};
