// Secure authentication utility for client-side token management
import { storageUtils } from './storage.js';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const authUtils = {
  // Store authentication token securely
  setAuthToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token provided');
    }
    
    // In production, consider using secure storage or encrypted storage
    // For now, using localStorage with additional validation
    return storageUtils.setItem(AUTH_TOKEN_KEY, {
      token,
      timestamp: Date.now(),
      // Add token expiry for additional security
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
    });
  },

  // Get authentication token with expiry check
  getAuthToken() {
    const tokenData = storageUtils.getItem(AUTH_TOKEN_KEY);
    
    if (!tokenData) {
      return null;
    }
    
    // Check if token has expired
    if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
      console.warn('Authentication token has expired');
      this.clearAuth(); // Clean up expired token
      return null;
    }
    
    return tokenData.token;
  },

  // Store user information
  setUser(user) {
    return storageUtils.setItem(AUTH_USER_KEY, user);
  },

  // Get current user
  getUser() {
    return storageUtils.getItem(AUTH_USER_KEY);
  },

  // Clear all authentication data
  clearAuth() {
    storageUtils.removeItem(AUTH_TOKEN_KEY);
    storageUtils.removeItem(AUTH_USER_KEY);
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAuthToken();
    return !!token;
  },

  // Create Authorization header for API requests
  getAuthHeader() {
    const token = this.getAuthToken();
    
    if (!token) {
      return {};
    }
    
    return {
      'Authorization': `Bearer ${token}`
    };
  }
};