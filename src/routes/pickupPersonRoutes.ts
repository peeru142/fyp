// src/routes/pickupPersonRoutes.ts

import express from 'express';
import {
  getAllPickupPersons,
  createPickupPerson,
  getPickupPersonById,
  updatePickupPerson,
  deletePickupPerson,
} from '../controllers/pickupPersonController';

const router = express.Router();

// GET /pickup-persons - Get all pickup persons
router.get('/', getAllPickupPersons);

// POST /pickup-persons - Create a new pickup person
router.post('/', createPickupPerson);

// GET /pickup-persons/:id - Get a pickup person by ID
router.get('/:id', getPickupPersonById);

// PUT /pickup-persons/:id - Update a pickup person by ID
router.put('/:id', updatePickupPerson);

// DELETE /pickup-persons/:id - Delete a pickup person by ID
router.delete('/:id', deletePickupPerson);

export default router;
