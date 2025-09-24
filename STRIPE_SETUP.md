# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for the ChainSim platform.

## Prerequisites

1. A Stripe account (create one at [stripe.com](https://stripe.com))
2. Access to your Stripe Dashboard

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** > **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

## Step 2: Create Products and Prices

1. In your Stripe Dashboard, go to **Products**
2. Create a new product for each subscription plan:

### Pro Plan
- **Name**: ChainSim Pro
- **Description**: Advanced portfolio analysis and unlimited simulations
- **Price**: $99/month
- **Billing**: Recurring monthly

### Enterprise Plan
- **Name**: ChainSim Enterprise
- **Description**: Full-featured solution with white-label options
- **Price**: $299/month
- **Billing**: Recurring monthly

3. After creating each product, copy the **Price ID** (starts with `price_`)

## Step 3: Set Up Webhooks

1. In your Stripe Dashboard, go to **Developers** > **Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL to: `https://yourdomain.com/api/stripe/webhook`
4. Select these events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

## Step 4: Configure Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRICE_ID_PRO=price_your_pro_plan_price_id
STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_plan_price_id
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Step 5: Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to the pricing page and test the payment flow

## Step 6: Test Cards

Use these test card numbers for testing:

- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## API Endpoints

The following Stripe-related endpoints are available:

### Authentication Required
- `POST /api/stripe/create-customer` - Create a Stripe customer
- `POST /api/stripe/create-checkout-session` - Create a checkout session
- `POST /api/stripe/create-portal-session` - Create billing portal session
- `GET /api/stripe/subscription/:id` - Get subscription details
- `POST /api/stripe/cancel-subscription` - Cancel subscription

### Public
- `GET /api/stripe/plans` - Get available subscription plans
- `POST /api/stripe/webhook` - Stripe webhook handler

## Frontend Components

The following React components are available:

- `PricingPlans` - Display subscription plans with payment options
- `StripePayment` - Handle Stripe payment processing
- `BillingManagement` - Manage existing subscriptions

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always verify webhook signatures** to ensure requests are from Stripe
3. **Use HTTPS** in production
4. **Validate all webhook events** before processing
5. **Store sensitive data securely** in your database

## Production Deployment

1. Switch to **Live mode** in your Stripe Dashboard
2. Update environment variables with live keys
3. Update webhook endpoints to use your production domain
4. Test thoroughly with real payment methods

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For ChainSim platform issues:
- Check the application logs
- Verify environment variables are set correctly
- Ensure all required dependencies are installed




