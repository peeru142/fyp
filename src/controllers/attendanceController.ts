// src/controllers/AttendanceController.ts

import { Request, Response } from 'express';
import Attendance, { IAttendance } from '../models/attendance';

// Get all attendance records
export const getAllAttendances = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendances: IAttendance[] = await Attendance.find().populate('student_id');
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};

// Create a new attendance record
export const createAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, student_id, status } = req.body;
    const newAttendance: IAttendance = new Attendance({ date, student_id, status });
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance record', error });
  }
};

// Get a single attendance record by ID
export const getAttendanceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendance: IAttendance | null = await Attendance.findById(req.params.id).populate('student_id');
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance record', error });
  }
};

// Update an attendance record by ID
export const updateAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAttendance: IAttendance | null = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student_id');
    if (updatedAttendance) {
      res.json(updatedAttendance);
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance record', error });
  }
};

// Delete an attendance record by ID
export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedAttendance: IAttendance | null = await Attendance.findByIdAndDelete(req.params.id);
    if (deletedAttendance) {
      res.json({ message: 'Attendance record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance record', error });
  }
};
