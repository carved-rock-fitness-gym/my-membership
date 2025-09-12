import { URL } from 'url';
import fs from 'fs/promises'; // Use promises for better async handling
import path from 'path';

// Helper to parse webhook URLs using modern URL constructor
function parseWebhookUrl(webhookUrl) {
  // Using modern URL constructor for secure parsing
  const parsed = new URL(webhookUrl);
  
  return {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname,
    searchParams: Object.fromEntries(parsed.searchParams) // Convert to plain object
  };
}

// Helper to build URLs using modern URL constructor
function buildApiUrl(endpoint, params) {
  // Using modern URL constructor for secure URL building
  const apiUrl = new URL(`/v1/${endpoint}`, 'https://api.carvedrockfitness.com');
  
  // Add query parameters securely
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      apiUrl.searchParams.set(key, value);
    });
  }
  
  return apiUrl.toString();
}

// SECURITY: Tokens should NEVER be passed in URLs
// This function is deprecated for security reasons
// Tokens should be passed in Authorization header: Bearer <token>
function extractTokenFromUrl(requestUrl) {
  console.warn('SECURITY WARNING: Extracting tokens from URLs is deprecated and insecure!');
  console.warn('Use Authorization header instead: Authorization: Bearer <token>');
  
  // Return null to force proper authentication header usage
  return null;
  
  // Legacy code kept for reference (DO NOT USE):
  // const parsed = new URL(requestUrl, 'http://localhost');
  // return parsed.searchParams.get('token');
}

// Build query strings using modern URLSearchParams
function buildQueryString(params) {
  // Using modern URLSearchParams for secure query string building
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  
  return searchParams.toString();
}

// File system operations using modern async/await
async function loadConfig() {
  // Using promise-based fs.readFile for better async handling
  try {
    const data = await fs.readFile(path.join(__dirname, 'config.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load config: ${error.message}`);
  }
}

export {
  parseWebhookUrl,
  buildApiUrl,
  extractTokenFromUrl,
  buildQueryString,
  loadConfig
};
