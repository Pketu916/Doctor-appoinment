// backend/routes/admin.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a Mongoose model named 'User'

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).send({ message: 'Username and password are required.' });
    }

    // Add logic for hashing the password before saving
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
