const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');

// Initialize app
const app = express();

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/desarrolloWeb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const goalsRouter = require('./routes/goals');
app.use('/api/goals', goalsRouter); // All goals routes are now under /api/goals

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

module.exports = app;