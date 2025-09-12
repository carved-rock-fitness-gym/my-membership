const express = require('express');
const url = require('url');
const querystring = require('querystring');
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

// Authentication endpoint using deprecated crypto methods
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Using deprecated crypto.createCipher (should use createCipheriv)
  const cipher = crypto.createCipher('aes192', 'a password');
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  res.json({
    token: encrypted,
    user: { email }
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

// Payment processing endpoint
app.post('/api/payments/process', (req, res) => {
  const { cardNumber, expiryDate, cvv, name, email, amount, memberId } = req.body;
  
  // Validate required fields
  if (!cardNumber || !expiryDate || !cvv || !name || !email || !amount) {
    return res.status(400).json({
      success: false,
      message: 'Missing required payment fields'
    });
  }

  // Simulate payment processing with basic validation
  if (cardNumber.length < 13 || !expiryDate.match(/^\d{2}\/\d{2}$/) || !cvv.match(/^\d{3,4}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment details'
    });
  }

  // Generate transaction ID and simulate processing delay
  const transactionId = crypto.randomUUID();
  
  setTimeout(() => {
    res.json({
      success: true,
      transactionId,
      amount,
      memberId,
      timestamp: new Date().toISOString(),
      message: 'Payment processed successfully'
    });
  }, 1000);
});

// Membership payment processing endpoint  
app.post('/api/payments/membership', (req, res) => {
  const { cardNumber, expiryDate, cvv, name, email, newTier, memberId } = req.body;
  
  // Validate required fields
  if (!cardNumber || !expiryDate || !cvv || !name || !email || !newTier || !memberId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required membership payment fields'
    });
  }

  // Get tier pricing
  const tierPricing = {
    'Basic': 29.99,
    'Premium': 49.99, 
    'Elite': 99.99
  };
  
  const amount = tierPricing[newTier];
  if (!amount) {
    return res.status(400).json({
      success: false,
      message: 'Invalid membership tier'
    });
  }

  // Simulate payment processing
  if (cardNumber.length < 13) {
    return res.status(400).json({
      success: false,
      message: 'Invalid card number'
    });
  }

  const transactionId = crypto.randomUUID();
  
  setTimeout(() => {
    res.json({
      success: true,
      transactionId,
      memberId,
      newTier,
      amount,
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      message: 'Membership payment processed successfully'
    });
  }, 1200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
