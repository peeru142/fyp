import {Request, Response} from 'express';
const express = require('express');
const mongoose = require('mongoose');
const app = express();


// Middleware for parsing JSON data
app.use(express.json());

// Set up the MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mydatabase';  // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
 // .catch((err) => console.log('Error connecting to MongoDB:', err));

// Sample route to test the API
app.get('/', (req:Request , res: Response) => {
  res.send('Hello, MongoDB is connected!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
