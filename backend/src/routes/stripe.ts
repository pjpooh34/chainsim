import express, { Request, Response } from 'express';
import { stripe, STRIPE_CONFIG, getPlanByPriceId } from '../config/stripe';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Create Stripe customer
// @route   POST /api/stripe/create-customer
// @access  Private
router.post('/create-customer', protect, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      res.status(503).json({ success: false, message: 'Stripe not configured' });
      return;
    }
    const { email, name } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId: (req as any).user.id,
      },
    });

    res.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
    });
  }
});

// @desc    Create checkout session
// @route   POST /api/stripe/create-checkout-session
// @access  Private
router.post('/create-checkout-session', protect, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      res.status(503).json({ success: false, message: 'Stripe not configured' });
      return;
    }
    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId) {
      res.status(400).json({
        success: false,
        message: 'Price ID is required',
      });
      return;
    }

    // Verify the price ID exists in our configuration
    const planInfo = getPlanByPriceId(priceId);
    if (!planInfo) {
      res.status(400).json({
        success: false,
        message: 'Invalid price ID',
      });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/pricing?canceled=true`,
      metadata: {
        userId: (req as any).user.id,
        plan: planInfo.key,
      },
      customer_email: (req as any).user.email,
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
    });
  }
});

// @desc    Create billing portal session
// @route   POST /api/stripe/create-portal-session
// @access  Private
router.post('/create-portal-session', protect, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      res.status(503).json({ success: false, message: 'Stripe not configured' });
      return;
    }
    const { customerId, returnUrl } = req.body;

    if (!customerId) {
      res.status(400).json({
        success: false,
        message: 'Customer ID is required',
      });
      return;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.FRONTEND_URL}/dashboard`,
    });

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error('Create portal session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create portal session',
    });
  }
});

// @desc    Get subscription details
// @route   GET /api/stripe/subscription/:subscriptionId
// @access  Private
router.get('/subscription/:subscriptionId', protect, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      res.status(503).json({ success: false, message: 'Stripe not configured' });
      return;
    }
    const { subscriptionId } = req.params;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    res.json({
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodStart: (subscription as any).current_period_start,
        currentPeriodEnd: (subscription as any).current_period_end,
        cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
        plan: subscription.items.data[0]?.price?.id,
      },
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get subscription',
    });
  }
});

// @desc    Cancel subscription
// @route   POST /api/stripe/cancel-subscription
// @access  Private
router.post('/cancel-subscription', protect, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      res.status(503).json({ success: false, message: 'Stripe not configured' });
      return;
    }
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      res.status(400).json({
        success: false,
        message: 'Subscription ID is required',
      });
      return;
    }

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.json({
      success: true,
      message: 'Subscription will be canceled at the end of the current period',
      subscription: {
        id: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel subscription',
    });
  }
});

// @desc    Stripe webhook handler
// @route   POST /api/stripe/webhook
// @access  Public (but verified with webhook secret)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: any;

  try {
    if (!stripe) {
      res.status(503).send('Stripe not configured');
      return;
    }
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_CONFIG.webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).send('Webhook signature verification failed');
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        // Handle successful checkout
        // Update user subscription in database
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created:', subscription.id);
        // Handle new subscription
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log('Subscription updated:', updatedSubscription.id);
        // Handle subscription updates
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log('Subscription deleted:', deletedSubscription.id);
        // Handle subscription cancellation
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Payment succeeded:', invoice.id);
        // Handle successful payment
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Payment failed:', failedInvoice.id);
        // Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// @desc    Get pricing plans
// @route   GET /api/stripe/plans
// @access  Public
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const plans = Object.entries(STRIPE_CONFIG.plans).map(([key, plan]) => ({
      id: key,
      name: plan.name,
      price: plan.price,
      priceId: 'priceId' in plan ? plan.priceId : null,
      features: plan.features,
      limits: plan.limits,
    }));

    res.json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get plans',
    });
  }
});

export default router;
