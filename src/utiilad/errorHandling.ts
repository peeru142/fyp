import { Request, Response } from 'express';
import pickupPerson from '../models/pickupPerson';

// Error handler wrapper type
type ControllerFunction = (req: Request, res: Response) => Promise<void>;

// Error handler wrapper function
const errorHandler = (controller: ControllerFunction): ControllerFunction => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      await controller(req, res);
    } catch (error) {
      res.status(500).json({ 
        message: 'Internal server error', 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  };
};

// Refactored delete function
export const deletePickupPerson = errorHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedPickupPerson = await pickupPerson.findByIdAndDelete(req.params.id);
  
  if (!deletedPickupPerson) {
    res.status(404).json({ message: 'Pickup person not found' });
    return;
  }
  
  res.json({ message: 'Pickup person deleted successfully' });
});