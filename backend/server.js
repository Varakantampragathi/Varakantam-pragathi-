const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes= require('./routes/order');
const keys       = require('./config/keys');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
