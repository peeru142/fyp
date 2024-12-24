// src/controllers/ExceptionPickupController.ts

import { Request, Response } from 'express';
import ExceptionPickup, { IExceptionPickup } from '../models/exceptionpickup';

// Get all exception pickups
export const getAllExceptionPickups = async (req: Request, res: Response): Promise<void> => {
  try {
    const exceptionPickups: IExceptionPickup[] = await ExceptionPickup.find()
      .populate('student_id')
      .populate('pickup_person_id');
    res.json(exceptionPickups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exception pickups', error });
  }
};

// Create a new exception pickup
export const createExceptionPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pickup_person_id, student_id, scheduled_pickup_time } = req.body;
    const newExceptionPickup: IExceptionPickup = new ExceptionPickup({
      pickup_person_id,
      student_id,
      scheduled_pickup_time,
    });
    const savedExceptionPickup = await newExceptionPickup.save();
    res.status(201).json(savedExceptionPickup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating exception pickup', error });
  }
};

// Get a single exception pickup by ID
export const getExceptionPickupById = async (req: Request, res: Response): Promise<void> => {
  try {
    const exceptionPickup: IExceptionPickup | null = await ExceptionPickup.findById(req.params.id)
      .populate('student_id')
      .populate('pickup_person_id');
    if (exceptionPickup) {
      res.json(exceptionPickup);
    } else {
      res.status(404).json({ message: 'Exception pickup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exception pickup', error });
  }
};

// Update an exception pickup by ID
export const updateExceptionPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedExceptionPickup: IExceptionPickup | null = await ExceptionPickup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student_id')
     .populate('pickup_person_id');
    if (updatedExceptionPickup) {
      res.json(updatedExceptionPickup);
    } else {
      res.status(404).json({ message: 'Exception pickup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating exception pickup', error });
  }
};

// Delete an exception pickup by ID
export const deleteExceptionPickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExceptionPickup: IExceptionPickup | null = await ExceptionPickup.findByIdAndDelete(req.params.id);
    if (deletedExceptionPickup) {
      res.json({ message: 'Exception pickup deleted successfully' });
    } else {
      res.status(404).json({ message: 'Exception pickup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exception pickup', error });
  }
};
