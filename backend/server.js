require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const SignUpRoutes = require('./routes/signup'); // Path to the signup route file
const loginRoutes = require('./routes/login'); // Path to the login route file

const app = express();
// Environment Variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body parser

// Routes
app.use('/api', SignUpRoutes);
app.use('/api', loginRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB locally'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));