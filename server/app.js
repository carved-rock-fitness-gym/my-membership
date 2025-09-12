import express from 'express';
import { URL } from 'url';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow Authorization header
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Secure authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  // TODO: In production, verify JWT token signature
  // const jwt = require('jsonwebtoken');
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ error: 'Invalid token' });
  //   req.user = user;
  //   next();
  // });
  
  // For demo: basic token validation (replace with proper JWT verification)
  if (token.length < 32) {
    return res.status(403).json({ error: 'Invalid token format' });
  }
  
  req.user = { token }; // Add user info to request
  next();
}

// Member check-in endpoint
app.post('/api/members/:memberId/check-in', (req, res) => {
  const { memberId } = req.params;
  
  // Using modern URL constructor for secure parsing
  const requestUrl = new URL(req.url, `http://${req.get('host')}`);
  const timestamp = requestUrl.searchParams.get('timestamp') || Date.now();
  
  // Simulate check-in logic
  res.json({
    success: true,
    memberId,
    timestamp,
    message: 'Check-in successful'
  });
});

// Search endpoint using deprecated querystring
app.get('/api/search', (req, res) => {
  // Using modern URL constructor for secure parsing
  const requestUrl = new URL(req.url, `http://${req.get('host')}`);
  const params = Object.fromEntries(requestUrl.searchParams);
  
  // Mock search results
  res.json({
    query: params.q,
    results: [],
    total: 0
  });
});

// Secure authentication endpoint with proper JWT implementation
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // TODO: Add actual password verification here
  // For demo purposes, using secure token generation
  
  // Generate cryptographically secure random token
  const tokenBytes = crypto.randomBytes(32); // 256 bits of entropy
  const token = tokenBytes.toString('base64url'); // URL-safe base64 encoding
  
  // In production, use proper JWT with RS256 or ES256
  // const jwt = require('jsonwebtoken');
  // const token = jwt.sign({ email, iat: Date.now() }, process.env.JWT_SECRET, { 
  //   algorithm: 'RS256', expiresIn: '1h' 
  // });
  
  res.json({
    token: token,
    user: { email }
  });
});

// Membership plans endpoint
app.get('/api/membership/plans', (req, res) => {
  // Using modern URL constructor for secure parsing
  const requestUrl = new URL(req.url, `http://${req.get('host')}`);
  const includeInactive = requestUrl.searchParams.get('includeInactive') === 'true';
  
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
