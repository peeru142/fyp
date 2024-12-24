// src/routes/schoolRoutes.ts

import express from 'express';
import {
  getAllSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from '../controllers/schoolController';

const router = express.Router();

// GET /schools - Get all schools
router.get('/', getAllSchools);

// POST /schools - Create a new school
router.post('/', createSchool);

// GET /schools/:id - Get a school by ID
router.get('/:id', getSchoolById);

// PUT /schools/:id - Update a school by ID
router.put('/:id', updateSchool);

// DELETE /schools/:id - Delete a school by ID
router.delete('/:id', deleteSchool);

export default router;
