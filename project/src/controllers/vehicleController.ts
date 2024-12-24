// src/controllers/VehicleController.ts

import { Request, Response } from 'express';
import Vehicle, { IVehicle } from '../models/vehicle';

// Get all vehicles
export const getAllVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles: IVehicle[] = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, num_plate, color } = req.body;
    const newVehicle: IVehicle = new Vehicle({ name, num_plate, color });
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle: IVehicle | null = await Vehicle.findById(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error });
  }
};

// Update a vehicle by ID
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedVehicle: IVehicle | null = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedVehicle) {
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};

// Delete a vehicle by ID
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedVehicle: IVehicle | null = await Vehicle.findByIdAndDelete(req.params.id);
    if (deletedVehicle) {
      res.json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};
