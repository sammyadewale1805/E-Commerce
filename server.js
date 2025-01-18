require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // For login/register
const socialAuthRoutes = require('./routes/SocialAuth'); // For social authentication
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoute");
const paymentRoutes = require('./routes/paymentRoutes');
const paystackCallbackRoutes = require("./routes/paystackCallbackRoutes");
const setupSwaggerDocs = require('./config/swaggerConfig');



const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON payloads
app.use(express.raw({ type: 'application/json' })); // Parse raw JSON (for webhooks)

// Health Check Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/social-auth', socialAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', express.raw({ type: 'application/json' }), paystackCallbackRoutes);
setupSwaggerDocs(app);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
