// src/controllers/PickupScheduleController.ts

import { Request, Response } from 'express';
import PickupSchedule, { IPickupSchedule } from '../models/pickupschedule';

// Get all pickup schedules
export const getAllPickupSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const pickupSchedules: IPickupSchedule[] = await PickupSchedule.find()
      .populate('student_id');
    res.json(pickupSchedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickup schedules', error });
  }
};

// Create a new pickup schedule
export const createPickupSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { student_id, scheduled_pickup_time, actual_pickup_time, half_day, full_day } = req.body;
    const newPickupSchedule: IPickupSchedule = new PickupSchedule({
      student_id,
      scheduled_pickup_time,
      actual_pickup_time,
      half_day,
      full_day,
    });
    const savedPickupSchedule = await newPickupSchedule.save();
    res.status(201).json(savedPickupSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pickup schedule', error });
  }
};

// Get a single pickup schedule by ID
export const getPickupScheduleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pickupSchedule: IPickupSchedule | null = await PickupSchedule.findById(req.params.id)
      .populate('student_id');
    if (pickupSchedule) {
      res.json(pickupSchedule);
    } else {
      res.status(404).json({ message: 'Pickup schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickup schedule', error });
  }
};

// Update a pickup schedule by ID
export const updatePickupSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPickupSchedule: IPickupSchedule | null = await PickupSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student_id');
    if (updatedPickupSchedule) {
      res.json(updatedPickupSchedule);
    } else {
      res.status(404).json({ message: 'Pickup schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating pickup schedule', error });
  }
};

// Delete a pickup schedule by ID
export const deletePickupSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPickupSchedule: IPickupSchedule | null = await PickupSchedule.findByIdAndDelete(req.params.id);
    if (deletedPickupSchedule) {
      res.json({ message: 'Pickup schedule deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pickup schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pickup schedule', error });
  }
};
