const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authMiddleware = require('../middleware/authMiddleware');

// Place an order (logged in users only)
router.post('/', authMiddleware.verifyToken, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const order = new Order({ user: req.user.id, items, totalPrice });
    await order.save();
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
