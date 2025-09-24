import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { 
  CreditCard,
  Crown,
  Zap,
  FileText,
  Target,
  Shield,
  Settings as SettingsIcon,
  User,
  Bell,
  DollarSign,
  BarChart3,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Plus,
  Minus,
  ExternalLink,
  Building,
  Package,
  Sparkles
} from 'lucide-react';

// Mock data for current subscription - showing the billing scenario
const currentSubscription = {
  plan: 'Pro',
  priceId: 'price_pro',
  amount: 225,
  status: 'active',
  currentPeriodEnd: '2024-09-08',
  usage: {
    apiCalls: { used: 200000, limit: 100000, overage: 100000 }, // 100k over limit
    reports: { used: 3, limit: 5, overage: 0 },
    scenarioRuns: { used: 25, limit: 50, overage: 0 }
  }
};

// Pricing structure from the Stripe mapping
const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    priceId: 'price_free',
    price: 0,
    period: 'forever',
    description: 'Perfect for learning and experimentation',
    features: [
      '1 project',
      '500 API calls/month',
      '1 report/month',
      'Community support',
      'Basic sandbox access'
    ],
    limits: {
      apiCalls: 500,
      reports: 1,
      scenarios: 10
    },
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    priceId: 'price_pro',
    price: 225,
    period: 'month',
    description: 'For individual developers and small RIAs',
    features: [
      '3 projects',
      '100K API calls/month',
      '5 reports/month',
      'RegRadar weekly briefs',
      'Email support',
      'Advanced sandbox features'
    ],
    limits: {
      apiCalls: 100000,
      reports: 5,
      scenarios: 50
    },
    popular: false
  },
  {
    id: 'team',
    name: 'Team',
    priceId: 'price_team',
    price: 675,
    period: 'month',
    description: 'Most popular for growing teams',
    features: [
      '10 projects',
      '1M API calls/month',
      '20 reports/month',
      'RegRadar daily briefs',
      'Priority support',
      'Team collaboration tools',
      'Custom scenarios'
    ],
    limits: {
      apiCalls: 1000000,
      reports: 20,
      scenarios: 200
    },
    popular: true
  },
  {
    id: 'scale',
    name: 'Scale',
    priceId: 'price_scale',
    price: 1125,
    period: 'month',
    description: 'Enterprise-grade capabilities',
    features: [
      '25+ projects',
      '5M+ API calls/month',
      'Unlimited reports',
      'Private RAG copilot',
      'Phone support',
      'White-label options',
      'Custom integrations'
    ],
    limits: {
      apiCalls: 5000000,
      reports: 999,
      scenarios: 1000
    },
    popular: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceId: 'price_enterprise',
    price: 1875,
    period: 'month',
    description: 'White-glove service for institutions',
    features: [
      'Unlimited projects',
      'Custom API limits',
      'Unlimited reports',
      'Dedicated support team',
      'Custom integrations',
      'On-premise deployment',
      'SLA guarantees',
      'Regulatory consultation'
    ],
    limits: {
      apiCalls: 999999999,
      reports: 999,
      scenarios: 999999
    },
    popular: false
  }
];

const usageAddons = [
  {
    id: 'api_calls',
    name: 'Extra API Calls',
    priceId: 'price_api_calls',
    price: 20,
    unit: 'per 100k calls',
    description: 'Additional API calls beyond your plan limit'
  },
  {
    id: 'reports',
    name: 'Extra Reports',
    priceId: 'price_reports',
    price: 15,
    unit: 'per report',
    description: 'Additional report generation capacity'
  },
  {
    id: 'scenarios',
    name: 'Extra Scenario Runs',
    priceId: 'price_scenarios',
    price: 50,
    unit: 'per 50 runs',
    description: 'Additional scenario execution capacity'
  },
  {
    id: 'risk_simulation',
    name: 'Risk Simulation Runs',
    priceId: 'price_risk_simulation',
    price: 149,
    unit: 'per simulation',
    description: 'Premium risk & compliance stress testing scenarios'
  }
];

const scenarioPacks = [
  {
    id: 'eom',
    name: 'EOM Corporate Actions',
    priceId: 'price_scenario_eom',
    price: 149,
    description: 'End-of-month corporate action scenarios',
    features: ['Dividend processing', 'Stock splits', 'Spin-offs', 'Rights offerings']
  },
  {
    id: 'ops',
    name: 'Ops Dual Rails',
    priceId: 'price_scenario_ops',
    price: 225,
    description: 'Operational dual-rail settlement testing',
    features: ['T+0/T+1 comparison', 'Failed settlement recovery', 'Cross-border settlement', 'Multi-currency support']
  },
  {
    id: 'compliance',
    name: 'Compliance Drill',
    priceId: 'price_scenario_compliance',
    price: 299,
    description: 'Comprehensive compliance scenario testing',
    features: ['KYC validation', 'AML screening', 'Accredited investor checks', 'Regulatory reporting']
  }
];

const readinessFeatures = [
  {
    id: 'pdf_export',
    name: 'Assessment PDF Exports',
    priceId: 'price_readiness_pdf',
    price: 49,
    type: 'one-time',
    unit: 'per export',
    description: 'Professional PDF reports for client presentations'
  },
  {
    id: 'training_mode',
    name: 'Training Mode',
    priceId: 'price_training_mode',
    price: 99,
    type: 'recurring',
    unit: 'per month',
    description: 'Interactive training modules and certifications'
  },
  {
    id: 'custom_brief',
    name: 'Custom Brief Feed',
    priceId: 'price_custom_brief',
    price: 49,
    type: 'recurring',
    unit: 'per month',
    description: 'Personalized regulatory intelligence feed'
  }
];

const billingHistory = [
  {
    id: 'inv_001',
    date: '2024-09-08',
    description: 'Monthly Invoice - Pro Plan + Usage + Add-ons',
    amount: 492.00,
    status: 'pending',
    breakdown: [
      { item: 'ChainSim Pro', amount: 225.00 },
      { item: 'Extra API Calls (100k)', amount: 20.00 },
      { item: 'Scenario Pack: EOM', amount: 149.00 },
      { item: 'Readiness PDF Exports (2)', amount: 98.00 }
    ]
  },
  {
    id: 'inv_002',
    date: '2024-08-15',
    description: 'Scenario Pack: EOM Corporate Actions',
    amount: 149.00,
    status: 'paid'
  },
  {
    id: 'inv_003',
    date: '2024-08-08',
    description: 'ChainSim Pro - Monthly Subscription',
    amount: 225.00,
    status: 'paid'
  },
  {
    id: 'inv_004',
    date: '2024-08-05',
    description: 'Plan Upgrade: Free → Pro',
    amount: 225.00,
    status: 'paid'
  },
  {
    id: 'inv_005',
    date: '2024-07-22',
    description: 'Readiness PDF Export',
    amount: 49.00,
    status: 'paid'
  }
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('subscription');
  const [selectedPlan, setSelectedPlan] = useState(currentSubscription.plan.toLowerCase());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const formatUsage = (used: number, limit: number) => {
    const percentage = Math.min((used / limit) * 100, 100);
    return { percentage, remaining: Math.max(limit - used, 0) };
  };

  const isOverage = (used: number, limit: number) => used > limit;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Account Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your subscription, usage, and account preferences
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400">
            <Crown className="w-3 h-3 mr-1" />
            {currentSubscription.plan} Plan
          </Badge>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Stripe Dashboard
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="subscription" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="addons" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Add-ons</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Account</span>
          </TabsTrigger>
        </TabsList>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Current Subscription
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Next billing date: {currentSubscription.currentPeriodEnd}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ${currentSubscription.amount}/mo
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">API Calls</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {currentSubscription.usage.apiCalls.used.toLocaleString()} / {currentSubscription.usage.apiCalls.limit.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Reports</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {currentSubscription.usage.reports.used} / {currentSubscription.usage.reports.limit}
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Scenario Runs</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {currentSubscription.usage.scenarioRuns.used} / {currentSubscription.usage.scenarioRuns.limit}
                </div>
              </div>
            </div>
          </Card>

          {/* Available Plans */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Available Plans
            </h3>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className={`p-6 relative transition-all duration-200 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                    : 'hover:shadow-lg'
                } ${
                  selectedPlan === plan.id 
                    ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' 
                    : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {plan.name}
                      </h4>
                      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                        ${plan.price}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        /{plan.period}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                      {plan.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full"
                      variant={currentSubscription.plan.toLowerCase() === plan.id ? 'outline' : 'default'}
                      disabled={currentSubscription.plan.toLowerCase() === plan.id}
                    >
                      {currentSubscription.plan.toLowerCase() === plan.id ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          {/* Current Bill Preview */}
          <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span>Current Bill Preview</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Your estimated charges for this billing cycle
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">$492</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Due Sep 8, 2024</div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Subscription Base */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">ChainSim Pro - Monthly</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Base subscription plan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">$225.00</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Recurring</Badge>
                </div>
              </div>

              {/* Usage Overage */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Extra API Calls</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">100k calls over plan limit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">$20.00</p>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">Usage</Badge>
                </div>
              </div>

              {/* Scenario Pack */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Scenario Pack: EOM</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">End-of-month corporate actions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">$149.00</p>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Add-on</Badge>
                </div>
              </div>

              {/* One-time Purchase */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Readiness PDF Exports</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">2 professional client reports</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">$98.00</p>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">One-time</Badge>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total Due</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Next billing: Sep 8, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">$492.00</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Auto-pay enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* API Calls Usage */}
            <Card className="p-6 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">API Calls</h3>
                </div>
                <Badge variant="destructive">
                  Over Limit
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Used</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {currentSubscription.usage.apiCalls.used.toLocaleString()} / {currentSubscription.usage.apiCalls.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={100} 
                    className="h-2"
                  />
                  <div className="w-full bg-orange-200 dark:bg-orange-900 rounded-full h-2 mt-1">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Overage: 100k calls
                  </div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-700 dark:text-orange-300">
                      Additional charges: $20.00
                    </span>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </Card>

            {/* Reports Usage */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Reports</h3>
                </div>
                <Badge variant="default">Within Limit</Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Used</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {currentSubscription.usage.reports.used} / {currentSubscription.usage.reports.limit}
                    </span>
                  </div>
                  <Progress 
                    value={formatUsage(currentSubscription.usage.reports.used, currentSubscription.usage.reports.limit).percentage} 
                    className="h-2"
                  />
                </div>
                
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {formatUsage(currentSubscription.usage.reports.used, currentSubscription.usage.reports.limit).remaining} reports remaining
                </div>
                
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Extra Reports
                </Button>
              </div>
            </Card>

            {/* Scenario Runs Usage */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Scenario Runs</h3>
                </div>
                <Badge variant="default">Within Limit</Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Used</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {currentSubscription.usage.scenarioRuns.used} / {currentSubscription.usage.scenarioRuns.limit}
                    </span>
                  </div>
                  <Progress 
                    value={formatUsage(currentSubscription.usage.scenarioRuns.used, currentSubscription.usage.scenarioRuns.limit).percentage} 
                    className="h-2"
                  />
                </div>
                
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {formatUsage(currentSubscription.usage.scenarioRuns.used, currentSubscription.usage.scenarioRuns.limit).remaining} runs remaining
                </div>
                
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Extra Runs
                </Button>
              </div>
            </Card>
          </div>

          {/* Usage History Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Usage Trends (Last 30 Days)
            </h3>
            <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <TrendingUp className="w-12 h-12 mx-auto text-slate-400" />
                <p className="text-slate-600 dark:text-slate-400">Usage analytics chart would display here</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Integrated with Recharts for production</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Add-ons Tab */}
        <TabsContent value="addons" className="space-y-6">
          {/* Usage-Based Add-ons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Usage-Based Add-ons
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {usageAddons.map((addon) => (
                <Card key={addon.id} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {addon.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {addon.description}
                      </p>
                    </div>
                    
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      ${addon.price}
                      <span className="text-sm font-normal text-slate-600 dark:text-slate-400 ml-1">
                        {addon.unit}
                      </span>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Scenario Packs */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Scenario Packs
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {scenarioPacks.map((pack) => (
                <Card key={pack.id} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {pack.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {pack.description}
                      </p>
                    </div>
                    
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      ${pack.price}/mo
                    </div>
                    
                    <ul className="space-y-2">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full">
                      <Package className="w-4 h-4 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Readiness Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Premium Readiness Features
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {readinessFeatures.map((feature) => (
                <Card key={feature.id} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          {feature.name}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      ${feature.price}
                      <span className="text-sm font-normal text-slate-600 dark:text-slate-400 ml-1">
                        {feature.unit}
                      </span>
                    </div>
                    
                    <Button className="w-full" variant={feature.type === 'one-time' ? 'default' : 'outline'}>
                      {feature.type === 'one-time' ? 'Purchase' : 'Subscribe'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Payment Method */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Payment Method
              </h3>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  •••• •••• •••• 4242
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Expires 12/26
                </p>
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Billing History
              </h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className={`border rounded-lg ${
                  invoice.status === 'pending' 
                    ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        invoice.status === 'pending'
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        <FileText className={`w-5 h-5 ${
                          invoice.status === 'pending'
                            ? 'text-blue-600'
                            : 'text-slate-600 dark:text-slate-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {invoice.description}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {invoice.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          ${invoice.amount.toFixed(2)}
                        </p>
                        <Badge className={`text-xs ${
                          invoice.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Show breakdown for pending invoice */}
                  {invoice.breakdown && (
                    <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Invoice Breakdown
                      </h4>
                      <div className="space-y-2">
                        {invoice.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">{item.item}</span>
                            <span className="text-slate-900 dark:text-slate-100">${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between text-sm font-medium">
                          <span className="text-slate-900 dark:text-slate-100">Total</span>
                          <span className="text-slate-900 dark:text-slate-100">${invoice.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Profile Settings
            </h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    defaultValue="john@company.com"
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Company
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Acme Financial"
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Role
                  </label>
                  <select className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                    <option>Developer</option>
                    <option>RIA</option>
                    <option>Fintech Executive</option>
                    <option>Compliance Officer</option>
                  </select>
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Email Notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Receive updates about your account and usage</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">RegRadar Briefs</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Daily regulatory intelligence updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Usage Alerts</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Notifications when approaching plan limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Marketing Communications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Product updates and feature announcements</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-6">
              Danger Zone
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Cancel Subscription</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">This will cancel your subscription at the end of the current billing period</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400">
                  Cancel Plan
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Delete Account</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}