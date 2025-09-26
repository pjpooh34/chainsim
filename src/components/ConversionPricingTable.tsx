import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Check, 
  Star, 
  Zap, 
  Rocket, 
  Crown, 
  Building,
  ArrowRight,
  Sparkles,
  Shield,
  Brain,
  Target,
  BarChart3,
  Users,
  Infinity
} from 'lucide-react';

export default function ConversionPricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      subtitle: 'Get Started',
      icon: Star,
      price: { monthly: 0, annual: 0 },
      originalPrice: null,
      description: 'Perfect for exploring cloud readiness',
      features: [
        'AI-Generated Cloud Readiness Roadmap',
        'Basic architecture assessment',
        'Community forum access',
        'Self-service onboarding'
      ],
      cta: 'Start Free Assessment',
      ctaVariant: 'outline' as const,
      popular: false,
      color: 'from-slate-600 to-slate-700',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
    {
      name: 'Starter',
      subtitle: 'Small Teams',
      icon: Zap,
      price: { monthly: 800, annual: 680 },
      originalPrice: { monthly: null, annual: 800 },
      description: 'Essential AI-powered cloud tools',
      features: [
        '1 accelerator at a time',
        'AI-generated playbooks',
        'Basic cost forecasting',
        'Email support',
        'Sprint planning tools'
      ],
      cta: 'Start 14-Day Free Trial',
      ctaVariant: 'default' as const,
      popular: false,
      color: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    {
      name: 'Growth',
      subtitle: 'Most Popular',
      icon: Rocket,
      price: { monthly: 2500, annual: 2125 },
      originalPrice: { monthly: null, annual: 2500 },
      description: 'Full AI suite with advanced insights',
      features: [
        'Up to 3 concurrent accelerators',
        'AI Architecture Reviewer',
        'Business KPI Translator',
        'Monthly auto-reports',
        'Priority support',
        'Advanced analytics'
      ],
      cta: 'Start 14-Day Free Trial',
      ctaVariant: 'default' as const,
      popular: true,
      color: 'from-purple-600 to-purple-700',
      borderColor: 'border-purple-200 dark:border-purple-700'
    },
    {
      name: 'Scale',
      subtitle: 'Enterprise Ready',
      icon: Crown,
      price: { monthly: 5000, annual: 4250 },
      originalPrice: { monthly: null, annual: 5000 },
      description: 'Unlimited everything + compliance',
      features: [
        'Unlimited accelerators',
        'Full compliance suite',
        'AI training modules',
        'API & SSO integrations',
        'Phone support',
        'Advanced KPI dashboards'
      ],
      cta: 'Start 14-Day Free Trial',
      ctaVariant: 'default' as const,
      popular: false,
      color: 'from-emerald-600 to-emerald-700',
      borderColor: 'border-emerald-200 dark:border-emerald-700'
    },
    {
      name: 'Enterprise',
      subtitle: 'White Label',
      icon: Building,
      price: { monthly: null, annual: 15000 },
      originalPrice: null,
      description: 'Custom solution for agencies & MSPs',
      features: [
        'White-label platform',
        'Custom accelerators',
        'Dedicated success manager',
        '24/7 premium support',
        'Private cloud deployment',
        'Custom SLA'
      ],
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const,
      popular: false,
      color: 'from-amber-600 to-amber-700',
      borderColor: 'border-amber-200 dark:border-amber-700'
    }
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Custom';
    if (price === 0) return 'Free';
    return `$${price.toLocaleString()}`;
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const yearlySavings = (monthly * 12) - (annual * 12);
    const percentSaved = Math.round((yearlySavings / (monthly * 12)) * 100);
    return percentSaved;
  };

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Enterprise-Grade Results at SMB Prices</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Acceleration </span>
            Plan
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Get the outcomes of a $30K+ consulting engagement for a fraction of the cost — 
            all digital, AI-powered, and self-service.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <span className={`font-medium ${!isAnnual ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
              Monthly
            </span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-green-600"
            />
            <span className={`font-medium ${isAnnual ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
              Annual
            </span>
            <Badge className="bg-green-100 text-green-700 border-green-200 ml-2">
              Save 15%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = isAnnual ? plan.price.annual : plan.price.monthly;
            const billingPeriod = plan.name === 'Enterprise' ? '/year' : isAnnual ? '/mo (billed annually)' : '/mo';
            
            return (
              <Card 
                key={index}
                className={`relative p-8 transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-900 shadow-xl scale-105 ring-2 ring-purple-100 dark:ring-purple-900/50' 
                    : `${plan.borderColor} bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:scale-105`
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center space-y-4 mb-8">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                        {formatPrice(currentPrice)}
                      </span>
                      {currentPrice && currentPrice > 0 && (
                        <span className="text-slate-500 dark:text-slate-400">
                          {billingPeriod}
                        </span>
                      )}
                    </div>
                    
                    {/* Savings indicator */}
                    {isAnnual && plan.price.monthly && plan.price.annual && plan.price.monthly > plan.price.annual && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm text-slate-400 line-through">
                          ${plan.price.monthly}/mo
                        </span>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Save {calculateSavings(plan.price.monthly, plan.price.annual)}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-center">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full py-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg' 
                      : plan.ctaVariant === 'outline'
                      ? 'border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                      : `bg-gradient-to-r ${plan.color} hover:shadow-lg text-white`
                  }`}
                  variant={plan.popular ? 'default' : plan.ctaVariant}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              AI-Powered Everything
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              From architecture reviews to cost forecasting, our AI handles the heavy lifting so you can focus on results.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Enterprise-Grade Security
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              HIPAA, PCI DSS, GDPR compliance built-in. Industry-specific checklists and governance frameworks included.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Infinity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Scale Without Limits
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              From startup to enterprise, our platform grows with you. No vendor lock-in, no hidden fees.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                200+
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Pre-built Accelerators
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                75%
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Faster Than Traditional Consulting
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                $30K+
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Value Delivered vs $2.5K/mo Cost
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                14-Day
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Free Trial, No Credit Card
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                How is this different from traditional consulting?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                We deliver the same outcomes as $30K+ consulting engagements but through AI-powered automation, 
                pre-built accelerators, and self-service tools. No waiting, no human bottlenecks.
              </p>
            </div>
            
            <div className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Can I switch plans anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Absolutely! Upgrade or downgrade anytime. No long-term contracts, no cancellation fees. 
                Pay only for what you need, when you need it.
              </p>
            </div>
            
            <div className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                What if I need custom accelerators?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Our Enterprise plan includes custom accelerator development. For lower tiers, 
                industry-specific accelerators are available as add-ons ($5K-$10K each).
              </p>
            </div>
            
            <div className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Is my data secure?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Yes! Enterprise-grade security with SOC 2, GDPR compliance. Your data stays in your AWS account. 
                We only access what's needed for analysis, never store sensitive information.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 p-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Accelerate Your Cloud Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of SMBs getting enterprise results without enterprise costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
            >
              <Users className="w-5 h-5 mr-2" />
              Book a Demo
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required • Cancel anytime • 14-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}