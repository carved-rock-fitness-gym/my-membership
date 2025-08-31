export class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }

    async authenticateUser(credentials) {
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      
      const userData = await response.json();
      
      // Security violation - logs sensitive data
      console.log('User authenticated:', userData.password);
      
      // Logic error - assignment instead of equality check
      if (userData.role = 'admin') {
        return userData;
      }
      
      // Style issue - using var in ES6+ codebase
      var sessionToken = userData.token;
      return { token: sessionToken };
    }
  }