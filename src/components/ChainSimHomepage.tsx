import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowRight,
  Play,
  CheckCircle,
  Code,
  FileText,
  Radar,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Building,
  Globe,
  Star,
  DollarSign,
  Clock,
  Award,
  Quote,
  ChevronRight,
  BarChart3,
  Database,
  BookOpen,
  AlertCircle,
  Sparkles,
  Target,
  Layers,
  Settings,
  PieChart,
  FileCheck,
  Briefcase
} from 'lucide-react';

interface ChainSimHomepageProps {
  onStartTrial: () => void;
  onNavigate: (view: string) => void;
}

export default function ChainSimHomepage({ onStartTrial, onNavigate }: ChainSimHomepageProps) {
  const [activeDemo, setActiveDemo] = useState<'sandbox' | 'portfolio' | 'radar'>('sandbox');

  const valuePropCards = [
    {
      icon: Code,
      title: 'Sandbox Simulation',
      description: 'Test tokenized issuance, trading, and settlement in a safe environment. JS + Python SDKs. Audit logs included.',
      cta: 'Play with Sandbox',
      color: 'from-blue-600 to-cyan-600',
      features: ['Multi-language SDKs', 'Real-time simulation', 'Compliance testing', 'Audit trail generation']
    },
    {
      icon: PieChart,
      title: 'Portfolio Copilot',
      description: 'Upload holdings, simulate tokenization scenarios, and export client-ready reports. Perfect for RIAs & fintech pitches.',
      cta: 'See Sample Report',
      color: 'from-purple-600 to-pink-600',
      features: ['CSV upload & normalization', 'Tokenization modeling', 'Client-ready PDFs', 'ROI projections']
    },
    {
      icon: Radar,
      title: 'RegRadar Briefs',
      description: 'Stop drowning in filings. We scrape SEC, FINRA, and DTCC updates, then deliver digestible briefs linked directly to your sandbox.',
      cta: 'View Latest Brief',
      color: 'from-emerald-600 to-teal-600',
      features: ['Real-time regulatory updates', 'AI-powered summaries', 'Direct sandbox integration', 'Compliance playbooks']
    },
    {
      icon: CheckCircle,
      title: 'Readiness Center',
      description: 'Guided assessments, checklists, and personalized recommendations to ensure successful tokenization implementation.',
      cta: 'Start Assessment',
      color: 'from-green-600 to-emerald-600',
      features: ['Implementation assessments', 'Compliance checklists', 'Readiness scoring', 'Action recommendations']
    },
    {
      icon: FileText,
      title: 'Investor Communications',
      description: 'Transform simulations and briefs into professional client-ready one-pagers, newsletters, and presentation decks.',
      cta: 'Generate Sample',
      color: 'from-indigo-600 to-blue-600',
      features: ['AI-powered generation', 'Professional templates', 'Data integration', 'Brand customization']
    },
    {
      icon: Shield,
      title: 'Risk & Compliance Simulator',
      description: 'Stress test edge cases like KYC failures, custody breaks, and material rights mismatches with comprehensive risk heatmaps.',
      cta: 'Run Stress Test',
      color: 'from-red-600 to-orange-600',
      features: ['Edge case simulation', 'Risk heatmaps', 'Compliance monitoring', 'Impact analysis']
    }
  ];

  const competitors = [
    { name: 'Legacy Provider A', price: '$2,500-$5,000/mo', features: ['Limited SDK support', 'Manual compliance', 'No LLM assistance'] },
    { name: 'Enterprise Solution B', price: '$1,000-$3,000/mo', features: ['Complex setup', 'Bloated features', 'High support overhead'] },
    { name: 'ChainSim Hub', price: '$225-$1,875/mo', features: ['Full SDK support', 'AI-powered compliance', 'LLM copilot included'], highlight: true }
  ];

  const testimonialScenarios = [
    {
      persona: 'Indie Developer',
      quote: 'As an indie dev, I spun up a full tokenized settlement sim in a weekend.',
      name: 'Alex Chen',
      title: 'Blockchain Developer',
      scenario: 'Built DeFi protocol prototype',
      impact: '75% faster development',
      icon: Code
    },
    {
      persona: 'RIA Professional',
      quote: 'As an RIA, I generated 5 client-ready tokenization reports without hiring analysts.',
      name: 'Sarah Johnson',
      title: 'Registered Investment Advisor',
      scenario: 'Client education on tokenized assets',
      impact: '$50K+ in new AUM',
      icon: Briefcase
    },
    {
      persona: 'Fintech Startup',
      quote: 'As a fintech startup, I tested compliance scenarios before my first SEC call.',
      name: 'Michael Rodriguez',
      title: 'Co-founder, TokenVest',
      scenario: 'Pre-launch compliance validation',
      impact: '3 months saved on regulatory prep',
      icon: Building
    }
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Perfect for learning and experimentation',
      features: [
        '1 project',
        '500 API calls/month',
        '1 report/month',
        'Community support',
        'Basic sandbox access'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'from-slate-600 to-slate-700'
    },
    {
      name: 'Pro',
      price: '$225',
      period: '/month',
      description: 'For individual developers and small RIAs',
      features: [
        '3 projects',
        '100K API calls/month',
        '5 reports/month',
        'RegRadar weekly briefs',
        'Email support',
        'Advanced sandbox features'
      ],
      cta: 'Start Pro Trial',
      popular: false,
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Team',
      price: '$675',
      period: '/month',
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
      cta: 'Start Team Trial',
      popular: true,
      color: 'from-purple-600 to-purple-700'
    },
    {
      name: 'Scale',
      price: '$1,125',
      period: '/month',
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
      cta: 'Contact Sales',
      popular: false,
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      name: 'Enterprise',
      price: 'Starting $1,875',
      period: '/month',
      description: 'White-glove service for institutions',
      features: [
        'Unlimited projects',
        'Custom API limits',
        'Unlimited reports',
        'Dedicated support team',
        'On-premise deployment',
        'SLA guarantees',
        'Regulatory consultation',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-slate-600 to-slate-700'
    }
  ];

  const demoContent = {
    sandbox: {
      title: 'Interactive Sandbox Environment',
      code: `// Tokenize and settle a trade in T+0
const trade = await chainSim.createTrade({
  asset: 'AAPL-TOKEN',
  quantity: 100,
  price: 150.25,
  settlement: 'T+0'
});

// Simulate compliance validation
const compliance = await chainSim.validateCompliance(trade, {
  kyc: true,
  aml: true,
  accredited: true
});

console.log('Trade settled:', trade.id);
console.log('Compliance status:', compliance.passed);`,
      features: ['Real-time execution', 'Multi-asset support', 'Compliance simulation', 'Audit logging']
    },
    portfolio: {
      title: 'Portfolio Analysis & Reports',
      preview: 'Client Portfolio Analysis - Traditional vs Tokenized Assets',
      features: ['CSV data ingestion', 'Tokenization modeling', 'Risk analysis', 'Client presentations']
    },
    radar: {
      title: 'Regulatory Intelligence',
      briefTitle: 'SEC Proposes New T+1 Settlement Rules',
      features: ['Real-time monitoring', 'AI summaries', 'Impact analysis', 'Implementation guides']
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  ChainSim Hub
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Tokenized Securities Platform
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Pricing
              </a>
              <a href="#docs" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Docs
              </a>
              <Button variant="outline" className="border-slate-300 dark:border-slate-600">
                Sign In
              </Button>
              <Button onClick={onStartTrial} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Enterprise-grade tokenized securities platform</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight max-w-5xl mx-auto">
              Professional infrastructure for 
              <span className="text-blue-600"> tokenized securities</span> development and compliance
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Built for developers, fintechs, and RIAs who need institutional-grade capabilities 
              with modern efficiency and developer-first design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onStartTrial}
                className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 px-8 py-4 font-semibold shadow-sm transition-all duration-200"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('sandbox')}
                className="border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 px-8 py-4 font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />
                View Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                <div className="flex justify-center space-x-1">
                  {Object.entries(demoContent).map(([key, content]) => (
                    <Button
                      key={key}
                      variant={activeDemo === key ? 'default' : 'ghost'}
                      onClick={() => setActiveDemo(key as any)}
                      size="sm"
                      className={activeDemo === key 
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }
                    >
                      {content.title.split(' ')[0]}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
              
              {activeDemo === 'sandbox' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100">
                    {demoContent.sandbox.title}
                  </h3>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{demoContent.sandbox.code}</code>
                    </pre>
                  </div>
                </div>
              )}
              
              {activeDemo === 'portfolio' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100">
                    {demoContent.portfolio.title}
                  </h3>
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600 dark:text-slate-400" />
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {demoContent.portfolio.preview}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      Interactive report generation and analysis
                    </p>
                  </div>
                </div>
              )}
              
              {activeDemo === 'radar' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100">
                    {demoContent.radar.title}
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {demoContent.radar.briefTitle}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          AI-powered summary of regulatory changes with direct sandbox integration for testing compliance scenarios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Core Platform Components
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive infrastructure for tokenized securities development and operations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {valuePropCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-all duration-200">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {card.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={() => {
                        if (index === 0) onNavigate('sandbox');
                        else if (index === 1) onNavigate('portfolio');
                        else if (index === 2) onNavigate('regRadar');
                        else if (index === 3) onNavigate('readiness');
                        else if (index === 4) onNavigate('investorComms');
                        else if (index === 5) onNavigate('riskCompliance');
                      }}
                    >
                      {card.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Why ChainSim is Different
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Built on modern infrastructure with AI-first approach for better performance and lower costs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Built on Serverless
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Vercel + Railway infrastructure means lower costs passed directly to you
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                LLM-Native Copilot
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Reduces support overhead, enabling significantly cheaper pricing
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                No Bloated Features
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Only sandbox, reports, and compliance insights you actually need
              </p>
            </div>
          </div>

          {/* Pricing Comparison */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100 mb-8">
              Pricing Comparison
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {competitors.map((competitor, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${
                  competitor.highlight 
                    ? 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-700' 
                    : 'border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'
                }`}>
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                      {competitor.name}
                    </h4>
                    <p className={`text-2xl font-bold mt-2 ${
                      competitor.highlight ? 'text-purple-600' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {competitor.price}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {competitor.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        {competitor.highlight ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-300" />
                        )}
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Scenarios */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              See how different personas use ChainSim Hub to achieve their goals
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonialScenarios.map((testimonial, index) => {
              const Icon = testimonial.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-all duration-200">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <div className="px-2 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 rounded text-sm font-medium">
                          {testimonial.persona}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">
                          {testimonial.impact}
                        </p>
                        <p className="text-xs text-slate-500">
                          {testimonial.scenario}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Start free, scale as you grow. All plans include our core simulation platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative ${
                tier.popular 
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 scale-105 shadow-lg' 
                  : 'bg-white dark:bg-slate-800'
              } rounded-lg border border-slate-200 dark:border-slate-700 p-8 transition-all duration-200`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {tier.name}
                    </h3>
                    <div className="text-3xl font-bold mt-4">
                      {tier.price}
                    </div>
                    <div className={`text-sm ${
                      tier.popular 
                        ? 'text-white/70 dark:text-slate-900/70' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {tier.period}
                    </div>
                  </div>
                  
                  <p className={`text-center text-sm ${
                    tier.popular 
                      ? 'text-white/70 dark:text-slate-900/70' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {tier.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          tier.popular 
                            ? 'bg-white/70 dark:bg-slate-900/70' 
                            : 'bg-slate-400'
                        }`}></div>
                        <span className={`text-sm ${
                          tier.popular 
                            ? 'text-white/90 dark:text-slate-900/90' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700' 
                        : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200'
                    }`}
                    onClick={onStartTrial}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              $10K MRR path: 20 Teams + 10 Scale + 30 Pros = $12.5K monthly recurring revenue
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Usage add-ons available</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>White-label options</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Scenario packs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Build the Future of Finance?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join developers, fintechs, and RIAs who are already building with tokenized securities. 
              Start your free trial today and see results in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onStartTrial}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
              <span>✓ No credit card required</span>
              <span>✓ 14-day free trial</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">ChainSim Hub</h3>
                  <p className="text-xs text-slate-400">Tokenized Securities Platform</p>
                </div>
              </div>
              <p className="text-slate-400">
                The modern platform for tokenized securities development, testing, and compliance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-2">
                <button onClick={() => onNavigate('sandbox')} className="block text-slate-400 hover:text-white transition-colors text-left">Sandbox</button>
                <button onClick={() => onNavigate('portfolio')} className="block text-slate-400 hover:text-white transition-colors text-left">Portfolio Copilot</button>
                <button onClick={() => onNavigate('regRadar')} className="block text-slate-400 hover:text-white transition-colors text-left">RegRadar</button>
                <button onClick={() => onNavigate('readiness')} className="block text-slate-400 hover:text-white transition-colors text-left">Readiness Center</button>
                <button onClick={() => onNavigate('investorComms')} className="block text-slate-400 hover:text-white transition-colors text-left">Investor Comms</button>
                <button onClick={() => onNavigate('riskCompliance')} className="block text-slate-400 hover:text-white transition-colors text-left">Risk & Compliance</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">API Status</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Security</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2024 ChainSim Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Shield className="w-3 h-3 mr-1" />
                Stripe Secure
              </Badge>
              <span className="text-slate-500">Backed by Cursor-built infrastructure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}