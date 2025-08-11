const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

// Helper to parse webhook URLs using deprecated url.parse
function parseWebhookUrl(webhookUrl) {
  // Using deprecated url.parse instead of new URL()
  const parsed = url.parse(webhookUrl, true);
  
  return {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname,
    query: parsed.query
  };
}

// Helper to build URLs using deprecated url.format
function buildApiUrl(endpoint, params) {
  // Using deprecated url.format instead of URL constructor
  return url.format({
    protocol: 'https',
    hostname: 'api.carvedrockfitness.com',
    pathname: `/v1/${endpoint}`,
    query: params
  });
}

// Parse authentication tokens from URLs
function extractTokenFromUrl(requestUrl) {
  // Using deprecated approach
  const parsed = url.parse(requestUrl, true);
  const token = parsed.query.token;
  
  // Using deprecated querystring.unescape
  return token ? querystring.unescape(token) : null;
}

// Build query strings the old way
function buildQueryString(params) {
  // Using deprecated querystring.stringify
  return querystring.stringify(params);
}

// File system operations using callbacks (not promises)
function loadConfig(callback) {
  // Using callback-based fs.readFile instead of fs.promises
  fs.readFile(path.join(__dirname, 'config.json'), 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    
    try {
      const config = JSON.parse(data);
      callback(null, config);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

module.exports = {
  parseWebhookUrl,
  buildApiUrl,
  extractTokenFromUrl,
  buildQueryString,
  loadConfig
};
