import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { IUser, User } from '../models/User';
import { protect, AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';
import crypto from 'crypto';

const router = express.Router();

const JWT_SECRET = (process.env.JWT_SECRET || 'default-secret') as Secret;
const TOKEN_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];
const REFRESH_SECRET = (process.env.REFRESH_TOKEN_SECRET || 'default-refresh') as Secret;
const REFRESH_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRES_IN || '30d') as SignOptions['expiresIn'];

const signAccessToken = (user: Pick<IUser, '_id' | 'role' | 'tokenVersion'>) =>
  jwt.sign({ id: (user as any)._id, role: user.role, tokenVersion: user.tokenVersion }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

const signRefreshToken = (user: Pick<IUser, '_id' | 'tokenVersion'>) =>
  jwt.sign({ id: (user as any)._id, tokenVersion: user.tokenVersion }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post(
  '/register',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ success: false, message: 'Database not connected' });
        return;
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { name, email, password, company, industry, useCase } = req.body;

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        res.status(409).json({ success: false, message: 'Email already in use' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashed,
        profile: { company, industry, useCase },
      } as Partial<IUser>);

      const safeUser = await User.findById(user._id).select('-password');
      const accessToken = signAccessToken(user as any);
      const refreshToken = signRefreshToken(user as any);

      res.status(201).json({ success: true, token: accessToken, refreshToken, user: safeUser });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: 'Server error during registration' });
    }
  }
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ success: false, message: 'Database not connected' });
        return;
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }

      user.lastLogin = new Date();
      await user.save();

      const userId = (user as any)._id.toString();
      const accessToken = signAccessToken(user as any);
      const refreshToken = signRefreshToken(user as any);
      const safeUser = await User.findById(user._id).select('-password');

      res.json({ success: true, token: accessToken, refreshToken, user: safeUser });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error during login' });
    }
  }
);

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ success: false, message: 'Refresh token required' });
      return;
    }
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid refresh token' });
      return;
    }
    if (typeof decoded.tokenVersion === 'number' && decoded.tokenVersion !== user.tokenVersion) {
      res.status(401).json({ success: false, message: 'Refresh token revoked' });
      return;
    }
    const accessToken = signAccessToken(user as any);
    const newRefreshToken = signRefreshToken(user as any);
    res.json({ success: true, token: accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
});

// @desc    Logout (revoke tokens)
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, async (req: AuthRequest, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.user!._id, { $inc: { tokenVersion: 1 } });
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Server error during logout' });
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', [body('email').isEmail()], async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.json({ success: true, message: 'If your email exists, you will receive reset instructions' });
      return;
    }
    const token = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    user.passwordResetToken = hashed as any;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    const response: any = { success: true, message: 'Reset token generated' };
    if ((process.env.NODE_ENV || 'development') !== 'production') response.token = token;
    res.json(response);
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Server error during forgot password' });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
router.post(
  '/reset-password',
  [body('token').notEmpty(), body('password').isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }
      const { token, password } = req.body;
      const hashed = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findOne({
        passwordResetToken: hashed,
        passwordResetExpires: { $gt: new Date() },
      }).select('+password');
      if (!user) {
        res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.passwordResetToken = undefined as any;
      user.passwordResetExpires = undefined;
      user.tokenVersion += 1; // revoke existing tokens
      await user.save();
      res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ success: false, message: 'Server error during password reset' });
    }
  }
);

export default router;
