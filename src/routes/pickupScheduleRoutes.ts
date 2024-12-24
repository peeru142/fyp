// src/routes/pickupScheduleRoutes.ts

import express from 'express';
import {
  getAllPickupSchedules,
  createPickupSchedule,
  getPickupScheduleById,
  updatePickupSchedule,
  deletePickupSchedule,
} from '../controllers/pickupScheduleController';

const router = express.Router();

// GET /pickup-schedules - Get all pickup schedules
router.get('/', getAllPickupSchedules);

// POST /pickup-schedules - Create a new pickup schedule
router.post('/', createPickupSchedule);

// GET /pickup-schedules/:id - Get a pickup schedule by ID
router.get('/:id', getPickupScheduleById);

// PUT /pickup-schedules/:id - Update a pickup schedule by ID
router.put('/:id', updatePickupSchedule);

// DELETE /pickup-schedules/:id - Delete a pickup schedule by ID
router.delete('/:id', deletePickupSchedule);

export default router;
