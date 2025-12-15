require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/index');
const fs = require('fs');
const cors = require('cors');
const userRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes');



// Initialize Express App
const app = express();

// Connect to MongoDB
db.connectDB();

// Middleware
app.use(express.json());

// CORS
app.use(cors())

// Routes
app.use('/api/recipes', recipeRouter);
app.use('/api/users', userRouter);
app.get("/api/test", (req, res) => res.send("API is working"));
// JWT Authentication

// Default Route
if (process.env.NODE_ENV === 'development') {
  app.get('/api', (req, res) => res.json({ message: 'API running' }));
}

// React Frontend
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'frontend', 'build');
  app.use(express.static(buildPath));
  app.get('*', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));