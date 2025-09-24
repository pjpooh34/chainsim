import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get user subscription
// @route   GET /api/user/subscription
// @access  Private
router.get('/subscription', protect, async (req: Request, res: Response) => {
  try {
    // Mock subscription data
    const subscription = {
      plan: 'pro',
      status: 'active',
      apiCallsUsed: 1250,
      apiCallsLimit: 10000,
      reportsUsed: 8,
      reportsLimit: 50,
      nextBillingDate: '2024-10-10T00:00:00Z',
      features: [
        'Unlimited simulations',
        'Advanced analytics',
        'Priority support',
        'Custom integrations'
      ]
    };

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update user subscription
// @route   PUT /api/user/subscription
// @access  Private
router.put('/subscription', protect, async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;

    if (!['free', 'pro', 'team', 'scale', 'enterprise'].includes(plan)) {
      res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
      return;
    }

    // Mock subscription update
    const subscription = {
      plan,
      status: 'active',
      apiCallsUsed: 0,
      apiCallsLimit: plan === 'free' ? 100 : plan === 'pro' ? 10000 : 100000,
      reportsUsed: 0,
      reportsLimit: plan === 'free' ? 3 : plan === 'pro' ? 50 : 500,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user usage
// @route   GET /api/user/usage
// @access  Private
router.get('/usage', protect, async (req: Request, res: Response) => {
  try {
    // Mock usage data
    const usage = {
      currentPeriod: {
        startDate: '2024-09-01T00:00:00Z',
        endDate: '2024-09-30T23:59:59Z',
        apiCalls: 1250,
        simulations: 45,
        reports: 8,
        storage: '2.5GB'
      },
      dailyUsage: [
        { date: '2024-09-01', apiCalls: 45, simulations: 2, reports: 1 },
        { date: '2024-09-02', apiCalls: 52, simulations: 3, reports: 0 },
        { date: '2024-09-03', apiCalls: 38, simulations: 1, reports: 2 }
      ],
      limits: {
        apiCalls: 10000,
        simulations: -1, // unlimited
        reports: 50,
        storage: '10GB'
      }
    };

    res.json({
      success: true,
      data: usage
    });
  } catch (error) {
    console.error('Get usage error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
