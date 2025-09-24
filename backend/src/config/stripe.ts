import Stripe from 'stripe';

// Initialize Stripe only if a secret key is provided
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
export const stripe = STRIPE_SECRET
  ? new Stripe(STRIPE_SECRET, {
      typescript: true,
    })
  : null;

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  priceIds: {
    pro: process.env.STRIPE_PRICE_ID_PRO || '',
    enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
  },
  // Subscription plans configuration
  plans: {
    free: {
      name: 'Free',
      price: 0,
      features: [
        'Basic portfolio analysis',
        'Limited simulations',
        'Community support',
      ],
      limits: {
        simulations: 5,
        projects: 2,
        apiCalls: 100,
      },
    },
    pro: {
      name: 'Pro',
      price: 99,
      priceId: process.env.STRIPE_PRICE_ID_PRO || '',
      features: [
        'Advanced portfolio analysis',
        'Unlimited simulations',
        'Priority support',
        'API access',
        'Custom reports',
      ],
      limits: {
        simulations: -1, // unlimited
        projects: 10,
        apiCalls: 1000,
      },
    },
    enterprise: {
      name: 'Enterprise',
      price: 299,
      priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
      features: [
        'Everything in Pro',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
      ],
      limits: {
        simulations: -1, // unlimited
        projects: -1, // unlimited
        apiCalls: -1, // unlimited
      },
    },
  },
};

// Helper function to get plan by price ID
export const getPlanByPriceId = (priceId: string) => {
  for (const [key, plan] of Object.entries(STRIPE_CONFIG.plans)) {
    if ('priceId' in plan && plan.priceId === priceId) {
      return { key, plan };
    }
  }
  return null;
};

// Helper function to get plan by name
export const getPlanByName = (planName: string) => {
  return STRIPE_CONFIG.plans[planName as keyof typeof STRIPE_CONFIG.plans];
};
