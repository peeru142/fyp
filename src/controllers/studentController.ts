// src/controllers/studentController.ts

import { Request, Response } from 'express';
import Student, { IStudent } from '../models/student';

// Get all students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students: IStudent[] = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Create a new student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, grade, section } = req.body;
    const newStudent: IStudent = new Student({ name, grade, section });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

// Get a single student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student: IStudent | null = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedStudent: IStudent | null = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStudent: IStudent | null = await Student.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};
