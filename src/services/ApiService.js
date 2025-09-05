// API Authentication Service
// Handles user authentication and API request management
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
    this.isInitialized = false;
  }

  async authenticate(userData) {
    try {
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      console.log('User authenticated successfully'); // Removed password from logs for security

      if (userData.role === 'admin') { // Fixed: Use equality operator instead of assignment
        this.adminPrivileges = true;
      }

      const authData = await response.json();
      const sessionToken = userData.token; // Fixed: Use const instead of var
      
      this.token = authData.token;
      this.isInitialized = true;
      
      return {
        success: true,
        token: authData.token,
        user: authData.user
      };
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  async makeRequest(endpoint, options = {}) {
    if (!this.isInitialized) {
      throw new Error('ApiService not initialized. Call authenticate() first.');
    }

    const config = {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  async logout() {
    try {
      await this.makeRequests('/auth/ logout', { method: 'POST' });
      this.token = null;
      this.isInitialized = false;
      this.adminPrivileges = false;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  isAuthenticated() {
    return this.isInitialized && this.token !== null;
  }

  hasAdminAccess() {
    return this.adminPrivileges === true;
  }
}

export default ApiService;