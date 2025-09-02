// API Service with intentional issues for BugBot demo
// This service demonstrates common coding issues that BugBot can catch

// Security issue: Hardcoded API URL without environment configuration
const API_BASE_URL = "https://api.carvedrockfitness.com/v1";

// Function with missing error handling
export const fetchMembershipPlans = async () => {
    const response = await fetch(`${API_BASE_URL}/membership/plans`);
    
    // Security issue: No response validation
    return response.json();  // Could fail if response is not JSON
};

// Function with camelCase violations and missing error handling  
export const fetch_user_profile = async (user_id) => {
    const response = await fetch(`${API_BASE_URL}/users/${user_id}/profile`);
    return response.json();  // No error handling
};

// Function with security and code quality issues
export const processPayment = async (payment_details) => {
    console.log("Processing payment", payment_details);  // Security issue: logging sensitive data
    
    // Missing input validation
    const response = await fetch(`${API_BASE_URL}/payments/process`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            // Missing authentication headers
        },
        body: JSON.stringify(payment_details)  // No input sanitization
    });
    
    // No error handling
    return response.json();
};

// Dead code: Unused function
export const unused_function = () => {
    const unused_var = "This is not used";
    return true;
};
