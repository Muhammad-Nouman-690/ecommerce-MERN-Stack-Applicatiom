const express = require('express');
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.status(400).json({ message: 'Invalid credentials' });
    } 

    res.status(200).json({ message: 'Login successful', user: { name: user.name } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;