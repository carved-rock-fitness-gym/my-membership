// Fixed linting issues - 2025-04-30
// This service has various linting issues
const API_BASE_URL = "https://api.carvedrockfitness.com/v1"  // Missing semicolon and using double quotes

// Function with line length and indentation issues
export const fetchMembershipPlans = async () => {
    const response = await fetch(\/membership/plans)  // Missing semicolon
    
    if (!response.ok) {
        throw new Error(Failed to fetch membership plans: \\\)  // Missing semicolon
    }
    
    return response.json();
}

// Function with camelCase violations
export const fetch_user_profile = async (user_id) => {  // camelCase violation
    const response = await fetch(\/users/\/profile);
    return response.json();
}

// Function with multiple issues
export const processPayment = async (payment_details) => {  // camelCase violation
    console.log("Processing payment", payment_details);  // Console warning and double quotes
    
    const response = await fetch(\/payments/process, {
                method: "POST",  // Wrong indentation and double quotes
                headers: {
                    "Content-Type": "application/json"  // Double quotes
                },
                body: JSON.stringify(payment_details)
            });
    
    return response.json();
}

// Unused function
export const unused_function = () => {  // camelCase violation
    const unused_var = "This is not used";  // camelCase violation and unused variable
    return true;
}
