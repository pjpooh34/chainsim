import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Rocket,
  Brain,
  Zap,
  Shield,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Quote,
  ChevronDown,
  BarChart3,
  Globe,
  Search,
  BookOpen,
  Store,
  Settings,
  Menu,
  X,
  Activity,
  Database,
  Cloud,
  Lock,
  FileCheck,
  GraduationCap
} from "lucide-react";
import ConversionPricingTable from "./ConversionPricingTable";

interface HomepageProps {
  onStartDemo: () => void;
  onNavigate: (view: string) => void;
}

export default function Homepage({ onStartDemo, onNavigate }: HomepageProps) {
  const [selectedFeature, setSelectedFeature] = useState('discovery');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      id: 'discovery',
      name: 'AI-Powered Discovery',
      icon: Brain,
      description: 'Intelligent assessment that analyzes your infrastructure and identifies optimization opportunities',
      benefits: ['Automated risk assessment', 'Personalized recommendations', 'ROI projections'],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'architecture-reviewer',
      name: 'AI Architecture Reviewer',
      icon: Search,
      description: 'Paste in your AWS architecture diagram or CloudFormation JSON for AI-powered review and scoring',
      benefits: ['Security gap analysis', 'Cost risk identification', 'Scaling issue detection'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'kpi-translator',
      name: 'Business KPI Translator',
      icon: Target,
      description: 'Enter business goals and get AI-mapped tech KPIs with suggested accelerator recommendations',
      benefits: ['Business-to-tech mapping', 'Non-technical friendly', 'Automated recommendations'],
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'cost-forecasting',
      name: 'AI Cost Forecasting',
      icon: DollarSign,
      description: 'Upload AWS bills for AI-generated cost projection scenarios and savings opportunities',
      benefits: ['Workload cost prediction', 'Migration savings analysis', 'Budget planning tools'],
      color: 'from-amber-600 to-orange-600'
    },
    {
      id: 'compliance-generator',
      name: 'Compliance Checklist Generator',
      icon: Shield,
      description: 'Industry-specific security and compliance checklists for Healthcare, Finance, Retail and more',
      benefits: ['HIPAA, PCI DSS, GDPR ready', 'Industry-specific guidance', 'Accelerator integration'],
      color: 'from-red-600 to-rose-600'
    },
    {
      id: 'training-modules',
      name: 'AI Training Modules',
      icon: Activity,
      description: 'Every accelerator generates 10-minute training guides with AI-narrated videos for your team',
      benefits: ['Plain-language summaries', 'Production best practices', 'Video & text formats'],
      color: 'from-indigo-600 to-blue-600'
    }
  ];

  const stats = [
    { label: 'Average Cost Savings', value: '$450K', description: 'Per accelerator deployment' },
    { label: 'Implementation Time', value: '90 days', description: 'Vs 9+ months traditional' },
    { label: 'Success Rate', value: '97%', description: 'Project completion rate' },
    { label: 'Enterprise Clients', value: '500+', description: 'Fortune 1000 companies' }
  ];

  const testimonials = [
    {
      quote: "Cloud AcceleratorsAI reduced our cloud migration timeline from 18 months to 3 months, saving us $2.4M in consulting fees.",
      author: "Sarah Chen",
      title: "CTO",
      company: "TechFlow Solutions",
      avatar: "SC",
      impact: "$2.4M saved",
      metrics: "85% faster deployment"
    },
    {
      quote: "The AI-powered recommendations were spot-on. We achieved 99.9% uptime during our entire infrastructure modernization.",
      author: "Michael Rodriguez",
      title: "VP of Engineering", 
      company: "DataCore Industries",
      avatar: "MR",
      impact: "99.9% uptime",
      metrics: "Zero critical incidents"
    },
    {
      quote: "Incredible platform. The accelerator marketplace had everything we needed for our security compliance project.",
      author: "Jennifer Kim",
      title: "Chief Security Officer",
      company: "FinSecure Corp",
      avatar: "JK",
      impact: "SOC 2 compliant",
      metrics: "3 weeks early delivery"
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Get started with AI-powered cloud readiness',
      features: [
        '1x AI-generated Cloud Readiness Roadmap',
        'Basic architecture assessment',
        'Community forum access',
        'Self-service onboarding',
        'Email support'
      ],
      popular: false,
      cta: 'Start Free Assessment'
    },
    {
      name: 'Starter',
      price: '$500',
      period: '/month',
      description: 'Essential tools for growing teams',
      features: [
        '1 accelerator at a time',
        'AI-generated playbooks',
        'Compliance checklist lite',
        'Basic cost forecasting',
        'Email & chat support'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Growth',
      price: '$1,500',
      period: '/month', 
      description: 'Advanced AI insights and automation',
      features: [
        'Up to 3 accelerators',
        'AI Architecture Reviewer',
        'Business KPI Translator',
        'Advanced cost forecasting',
        'Industry compliance checklists',
        'Priority support'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Scale',
      price: '$3,000',
      period: '/month',
      description: 'Enterprise-grade self-service platform',
      features: [
        'Unlimited accelerators',
        'Full compliance suite (all industries)',
        'AI training modules with video',
        'API & SSO integrations',
        'Advanced analytics dashboard',
        'Phone support'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$5,000+',
      period: '/month',
      description: 'White-label with dedicated success',
      features: [
        'White-label SaaS platform',
        'Dedicated support SLA',
        'Custom accelerators built for you',
        'Private cloud deployment',
        'Success manager assigned',
        '24/7 premium support'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="relative">
      {/* Navigation Header */}
      <nav className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 group cursor-pointer">
                {/* Animated background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-lg animate-float"></div>
                
                {/* Main logo container */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {/* AI Circuit pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  {/* Dynamic icon stack */}
                  <div className="relative z-10 flex items-center justify-center">
                    <Brain className="w-3 h-3 text-cyan-300 absolute animate-pulse" />
                    <Rocket className="w-5 h-5 text-white relative" />
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight">Cloud AcceleratorsAI</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">AI-Powered Cloud Solutions</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Pricing</a>
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                View Demo
              </Button>
              <Button onClick={onStartDemo} className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-slate-200 dark:border-slate-700">
              <div className="space-y-4">
                <a href="#features" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
                <a href="#testimonials" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Testimonials</a>
                <a href="#pricing" className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Pricing</a>
                <div className="space-y-3 pt-4">
                  <Button variant="outline" className="w-full" onClick={() => onNavigate('dashboard')}>
                    View Demo
                  </Button>
                  <Button onClick={onStartDemo} className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Enterprise Acceleration
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Enterprise-Grade
                <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text animate-gradient">
                  AI Cloud Acceleration
                </span>
                <span className="block">at SMB Prices</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Get enterprise cloud acceleration outcomes at a fraction of traditional consulting costs. 
                Our AI-powered platform analyzes, plans, and executes cloud transformations in 90 days, not 9+ months.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={onStartDemo}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('dashboard')}
                className="text-lg px-8 py-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
              >
                View Live Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              AI-Powered Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Everything you need to accelerate your enterprise cloud transformation with intelligent automation and proven AI methodologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Feature tabs */}
            <div className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isSelected = selectedFeature === feature.id;
                
                return (
                  <Card
                    key={feature.id}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white dark:bg-slate-800 shadow-lg border-blue-200 dark:border-blue-800 scale-105' 
                        : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md'
                    }`}
                    onClick={() => setSelectedFeature(feature.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {feature.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="space-y-2">
                          {feature.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="text-slate-700 dark:text-slate-300 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}></div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Demo screenshot */}
            <div className="sticky top-8">
              <Card className="p-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg overflow-hidden">
                    {/* Mock interface based on selected feature */}
                    <div className="h-full p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Rocket className="w-4 h-4 text-white" />
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {features.find(f => f.id === selectedFeature)?.name}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      {selectedFeature === 'discovery' && (
                        <div className="space-y-4">
                          <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4 animate-pulse"></div>
                          <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/2 animate-pulse"></div>
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="h-16 bg-blue-100 dark:bg-blue-900 rounded-lg"></div>
                            <div className="h-16 bg-emerald-100 dark:bg-emerald-900 rounded-lg"></div>
                            <div className="h-16 bg-amber-100 dark:bg-amber-900 rounded-lg"></div>
                          </div>
                        </div>
                      )}
                      
                      {selectedFeature === 'sprints' && (
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded flex-1"></div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {selectedFeature === 'marketplace' && (
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-2"></div>
                              <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                              <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-2/3 mt-1"></div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {selectedFeature === 'analytics' && (
                        <div className="space-y-4">
                          <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg"></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg"></div>
                            <div className="h-20 bg-amber-100 dark:bg-amber-900/50 rounded-lg"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="text-center mt-6">
                <Button 
                  onClick={() => onNavigate('dashboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Try This Feature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              See how enterprises are achieving remarkable results with our acceleration platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Quote className="w-8 h-8 text-blue-600" />
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{testimonial.impact}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{testimonial.metrics}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion-Optimized Pricing Section */}
      <ConversionPricingTable />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Accelerate Your Enterprise?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join 500+ enterprises who have transformed their infrastructure with our AI-powered acceleration platform. 
              Get started today and see results in 90 days.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={onStartDemo}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('discovery')}
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Schedule Demo Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">14 Days</div>
                <div className="text-blue-200 text-sm">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">No Risk</div>
                <div className="text-blue-200 text-sm">Cancel Anytime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-200 text-sm">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <div className="font-bold text-white">EBA Platform</div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Enterprise-grade cloud acceleration at SMB prices. Transform your infrastructure in 90 days.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Product</div>
              <div className="space-y-2">
                <a href="#features" className="block text-slate-400 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-slate-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">API</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Company</div>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Support</div>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Community</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Status</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 EBA Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}