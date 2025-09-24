import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get portfolio templates
// @route   GET /api/portfolio/templates
// @access  Private
router.get('/templates', protect, async (req: AuthRequest, res: Response) => {
  try {
    // Mock portfolio templates
    const templates = [
      {
        id: '1',
        name: 'Conservative Portfolio',
        description: 'Low-risk portfolio with stable returns',
        riskLevel: 'Low',
        expectedReturn: 5.2,
        assets: [
          { symbol: 'BTC', allocation: 30, name: 'Bitcoin' },
          { symbol: 'ETH', allocation: 25, name: 'Ethereum' },
          { symbol: 'USDC', allocation: 45, name: 'USD Coin' }
        ]
      },
      {
        id: '2',
        name: 'Balanced Portfolio',
        description: 'Moderate risk with balanced growth',
        riskLevel: 'Medium',
        expectedReturn: 8.5,
        assets: [
          { symbol: 'BTC', allocation: 40, name: 'Bitcoin' },
          { symbol: 'ETH', allocation: 35, name: 'Ethereum' },
          { symbol: 'ADA', allocation: 15, name: 'Cardano' },
          { symbol: 'USDC', allocation: 10, name: 'USD Coin' }
        ]
      },
      {
        id: '3',
        name: 'Aggressive Portfolio',
        description: 'High-risk, high-reward portfolio',
        riskLevel: 'High',
        expectedReturn: 15.8,
        assets: [
          { symbol: 'BTC', allocation: 50, name: 'Bitcoin' },
          { symbol: 'ETH', allocation: 30, name: 'Ethereum' },
          { symbol: 'SOL', allocation: 20, name: 'Solana' }
        ]
      }
    ];

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Portfolio templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create portfolio
// @route   POST /api/portfolio
// @access  Private
router.post('/', protect, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Portfolio name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description too long'),
  body('riskLevel').isIn(['Low', 'Medium', 'High']).withMessage('Invalid risk level'),
], async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, riskLevel, assets } = req.body;

    // Mock portfolio creation
    const portfolio = {
      id: Date.now().toString(),
      name,
      description,
      riskLevel,
      assets: assets || [],
      createdAt: new Date().toISOString(),
      userId: req.user?._id
    };

    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user portfolios
// @route   GET /api/portfolio
// @access  Private
router.get('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    // Mock user portfolios
    const portfolios = [
      {
        id: '1',
        name: 'My Trading Portfolio',
        description: 'Active trading portfolio',
        riskLevel: 'Medium',
        assets: [
          { symbol: 'BTC', allocation: 40, name: 'Bitcoin', value: 25000 },
          { symbol: 'ETH', allocation: 35, name: 'Ethereum', value: 18000 },
          { symbol: 'ADA', allocation: 25, name: 'Cardano', value: 5000 }
        ],
        totalValue: 48000,
        performance: 12.5,
        createdAt: '2024-08-15T10:30:00Z'
      }
    ];

    res.json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;