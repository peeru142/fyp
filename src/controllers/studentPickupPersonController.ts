// src/controllers/StudentPickupPersonController.ts

import { Request, Response } from 'express';
import StudentPickupPerson, { IStudentPickupPerson } from '../models/studentPickupPerson';

// Get all student-pickup person relationships
export const getAllStudentPickupPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const relationships: IStudentPickupPerson[] = await StudentPickupPerson.find()
      .populate('student_id')
      .populate('pickup_person_id');
    res.json(relationships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student-pickup person relationships', error });
  }
};

// Create a new student-pickup person relationship
export const createStudentPickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { student_id, pickup_person_id } = req.body;
    const newRelationship: IStudentPickupPerson = new StudentPickupPerson({
      student_id,
      pickup_person_id,
    });
    const savedRelationship = await newRelationship.save();
    res.status(201).json(savedRelationship);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student-pickup person relationship', error });
  }
};

// Get a single student-pickup person relationship by ID
export const getStudentPickupPersonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const relationship: IStudentPickupPerson | null = await StudentPickupPerson.findById(req.params.id)
      .populate('student_id')
      .populate('pickup_person_id');
    if (relationship) {
      res.json(relationship);
    } else {
      res.status(404).json({ message: 'Student-Pickup Person relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching relationship', error });
  }
};

// Update a student-pickup person relationship by ID
export const updateStudentPickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRelationship: IStudentPickupPerson | null = await StudentPickupPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student_id')
     .populate('pickup_person_id');
    if (updatedRelationship) {
      res.json(updatedRelationship);
    } else {
      res.status(404).json({ message: 'Student-Pickup Person relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating relationship', error });
  }
};

// Delete a student-pickup person relationship by ID
export const deleteStudentPickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRelationship: IStudentPickupPerson | null = await StudentPickupPerson.findByIdAndDelete(req.params.id);
    if (deletedRelationship) {
      res.json({ message: 'Student-Pickup Person relationship deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student-Pickup Person relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting relationship', error });
  }
};
