const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes')
const app = express();
const port = process.env.PORT || 5000;
require('./db/db');



const User = require('./models/users');

// Middlewares
app.use(cors());
app.use(express.json());

// Serving Public files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // To handle form submissions


// Route Setup
app.use('/api/users', userRoutes);


// app.get('/', (req, res) => {
//     res.status(200).send('Hello World! Home PAge')
// })

app.listen(port, () => console.log(`App live on server http://localhost:${port}`))
