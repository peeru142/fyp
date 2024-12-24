// src/index.ts

import express, { Application, Request, Response } from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

// Import Routes
import vehicleRoutes from './routes/vehicleRoutes';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import pickupPersonRoutes from './routes/pickupPersonRoutes';
import pickupScheduleRoutes from './routes/pickupScheduleRoutes';
import exceptionPickupRoutes from './routes/exceptionPickupRoutes';
import schoolRoutes from './routes/schoolRoutes';
import studentPickupPersonRoutes from './routes/studentPickupPersonRoutes';

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectDB();


app.use('/vehicles', vehicleRoutes);
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/attendances', attendanceRoutes);
app.use('/pickup-persons', pickupPersonRoutes);
app.use('/pickup-schedules', pickupScheduleRoutes);
app.use('/exception-pickups', exceptionPickupRoutes);
app.use('/schools', schoolRoutes);
app.use('/student-pickup-persons', studentPickupPersonRoutes);



// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the School Management API!');
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// Auth routes
app.use('/auth', authRoutes);
// Example: POST /auth/signup, POST /auth/login

// Other existing routes, e.g.:
app.use('/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
