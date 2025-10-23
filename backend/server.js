import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins in production
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json({
  limit: '10mb' // Increase payload size limit
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Root route for API health check
app.get('/api', (req, res) => {
  res.json({ message: 'Watchlist API is running' });
});

// Catch-all route for API
app.all('/api/*', (req, res) => {
  console.log(`404 for ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: 'API endpoint not found',
    requestedUrl: req.url,
    method: req.method 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
