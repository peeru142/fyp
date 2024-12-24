// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallbackSecret';

// POST /signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username is already taken.' });
    }

    // 3. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create the user
    const newUser = new User<IUser>({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 5. Optionally generate token immediately after signup
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Signup successful',
      user: { username: newUser.username, email: newUser.email },
      token,
    });
  } catch (error: any) {
    console.error('Error in signup:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// POST /login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // 2. Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // 4. Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Login successful',
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (error: any) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
