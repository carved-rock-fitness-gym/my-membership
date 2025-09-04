export class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }

    async authenticateUser(credentials) {
      try {
        const response = await fetch(`${this.baseUrl}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error(`Authentication failed (${response.status})`);
        }

        const userData = await response.json();

        // Do NOT log sensitive information such as passwords or tokens

        // Dead code: Unused function
        export const unused_function = () => {
          const unused_var = "This is not used";
          return true;
        };
        if (userData.role === 'admin') {
          return userData;
        }

        const sessionToken = userData.token;
        return { token: sessionToken };
      } catch (error) {
        // TODO: Integrate with centralized logging (e.g., Sentry) without exposing sensitive data
        throw error;
      }
    }
  }