import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { SUBSCRIPTION_PLANS, formatPrice, getPlanById } from '../config/stripe';
import StripePayment from './StripePayment';

interface PricingPlansProps {
  currentPlan?: string;
  onPlanChange?: (planId: string) => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ currentPlan = 'free', onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPaymentError(null);
    setPaymentSuccess(null);
  };

  const handlePaymentSuccess = (sessionId: string) => {
    setPaymentSuccess('Payment successful! Redirecting...');
    onPlanChange?.(selectedPlan || '');
    // Redirect to dashboard or show success message
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const isCurrentPlan = (planId: string) => currentPlan === planId;
  const isSelected = (planId: string) => selectedPlan === planId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Select the perfect plan for your tokenized securities needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => (
          <div
            key={planId}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
              plan.popular
                ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                : 'border-gray-200'
            } ${isSelected(planId) ? 'ring-2 ring-blue-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(plan.price)}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-600">/{plan.interval}</span>
                )}
              </div>
              <p className="text-gray-600">
                {plan.price === 0 ? 'Perfect for getting started' : 'Advanced features for professionals'}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {isCurrentPlan(planId) ? (
                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50">
                    Current Plan
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handlePlanSelect(planId)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              )}
            </div>

            {/* Payment Form */}
            {isSelected(planId) && plan.price > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <StripePayment
                  amount={plan.price}
                  planId={planId}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            )}

            {/* Error Message */}
            {paymentError && isSelected(planId) && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {paymentError}
              </div>
            )}

            {/* Success Message */}
            {paymentSuccess && isSelected(planId) && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                {paymentSuccess}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          All plans include 24/7 support and regular updates.{' '}
          <a href="/contact" className="text-blue-600 hover:text-blue-500">
            Contact us
          </a>{' '}
          for enterprise pricing.
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;