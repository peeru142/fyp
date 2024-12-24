// src/controllers/PickupPersonController.ts

import { Request, Response } from 'express';
import PickupPerson, { IPickupPerson } from '../models/pickupPerson';

// Get all pickup persons
export const getAllPickupPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const pickupPersons: IPickupPerson[] = await PickupPerson.find().populate('vehicle_id');
    res.json(pickupPersons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickup persons', error });
  }
};

// Create a new pickup person
export const createPickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone_number, vehicle_id, email, location_access } = req.body;
    const newPickupPerson: IPickupPerson = new PickupPerson({
      name,
      phone_number,
      vehicle_id,
      email,
      location_access,
    });
    const savedPickupPerson = await newPickupPerson.save();
    res.status(201).json(savedPickupPerson);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pickup person', error });
  }
};

// Get a single pickup person by ID
export const getPickupPersonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pickupPerson: IPickupPerson | null = await PickupPerson.findById(req.params.id).populate('vehicle_id');
    if (pickupPerson) {
      res.json(pickupPerson);
    } else {
      res.status(404).json({ message: 'Pickup person not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickup person', error });
  }
};

// Update a pickup person by ID
export const updatePickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPickupPerson: IPickupPerson | null = await PickupPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vehicle_id');
    if (updatedPickupPerson) {
      res.json(updatedPickupPerson);
    } else {
      res.status(404).json({ message: 'Pickup person not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating pickup person', error });
  }
};

// Delete a pickup person by ID
export const deletePickupPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPickupPerson: IPickupPerson | null = await PickupPerson.findByIdAndDelete(req.params.id);
    if (deletedPickupPerson) {
      res.json({ message: 'Pickup person deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pickup person not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pickup person', error });
  }
};
