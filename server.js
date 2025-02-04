require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const setupSwaggerDocs = require('./config/swaggerConfig');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const socialAuthRoutes = require('./routes/SocialAuth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const paystackCallbackRoutes = require('./routes/paystackCallbackRoutes');
const resetPasswordRoutes = require('./routes/resetPasswordRoute');
const uploadRoutes = require('./routes/uploadRoutes');
const videoRoutes = require('./routes/videoRoutes'); // Import video routes
const ussdRoutes = require('./routes/ussdRoute')

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'application/json' })); // Parse raw JSON (for webhooks)

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/social-auth', socialAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', express.raw({ type: 'application/json' }), paystackCallbackRoutes);
app.use('/api/reset-password', resetPasswordRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/videos', videoRoutes); // Video streaming route
app.use('/api/ussd', ussdRoutes);  // Use the USSD routes

// Swagger Docs
setupSwaggerDocs(app);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
