// src/routes/studentRoutes.ts

import express from 'express';
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';

const router = express.Router();

// GET /students - Get all students
router.get('/', getAllStudents);

// POST /students - Create a new student
router.post('/', createStudent);

// GET /students/:id - Get a student by ID
router.get('/:id', getStudentById);

// PUT /students/:id - Update a student by ID
router.put('/:id', updateStudent);

// DELETE /students/:id - Delete a student by ID
router.delete('/:id', deleteStudent);

export default router;
