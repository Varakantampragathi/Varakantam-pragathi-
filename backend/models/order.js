const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:        [{ menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, quantity: Number }],
  totalPrice:   { type: Number, required: true },
  orderDate:    { type: Date, default: Date.now },
  status:       { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
