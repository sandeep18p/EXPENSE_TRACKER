const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('workin')
  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });
    return res.status(201).json({ message: 'User signed up successfully!', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
