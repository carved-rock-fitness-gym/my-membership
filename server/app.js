const express = require('express');
// Removed deprecated url and querystring imports for better performance
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Member check-in endpoint
app.post('/api/members/:memberId/check-in', (req, res) => {
  const { memberId } = req.params;
  
  // Using modern URL API to parse query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const timestamp = url.searchParams.get('timestamp') || Date.now();
  
  // Simulate check-in logic
  res.json({
    success: true,
    memberId,
    timestamp,
    message: 'Check-in successful'
  });
});

// Search endpoint using modern URL API
app.get('/api/search', (req, res) => {
  // Using modern URLSearchParams instead of deprecated querystring
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const params = Object.fromEntries(urlParams);
  
  // Mock search results
  res.json({
    query: params.q || '',
    results: [],
    total: 0
  });
});

// Authentication endpoint using modern crypto methods
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Using modern crypto.createCipheriv with explicit IV for better security and performance
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync('a password', 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  res.json({
    token: encrypted,
    user: { email }
  });
});

// Membership plans endpoint
app.get('/api/membership/plans', (req, res) => {
  // Using modern URL API to check for query params
  const url = new URL(req.url, `http://${req.headers.host}`);
  const includeInactive = url.searchParams.get('includeInactive') === 'true';
  
  const plans = [
    { id: 1, name: 'Basic', price: 29.99, active: true },
    { id: 2, name: 'Premium', price: 49.99, active: true },
    { id: 3, name: 'Elite', price: 99.99, active: true }
  ];
  
  res.json(includeInactive ? plans : plans.filter(p => p.active));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
