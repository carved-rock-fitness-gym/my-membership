// Secure API client with proper authentication handling
import { authUtils } from './auth.js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Create secure request headers
  createHeaders(additionalHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };

    // Add authentication header if user is logged in
    const authHeader = authUtils.getAuthHeader();
    return { ...headers, ...authHeader };
  }

  // Generic request method with proper error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: this.createHeaders(options.headers),
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      // Handle authentication errors
      if (response.status === 401) {
        console.warn('Authentication failed - clearing stored tokens');
        authUtils.clearAuth();
        // Optionally redirect to login page
        // window.location.href = '/login';
        throw new Error('Authentication required');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // HTTP method helpers
  async get(endpoint, params = {}) {
    const url = new URL(endpoint, this.baseURL);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    return this.request(url.pathname + url.search, {
      method: 'GET'
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Authentication specific methods
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    // Store token and user data securely
    if (response.token) {
      authUtils.setAuthToken(response.token);
    }
    if (response.user) {
      authUtils.setUser(response.user);
    }
    
    return response;
  }

  async logout() {
    // Clear local authentication data
    authUtils.clearAuth();
    
    // Optionally call server logout endpoint
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Server logout failed:', error);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };