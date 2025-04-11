const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  category:    { type: String, enum: ['Biryani', 'Starter', 'Beverage', 'Dessert'], required: true },
  price:       { type: Number, required: true },
  imageUrl:    { type: String, required: true }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
