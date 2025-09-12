const express = require('express');
const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Added for secure JWT implementation

const app = express();
const PORT = process.env.PORT || 3001;

// JWT Configuration - Added for security fix
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret-key'; // Should use environment variable in production
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h'; // Token expires in 24 hours

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Added Authorization header support
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Authentication middleware for protected routes - Added to handle token expiration
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({
      error: 'Access token required'
    });
  }
  
  try {
    // Verify JWT token and check expiration
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'carved-rock-fitness',
      audience: 'fitness-app-users'
    });
    
    req.user = decoded; // Add user info to request
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token has expired',
        expiredAt: error.expiredAt
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        error: 'Invalid token'
      });
    } else {
      return res.status(403).json({
        error: 'Token verification failed'
      });
    }
  }
};

// Member check-in endpoint - Now protected with authentication
app.post('/api/members/:memberId/check-in', authenticateToken, (req, res) => {
  const { memberId } = req.params;
  
  // Using deprecated url.parse() to parse the full URL
  const parsedUrl = url.parse(req.url, true);
  const timestamp = parsedUrl.query.timestamp || Date.now();
  
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
  // Using deprecated url.parse() instead of new URL()
  const parsedUrl = url.parse(req.url);
  const params = querystring.parse(parsedUrl.query);
  
  // Mock search results
  res.json({
    query: params.q,
    results: [],
    total: 0
  });
});

// Secure Authentication endpoint using JWT with expiration - Fixed security vulnerability
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }
  
  try {
    // In production, validate against database with hashed passwords
    // For demo purposes, accepting any valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }
    
    // Create JWT payload
    const payload = {
      email: email,
      userId: crypto.createHash('sha256').update(email).digest('hex').substring(0, 8), // Generate consistent user ID
      iat: Math.floor(Date.now() / 1000), // Issued at timestamp
    };
    
    // Generate secure JWT token with expiration
    const token = jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRY,
      issuer: 'carved-rock-fitness',
      audience: 'fitness-app-users'
    });
    
    res.json({
      token,
      user: { 
        email,
        userId: payload.userId
      },
      expiresIn: JWT_EXPIRY // Include expiration info for client
    });
    
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      error: 'Internal server error during authentication'
    });
  }
});

// Token refresh endpoint - Added for complete JWT implementation
app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  try {
    // Create new token with fresh expiration
    const payload = {
      email: req.user.email,
      userId: req.user.userId,
      iat: Math.floor(Date.now() / 1000), // New issued at timestamp
    };
    
    const newToken = jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRY,
      issuer: 'carved-rock-fitness',
      audience: 'fitness-app-users'
    });
    
    res.json({
      token: newToken,
      expiresIn: JWT_EXPIRY
    });
    
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token refresh failed'
    });
  }
});

// Protected user profile endpoint - Added to test JWT authentication
app.get('/api/user/profile', authenticateToken, (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      userId: req.user.userId,
      tokenIssuedAt: new Date(req.user.iat * 1000).toISOString()
    }
  });
});

// Membership plans endpoint
app.get('/api/membership/plans', (req, res) => {
  // Using url.parse to check for query params
  const { query } = url.parse(req.url, true);
  const includeInactive = query.includeInactive === 'true';
  
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
