const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes')
const app = express();
const port = process.env.PORT || 5000;
require('./db/db');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions


// Serve index.html at root
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Route Setup
app.use('/api/users', userRoutes);


// Handle all other unknown routes with 404 page
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});



app.listen(port, () => console.log(`App live on server http://localhost:${port}`))
