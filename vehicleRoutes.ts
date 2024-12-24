// src/routes/vehicleRoutes.ts

import express from 'express';
import {
  getAllVehicles,
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';

const router = express.Router();

// GET /vehicles - Get all vehicles
router.get('/', getAllVehicles);

// POST /vehicles - Create a new vehicle
router.post('/', createVehicle);

// GET /vehicles/:id - Get a vehicle by ID
router.get('/:id', getVehicleById);

// PUT /vehicles/:id - Update a vehicle by ID
router.put('/:id', updateVehicle);

// DELETE /vehicles/:id - Delete a vehicle by ID
router.delete('/:id', deleteVehicle);

export default router;
