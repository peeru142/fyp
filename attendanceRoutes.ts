// src/routes/attendanceRoutes.ts

import express from 'express';
import {
  getAllAttendances,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController';

const router = express.Router();

// GET /attendances - Get all attendance records
router.get('/', getAllAttendances);

// POST /attendances - Create a new attendance record
router.post('/', createAttendance);

// GET /attendances/:id - Get an attendance record by ID
router.get('/:id', getAttendanceById);

// PUT /attendances/:id - Update an attendance record by ID
router.put('/:id', updateAttendance);

// DELETE /attendances/:id - Delete an attendance record by ID
router.delete('/:id', deleteAttendance);

export default router;
