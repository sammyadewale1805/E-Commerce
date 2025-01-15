require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // For login/register
const SocialAuth = require('./routes/SocialAuth'); // For social authentication
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoute")


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // General authentication
app.use('/api/social-auth', SocialAuth); // Social authentication
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});