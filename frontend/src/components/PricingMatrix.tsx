import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Rocket,
  Shield,
  Users,
  Building,
  ArrowRight,
  CheckCircle,
  Brain,
  DollarSign,
  Target,
  FileCheck,
  GraduationCap,
  BarChart3,
  Globe,
  Heart,
  CreditCard,
  Database,
  Cloud,
  Lock,
  Activity,
  TrendingUp
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export default function PricingMatrix() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Get started with AI-powered cloud readiness',
      icon: Star,
      color: 'from-slate-600 to-slate-700',
      popular: false,
      cta: 'Start Free Assessment'
    },
    {
      name: 'Starter',
      price: '$800',
      period: '/month',
      description: 'Essential tools for growing teams',
      icon: Zap,
      color: 'from-blue-600 to-blue-700',
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Growth',
      price: '$2,500',
      period: '/month',
      description: 'Advanced AI insights and automation',
      icon: Rocket,
      color: 'from-purple-600 to-purple-700',
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Scale',
      price: '$5,000',
      period: '/month',
      description: 'Enterprise-grade self-service platform',
      icon: Crown,
      color: 'from-emerald-600 to-emerald-700',
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$10K-$20K',
      period: '/year',
      description: 'White-label with dedicated success',
      icon: Building,
      color: 'from-amber-600 to-amber-700',
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const coreFeatures = [
    {
      category: 'Core Platform Features',
      features: [
        {
          name: 'Accelerators (Concurrent)',
          free: '1x Cloud Readiness Roadmap',
          starter: '1 at a time',
          growth: 'Up to 3 concurrent',
          scale: 'Unlimited',
          enterprise: 'Custom accelerators'
        },
        {
          name: 'AI Discovery Wizard',
          free: '✓',
          starter: '✓',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'AI Playbooks (PDF/Notion)',
          free: '✓',
          starter: '✓',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'Sprint Generator',
          free: '–',
          starter: '✓',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        }
      ]
    },
    {
      category: 'AI-Powered Features',
      features: [
        {
          name: 'AI Architecture Reviewer',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'Business KPI Translator',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'AI Cost Forecasting',
          free: '–',
          starter: 'Basic',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'AI Copilot (Chat Assistant)',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        }
      ]
    },
    {
      category: 'Analytics & Reporting',
      features: [
        {
          name: 'KPI Dashboard',
          free: '–',
          starter: 'Basic',
          growth: 'Advanced',
          scale: 'Full',
          enterprise: 'White-labeled'
        },
        {
          name: 'Monthly Auto-Reports',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'Cost Optimization Insights',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        },
        {
          name: 'Security Risk Analysis',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓'
        }
      ]
    },
    {
      category: 'Compliance & Governance',
      features: [
        {
          name: 'Compliance Checklists',
          free: 'Basic security',
          starter: 'Lite (basic security)',
          growth: 'Industry packs (add-on)',
          scale: 'Full compliance overlays',
          enterprise: 'Custom compliance'
        },
        {
          name: 'Industry-Specific Accelerators',
          free: '–',
          starter: 'Add-on ($5K-$10K each)',
          growth: 'Add-on ($5K-$10K each)',
          scale: '2 included per year',
          enterprise: 'Custom included'
        },
        {
          name: 'Compliance Governance Packs',
          free: '–',
          starter: 'Add-on ($1K-$5K)',
          growth: 'Add-on ($1K-$5K)',
          scale: 'Some included',
          enterprise: 'Full enterprise suite'
        }
      ]
    },
    {
      category: 'Training & Enablement',
      features: [
        {
          name: 'AI Training Modules',
          free: '–',
          starter: '–',
          growth: '✓ (text guides)',
          scale: '✓ (guides + AI videos)',
          enterprise: '✓ (full library)'
        },
        {
          name: 'Team Training Content',
          free: '–',
          starter: '–',
          growth: '✓',
          scale: '✓',
          enterprise: '✓ (white-labeled)'
        },
        {
          name: 'Knowledge Transfer Sessions',
          free: '–',
          starter: '–',
          growth: 'Self-service',
          scale: 'Self-service',
          enterprise: 'Dedicated sessions'
        }
      ]
    },
    {
      category: 'Marketplace & Add-ons',
      features: [
        {
          name: 'Playbook Marketplace',
          free: '–',
          starter: 'Pay-per-download ($500-$2K)',
          growth: 'Discounted access',
          scale: 'Some included',
          enterprise: 'Full access'
        },
        {
          name: 'Premium Templates',
          free: '–',
          starter: 'Add-on',
          growth: 'Add-on',
          scale: 'Some included',
          enterprise: 'All included'
        }
      ]
    },
    {
      category: 'Support & Success',
      features: [
        {
          name: 'Support Level',
          free: 'Community forum',
          starter: 'Email support',
          growth: 'Priority support',
          scale: 'Phone + email',
          enterprise: 'Dedicated success manager'
        },
        {
          name: 'Response Time SLA',
          free: 'Best effort',
          starter: '48 hours',
          growth: '24 hours',
          scale: '4 hours',
          enterprise: '2 hours'
        },
        {
          name: 'White-label / Private Label',
          free: '–',
          starter: '–',
          growth: '–',
          scale: '–',
          enterprise: '✓'
        }
      ]
    }
  ];

  type AcceleratorComplexity = 'Low' | 'Medium' | 'High';

  interface AcceleratorDefinition {
    name: string;
    description: string;
    icon: LucideIcon;
    complexity: AcceleratorComplexity;
    duration: string;
    pricing?: string;
  }

  const acceleratorLibrary: Array<{
    category: string;
    accelerators: AcceleratorDefinition[];
  }> = [
    {
      category: 'Core 5 Accelerators (MVP Launch)',
      accelerators: [
        {
          name: 'Cloud Cost Optimization Starter',
          description: 'Analyze billing & recommend top 3-5 savings opportunities',
          icon: DollarSign,
          complexity: 'Low',
          duration: '2 weeks'
        },
        {
          name: 'Security Baseline Setup',
          description: 'VPC, IAM roles, logging, encryption defaults',
          icon: Shield,
          complexity: 'Medium',
          duration: '3 weeks'
        },
        {
          name: 'Serverless API QuickStart',
          description: 'API Gateway + Lambda + DynamoDB demo API',
          icon: Zap,
          complexity: 'Medium',
          duration: '3 weeks'
        },
        {
          name: 'CI/CD Pipeline Bootstrap',
          description: 'GitHub → CodePipeline → Lambda/EKS deploy',
          icon: Activity,
          complexity: 'Medium',
          duration: '4 weeks'
        },
        {
          name: 'Bedrock Chatbot Starter',
          description: 'Deploy minimal chatbot with AWS Bedrock',
          icon: Brain,
          complexity: 'Medium',
          duration: '4 weeks'
        }
      ]
    },
    {
      category: 'Expansion Accelerators (Phase 2+)',
      accelerators: [
        {
          name: 'Data Lake Starter Kit',
          description: 'S3 + Glue + Athena scaffold for analytics',
          icon: Database,
          complexity: 'High',
          duration: '6 weeks'
        },
        {
          name: 'Monitoring & Alerts Accelerator',
          description: 'CloudWatch dashboards + SNS alerts',
          icon: BarChart3,
          complexity: 'Medium',
          duration: '3 weeks'
        },
        {
          name: 'Real-time Analytics Pipeline',
          description: 'Kinesis + Lambda + DynamoDB for live data',
          icon: TrendingUp,
          complexity: 'High',
          duration: '7 weeks'
        },
        {
          name: 'AI-Powered Customer Support Chatbot',
          description: 'Advanced chatbot with NLP and knowledge base',
          icon: Users,
          complexity: 'High',
          duration: '6 weeks'
        },
        {
          name: 'Cloud Migration Accelerator',
          description: 'Lift-and-shift + modernization framework',
          icon: Cloud,
          complexity: 'High',
          duration: '8 weeks'
        },
        {
          name: 'Personalization Engine',
          description: 'ML-powered user personalization platform',
          icon: Target,
          complexity: 'High',
          duration: '8 weeks'
        }
      ]
    },
    {
      category: 'Industry-Specific Accelerators (Premium)',
      accelerators: [
        {
          name: 'HIPAA Compliance Checklist',
          description: 'Healthcare-specific security and compliance framework',
          icon: Heart,
          complexity: 'High',
          duration: '5 weeks',
          pricing: '$5K-$10K'
        },
        {
          name: 'Retail Data Lake Blueprint',
          description: 'E-commerce analytics and customer insights platform',
          icon: Building,
          complexity: 'High',
          duration: '6 weeks',
          pricing: '$5K-$10K'
        },
        {
          name: 'EKS Security Hardening Guide',
          description: 'Kubernetes security best practices implementation',
          icon: Lock,
          complexity: 'High',
          duration: '4 weeks',
          pricing: '$5K-$10K'
        },
        {
          name: 'Retail AI Product Recommendation',
          description: 'ML-powered product recommendation engine',
          icon: TrendingUp,
          complexity: 'High',
          duration: '8 weeks',
          pricing: '$8K-$12K'
        },
        {
          name: 'Healthcare Secure Patient Data Storage',
          description: 'HIPAA-compliant data storage and access controls',
          icon: Heart,
          complexity: 'High',
          duration: '6 weeks',
          pricing: '$8K-$12K'
        },
        {
          name: 'Finance Audit-Ready Logging & Monitoring',
          description: 'SOX-compliant logging and audit trail system',
          icon: CreditCard,
          complexity: 'High',
          duration: '5 weeks',
          pricing: '$6K-$10K'
        }
      ]
    }
  ];

  const upsellOpportunities = [
    {
      category: 'Add-on Revenue Streams',
      items: [
        {
          name: 'Marketplace Playbooks',
          pricing: '$500 - $2K each',
          description: 'One-time purchase, downloadable templates'
        },
        {
          name: 'Industry-Specific Accelerators',
          pricing: '$5K - $12K each',
          description: 'Custom accelerators for specific verticals'
        },
        {
          name: 'Compliance Packs',
          pricing: '$1K - $5K each',
          description: 'Industry compliance overlays and checklists'
        },
        {
          name: 'Private Label for MSPs/Agencies',
          pricing: '$10K - $20K/year',
          description: 'White-label platform with custom branding'
        },
        {
          name: 'Annual Prepay Discounts',
          pricing: '2 months free',
          description: 'Boosts cash flow and reduces churn'
        }
      ]
    }
  ];

  const getComplexityColor = (complexity: AcceleratorComplexity) => {
    switch (complexity) {
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Complete Feature & Pricing Matrix
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive breakdown of all features, accelerators, and pricing tiers for Cloud AcceleratorsAI
          </p>
        </div>

        {/* Pricing Tiers Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card key={index} className={`p-6 relative ${tier.popular ? 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 scale-105' : 'bg-white/60 dark:bg-slate-900/60'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {tier.name}
                    </h3>
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                      {tier.price}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {tier.period}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    {tier.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabbed Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Feature Matrix</TabsTrigger>
            <TabsTrigger value="accelerators">Accelerator Library</TabsTrigger>
            <TabsTrigger value="upsells">Revenue Streams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Feature Matrix */}
            {coreFeatures.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  {category.category}
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 pr-6 font-semibold text-slate-900 dark:text-slate-100">
                          Feature
                        </th>
                        {pricingTiers.map((tier) => (
                          <th key={tier.name} className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 min-w-[120px]">
                            {tier.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-4 pr-6 text-slate-700 dark:text-slate-300">
                            {feature.name}
                          </td>
                          <td className="text-center py-4 px-4 text-sm">
                            <span className={`${feature.free === '✓' ? 'text-emerald-600' : feature.free === '–' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature.free}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4 text-sm">
                            <span className={`${feature.starter === '✓' ? 'text-emerald-600' : feature.starter === '–' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature.starter}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4 text-sm">
                            <span className={`${feature.growth === '✓' ? 'text-emerald-600' : feature.growth === '–' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature.growth}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4 text-sm">
                            <span className={`${feature.scale === '✓' ? 'text-emerald-600' : feature.scale === '–' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature.scale}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4 text-sm">
                            <span className={`${feature.enterprise === '✓' ? 'text-emerald-600' : feature.enterprise === '–' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {feature.enterprise}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="accelerators" className="space-y-6">
            {/* Accelerator Library */}
            {acceleratorLibrary.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  {category.category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.accelerators.map((accelerator, acceleratorIndex) => {
                    const Icon = accelerator.icon;
                    return (
                      <div key={acceleratorIndex} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                  {accelerator.name}
                                </h4>
                              </div>
                            </div>
                            <Badge className={`${getComplexityColor(accelerator.complexity)} text-xs`}>
                              {accelerator.complexity}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {accelerator.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Duration: {accelerator.duration}</span>
                            {accelerator.pricing && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                {accelerator.pricing}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upsells" className="space-y-6">
            {/* Revenue Streams */}
            {upsellOpportunities.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            {item.pricing}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Summary */}
            <Card className="p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Revenue Model Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Recurring Revenue</h4>
                    <ul className="space-y-1 text-emerald-100">
                      <li>• Monthly subscriptions ($800-$5K)</li>
                      <li>• Annual plans (2 months free)</li>
                      <li>• Enterprise contracts ($10K-$20K)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">One-time Revenue</h4>
                    <ul className="space-y-1 text-emerald-100">
                      <li>• Marketplace playbooks ($500-$2K)</li>
                      <li>• Industry accelerators ($5K-$12K)</li>
                      <li>• Compliance packs ($1K-$5K)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">High-Margin</h4>
                    <ul className="space-y-1 text-emerald-100">
                      <li>• White-label licenses</li>
                      <li>• Custom accelerators</li>
                      <li>• Enterprise success programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Ready to Implement This Pricing Strategy?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              This matrix captures all features and accelerators discussed. Perfect foundation for your 
              pricing page, sales materials, and product roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ArrowRight className="w-4 h-4 mr-2" />
                Update Pricing Page
              </Button>
              <Button variant="outline">
                <FileCheck className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
