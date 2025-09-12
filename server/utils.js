// Removed deprecated url and querystring imports for better performance
const fs = require('fs').promises; // Use promises version for better async handling
const path = require('path');

// Helper to parse webhook URLs using modern URL constructor
function parseWebhookUrl(webhookUrl) {
  // Using modern URL constructor for better performance
  const parsed = new URL(webhookUrl);
  
  return {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname,
    query: Object.fromEntries(parsed.searchParams)
  };
}

// Helper to build URLs using modern URL constructor
function buildApiUrl(endpoint, params) {
  // Using modern URL constructor for better performance
  const apiUrl = new URL(`/v1/${endpoint}`, 'https://api.carvedrockfitness.com');
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      apiUrl.searchParams.set(key, value);
    });
  }
  return apiUrl.toString();
}

// Parse authentication tokens from URLs
function extractTokenFromUrl(requestUrl) {
  // Using modern URL API for better performance
  const url = new URL(requestUrl, 'http://localhost');
  const token = url.searchParams.get('token');
  return token ? decodeURIComponent(token) : null;
}

// Build query strings using modern URLSearchParams
function buildQueryString(params) {
  // Using modern URLSearchParams for better performance
  return new URLSearchParams(params).toString();
}

// File system operations using modern async/await
async function loadConfig() {
  // Using modern fs.promises for better async handling and performance
  try {
    const data = await fs.readFile(path.join(__dirname, 'config.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load config: ${error.message}`);
  }
}

module.exports = {
  parseWebhookUrl,
  buildApiUrl,
  extractTokenFromUrl,
  buildQueryString,
  loadConfig
};
