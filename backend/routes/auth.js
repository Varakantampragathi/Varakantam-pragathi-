const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found.' });
    console.log("User found:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    console.log("Password match:", isMatch);
    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, keys.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    console.log("Token generated:", token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
