import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get sandbox projects
// @route   GET /api/sandbox/projects
// @access  Private
router.get('/projects', protect, async (req: AuthRequest, res: Response) => {
  try {
    // Mock sandbox projects
    const projects = [
      {
        id: '1',
        name: 'DeFi Yield Farming Strategy',
        description: 'Testing yield farming strategies on various protocols',
        status: 'active',
        simulations: 15,
        lastRun: '2024-09-10T14:30:00Z',
        riskScore: 0.25,
        complianceStatus: 'compliant'
      },
      {
        id: '2',
        name: 'Arbitrage Bot Testing',
        description: 'Cross-exchange arbitrage opportunity testing',
        status: 'completed',
        simulations: 8,
        lastRun: '2024-09-09T16:45:00Z',
        riskScore: 0.15,
        complianceStatus: 'compliant'
      }
    ];

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get sandbox projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create sandbox project
// @route   POST /api/sandbox/projects
// @access  Private
router.post('/projects', protect, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Project name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description too long'),
], async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, strategy } = req.body;

    // Mock project creation
    const project = {
      id: Date.now().toString(),
      name,
      description,
      strategy: strategy || 'custom',
      status: 'active',
      simulations: 0,
      createdAt: new Date().toISOString(),
      userId: req.user?._id
    };

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Create sandbox project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get project details
// @route   GET /api/sandbox/projects/:id
// @access  Private
router.get('/projects/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Mock project details
    const project = {
      id,
      name: 'DeFi Yield Farming Strategy',
      description: 'Testing yield farming strategies on various protocols',
      status: 'active',
      strategy: {
        type: 'yield_farming',
        protocols: ['Uniswap', 'Compound', 'Aave'],
        riskTolerance: 'medium'
      },
      simulations: 15,
      lastRun: '2024-09-10T14:30:00Z',
      riskScore: 0.25,
      complianceStatus: 'compliant',
      performance: {
        totalReturn: 12.5,
        sharpeRatio: 1.8,
        maxDrawdown: -5.2
      }
    };

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Run simulation
// @route   POST /api/sandbox/simulations
// @access  Private
router.post('/simulations', protect, [
  body('projectId').notEmpty().withMessage('Project ID is required'),
  body('parameters').isObject().withMessage('Parameters must be an object'),
], async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, parameters } = req.body;

    // Mock simulation
    const simulation = {
      id: Date.now().toString(),
      projectId,
      parameters,
      status: 'completed',
      results: {
        totalReturn: 8.5,
        volatility: 12.3,
        sharpeRatio: 1.2,
        maxDrawdown: -3.8,
        winRate: 0.68
      },
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      userId: req.user?._id
    };

    res.status(201).json({
      success: true,
      data: simulation
    });
  } catch (error) {
    console.error('Run simulation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;