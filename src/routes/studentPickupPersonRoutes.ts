// src/routes/studentPickupPersonRoutes.ts

import express from 'express';
import {
  getAllStudentPickupPersons,
  createStudentPickupPerson,
  getStudentPickupPersonById,
  updateStudentPickupPerson,
  deleteStudentPickupPerson,
} from '../controllers/studentPickupPersonController';

const router = express.Router();

// GET /student-pickup-persons - Get all student-pickup person relationships
router.get('/', getAllStudentPickupPersons);

// POST /student-pickup-persons - Create a new student-pickup person relationship
router.post('/', createStudentPickupPerson);

// GET /student-pickup-persons/:id - Get a relationship by ID
router.get('/:id', getStudentPickupPersonById);

// PUT /student-pickup-persons/:id - Update a relationship by ID
router.put('/:id', updateStudentPickupPerson);

// DELETE /student-pickup-persons/:id - Delete a relationship by ID
router.delete('/:id', deleteStudentPickupPerson);

export default router;
