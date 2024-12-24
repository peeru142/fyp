// src/routes/exceptionPickupRoutes.ts

import express from 'express';
import {
  getAllExceptionPickups,
  createExceptionPickup,
  getExceptionPickupById,
  updateExceptionPickup,
  deleteExceptionPickup,
} from '../controllers/exceptionPickupController';

const router = express.Router();

// GET /exception-pickups - Get all exception pickups
router.get('/', getAllExceptionPickups);

// POST /exception-pickups - Create a new exception pickup
router.post('/', createExceptionPickup);

// GET /exception-pickups/:id - Get an exception pickup by ID
router.get('/:id', getExceptionPickupById);

// PUT /exception-pickups/:id - Update an exception pickup by ID
router.put('/:id', updateExceptionPickup);

// DELETE /exception-pickups/:id - Delete an exception pickup by ID
router.delete('/:id', deleteExceptionPickup);

export default router;
