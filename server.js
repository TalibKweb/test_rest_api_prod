const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const productsRoutes = require('./routes/productsRoutes')
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const rateLimit = require("express-rate-limit");
const checkAuthAdmin = require('./middleware/auth')

require('./db/db');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ Parses cookies
app.use(express.urlencoded({ extended: true })); // To handle form submissions
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1); // Important for Vercel or Heroku

const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 14, // 14 login attempts per IP
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,  // Disable X-RateLimit-* headers
  handler: (req, res) => {
    return res.status(429).json({
      message: `Too many login attempts. Please try again in ${Math.ceil((req.rateLimit.resetTime - new Date()) / 1000)} seconds.`
    });
  },
});


// >>>>>>>>>> Serve Login Page
app.get('/login', loginLimiter, (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


// >>>>>>>>>> Validate Login Page for Rediretion
app.post('/login', loginLimiter, (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  let { username, password } = req.body;

  if (process.env.DASH_USERNAME === username &&
    process.env.DASH_PASS === password) {

    res.cookie('auth_token', process.env.SECRET_TOKEN, {
      httpOnly: true, // JS can't access this
      // secure: true, // set to true in production with HTTPS
      secure: process.env.NODE_ENV === 'production', // true on Vercel
      sameSite: 'strict'
    });

    return res.redirect('/dashboard');
  }
  else {
    res.status(401).send('Unauthorized: Invalid credentials');
  }

});


// >>>>>>>>>> Serve Dashboard Page with Authentication
app.get('/dashboard', checkAuthAdmin, (req, res) => {
  // Prevent caching the dashboard page
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


// >>>>>>>>>> Serve Add New Product Page with Authentication
app.get('/add-new-product', checkAuthAdmin, (req, res) => {
  // Prevent caching the dashboard page
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, 'public', 'add-products.html'));
});


// >>>>>>>>>> Serve All Product Page with Authentication
app.get('/all-products', checkAuthAdmin, (req, res) => {
  // Prevent caching the dashboard page
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});



// Logout Route
// >>>>>>>>>>>>>>> Can add a logout page as well with timout and redirection
app.get('/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.redirect('/login')

});


// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Route Setup
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);



// Handle all other unknown routes with 404 page
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => console.log(`App live on server http://localhost:${port}`))