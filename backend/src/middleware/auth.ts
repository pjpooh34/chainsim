import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ success: false, message: 'Database not connected' });
        return;
      }
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as any;

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        return;
      }

      // Optional: check tokenVersion if present
      if (typeof decoded.tokenVersion === 'number' && decoded.tokenVersion !== req.user.tokenVersion) {
        res.status(401).json({ success: false, message: 'Not authorized, token revoked' });
        return;
      }

      next();
      return;
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
      return;
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no user',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
      return;
    }

    next();
  };
};
