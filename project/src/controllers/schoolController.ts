// src/controllers/SchoolController.ts

import { Request, Response } from 'express';
import School, { ISchool } from '../models/school';

// Get all schools
export const getAllSchools = async (req: Request, res: Response): Promise<void> => {
  try {
    const schools: ISchool[] = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
};

// Create a new school
export const createSchool = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, phone_number, email } = req.body;
    const newSchool: ISchool = new School({ name, address, phone_number, email });
    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

// Get a single school by ID
export const getSchoolById = async (req: Request, res: Response): Promise<void> => {
  try {
    const school: ISchool | null = await School.findById(req.params.id);
    if (school) {
      res.json(school);
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching school', error });
  }
};

// Update a school by ID
export const updateSchool = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSchool: ISchool | null = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedSchool) {
      res.json(updatedSchool);
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error });
  }
};

// Delete a school by ID
export const deleteSchool = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSchool: ISchool | null = await School.findByIdAndDelete(req.params.id);
    if (deletedSchool) {
      res.json({ message: 'School deleted successfully' });
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error });
  }
};
