// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
};

export default errorHandler;

