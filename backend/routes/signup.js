const express = require('express');
const bcrypt = require('bcryptjs'); // To hash passwords
const User = require('../models/user')

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  // Validate request
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and Password are required' });
  }
  try {
    // Check for existing user
    const existingUser = await User.findOne({name});
    if(existingUser) {
      return res.status(409).json({message:'User already exists'});
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Synchronous hashing
    // Create and save user
    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();
     // Return success response
    res.status(201).json({ message: 'User Created Successfully', name });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ message: 'Error Creating user', error });
  }
});

module.exports = router;