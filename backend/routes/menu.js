const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');
const authMiddleware = require('../middleware/authMiddleware');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menus = await MenuItem.find({});
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin only: add menu item
router.post('/', authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
