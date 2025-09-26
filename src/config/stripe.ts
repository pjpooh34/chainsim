import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here'
);

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
};

// Subscription plans (matching backend configuration)
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
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
    cta: 'Get Started',
    popular: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 99,
    interval: 'month',
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
    cta: 'Start Pro Trial',
    popular: true,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
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
    cta: 'Contact Sales',
    popular: false,
  },
};

// Helper functions
export const getPlanById = (planId: string) => {
  return SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};




