import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Search,
  Filter,
  Star,
  Download,
  Clock,
  DollarSign,
  Users,
  Shield,
  Cloud,
  Database,
  Code,
  Monitor,
  Zap,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  Eye,
  Heart,
  BarChart3,
  Globe,
  Lock,
  Settings,
  Rocket,
  Brain
} from "lucide-react";

interface Accelerator {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  provider: string;
  rating: number;
  reviews: number;
  downloads: number;
  estimatedSavings: string;
  implementationTime: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  price: 'Free' | 'Premium' | 'Enterprise';
  tags: string[];
  icon: string;
  features: string[];
  outcomes: string[];
  requirements: string[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    savings: string;
  };
}

export default function AcceleratorMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);

  const accelerators: Accelerator[] = [
    {
      id: 'aws-migration',
      name: 'AWS Migration Accelerator',
      category: 'Cloud Migration',
      description: 'Complete end-to-end AWS migration framework with automated tools and best practices.',
      fullDescription: 'A comprehensive migration accelerator that includes automated discovery, assessment, planning, and execution tools. Features include database migration utilities, application containerization, network configuration templates, and post-migration optimization recommendations.',
      provider: 'EBA Cloud Solutions',
      rating: 4.8,
      reviews: 342,
      downloads: 1247,
      estimatedSavings: '$180K annually',
      implementationTime: '6-8 weeks',
      complexity: 'Intermediate',
      price: 'Premium',
      tags: ['AWS', 'Cloud Migration', 'Infrastructure', 'Cost Optimization'],
      icon: '☁️',
      features: [
        'Automated discovery and assessment tools',
        'Pre-configured VPC and security templates',
        'Database migration with minimal downtime',
        'Application containerization toolkit',
        'Cost optimization recommendations',
        'Compliance and security framework',
        '24/7 migration support'
      ],
      outcomes: [
        '60% reduction in infrastructure costs',
        '99.9% uptime during migration',
        '3x faster deployment cycles',
        'Improved security posture',
        'Enhanced scalability and performance'
      ],
      requirements: [
        'AWS account with appropriate permissions',
        'Current infrastructure documentation',
        'Dedicated migration team (3-5 members)',
        'Network connectivity assessment',
        'Application dependency mapping'
      ],
      testimonial: {
        quote: "The AWS Migration Accelerator reduced our migration time from 6 months to 6 weeks. The automated tools and templates were game-changers.",
        author: "Sarah Johnson",
        company: "TechFlow Inc.",
        savings: "$240K saved in first year"
      }
    },
    {
      id: 'devops-pipeline',
      name: 'DevOps Pipeline Accelerator',
      category: 'DevOps',
      description: 'Enterprise-grade CI/CD pipeline setup with automated testing, deployment, and monitoring.',
      fullDescription: 'A complete DevOps transformation package that establishes modern CI/CD pipelines, automated testing frameworks, infrastructure as code, and comprehensive monitoring. Includes templates for multiple technology stacks and deployment strategies.',
      provider: 'DevOps Masters',
      rating: 4.9,
      reviews: 287,
      downloads: 892,
      estimatedSavings: '$150K annually',
      implementationTime: '4-6 weeks',
      complexity: 'Advanced',
      price: 'Premium',
      tags: ['CI/CD', 'DevOps', 'Automation', 'Monitoring'],
      icon: '🚀',
      features: [
        'Multi-branch CI/CD pipeline templates',
        'Automated testing framework integration',
        'Infrastructure as Code (IaC) templates',
        'Container orchestration setup',
        'Automated security scanning',
        'Performance monitoring dashboard',
        'Rollback and blue-green deployment'
      ],
      outcomes: [
        '70% faster deployment cycles',
        '90% reduction in deployment errors',
        'Improved code quality and security',
        'Enhanced team collaboration',
        'Reduced manual intervention'
      ],
      requirements: [
        'Git repository access',
        'CI/CD platform (Jenkins, GitLab, etc.)',
        'Container platform (Docker, Kubernetes)',
        'Cloud or on-premise infrastructure',
        'Development team training'
      ]
    },
    {
      id: 'security-framework',
      name: 'Zero-Trust Security Framework',
      category: 'Security',
      description: 'Comprehensive zero-trust security implementation with automated compliance monitoring.',
      fullDescription: 'A complete zero-trust security framework that implements identity verification, network segmentation, continuous monitoring, and automated compliance reporting. Designed for enterprise environments with strict security requirements.',
      provider: 'SecureOps Pro',
      rating: 4.7,
      reviews: 198,
      downloads: 456,
      estimatedSavings: '$300K annually',
      implementationTime: '8-12 weeks',
      complexity: 'Advanced',
      price: 'Enterprise',
      tags: ['Security', 'Zero-Trust', 'Compliance', 'IAM'],
      icon: '🔒',
      features: [
        'Identity and access management (IAM)',
        'Network micro-segmentation',
        'Continuous security monitoring',
        'Automated threat detection',
        'Compliance reporting automation',
        'Security incident response workflows',
        'Multi-factor authentication setup'
      ],
      outcomes: [
        '95% reduction in security incidents',
        'Automated compliance reporting',
        'Enhanced data protection',
        'Improved audit readiness',
        'Reduced security management overhead'
      ],
      requirements: [
        'Current security assessment',
        'Identity provider integration',
        'Network infrastructure access',
        'Security team training',
        'Compliance framework alignment'
      ],
      testimonial: {
        quote: "Our security posture improved dramatically. The automated compliance reporting alone saves us 20 hours per week.",
        author: "Michael Chen",
        company: "FinSecure Corp",
        savings: "$400K in compliance costs avoided"
      }
    },
    {
      id: 'database-modernization',
      name: 'Database Modernization Suite',
      category: 'Data & Analytics',
      description: 'Modernize legacy databases with automated migration, optimization, and monitoring tools.',
      fullDescription: 'A comprehensive database modernization solution that handles migration from legacy systems to modern cloud-native databases, includes performance optimization tools, automated backup strategies, and real-time monitoring dashboards.',
      provider: 'DataFlow Technologies',
      rating: 4.6,
      reviews: 124,
      downloads: 278,
      estimatedSavings: '$120K annually',
      implementationTime: '6-10 weeks',
      complexity: 'Intermediate',
      price: 'Premium',
      tags: ['Database', 'Migration', 'Performance', 'Analytics'],
      icon: '🗄️',
      features: [
        'Automated database assessment',
        'Schema and data migration tools',
        'Performance optimization recommendations',
        'Backup and disaster recovery setup',
        'Real-time monitoring dashboard',
        'Query optimization analysis',
        'Data governance framework'
      ],
      outcomes: [
        '50% improvement in query performance',
        '99.99% data integrity during migration',
        'Reduced maintenance overhead',
        'Enhanced scalability',
        'Improved disaster recovery'
      ],
      requirements: [
        'Database access and credentials',
        'Current schema documentation',
        'Performance baseline metrics',
        'Backup storage configuration',
        'Database administrator involvement'
      ]
    },
    {
      id: 'kubernetes-setup',
      name: 'Kubernetes Enterprise Setup',
      category: 'Container Orchestration',
      description: 'Production-ready Kubernetes cluster setup with monitoring, security, and scaling.',
      fullDescription: 'A complete Kubernetes deployment solution for enterprise environments, including cluster setup, security hardening, monitoring integration, auto-scaling configuration, and disaster recovery planning.',
      provider: 'Container Solutions Pro',
      rating: 4.5,
      reviews: 156,
      downloads: 334,
      estimatedSavings: '$90K annually',
      implementationTime: '4-6 weeks',
      complexity: 'Advanced',
      price: 'Premium',
      tags: ['Kubernetes', 'Containers', 'Orchestration', 'Scaling'],
      icon: '⚙️',
      features: [
        'Multi-node cluster configuration',
        'Security hardening and RBAC setup',
        'Ingress controller configuration',
        'Horizontal pod autoscaling',
        'Monitoring and logging integration',
        'Backup and disaster recovery',
        'Service mesh integration'
      ],
      outcomes: [
        '80% improvement in resource utilization',
        'Simplified application deployment',
        'Enhanced scalability and reliability',
        'Reduced infrastructure costs',
        'Improved development velocity'
      ],
      requirements: [
        'Infrastructure provisioning access',
        'Container registry setup',
        'Network configuration',
        'Monitoring platform',
        'DevOps team training'
      ]
    },
    {
      id: 'monitoring-observability',
      name: 'Enterprise Monitoring & Observability',
      category: 'Monitoring',
      description: 'Comprehensive monitoring solution with alerting, dashboards, and performance analytics.',
      fullDescription: 'A complete observability platform that provides real-time monitoring, custom dashboards, intelligent alerting, performance analytics, and business metrics tracking across your entire infrastructure and application stack.',
      provider: 'ObserveTech Solutions',
      rating: 4.8,
      reviews: 89,
      downloads: 167,
      estimatedSavings: '$80K annually',
      implementationTime: '3-4 weeks',
      complexity: 'Beginner',
      price: 'Free',
      tags: ['Monitoring', 'Observability', 'Analytics', 'Alerting'],
      icon: '📊',
      features: [
        'Real-time infrastructure monitoring',
        'Application performance monitoring',
        'Custom dashboard creation',
        'Intelligent alerting system',
        'Log aggregation and analysis',
        'Business metrics tracking',
        'SLA and SLO monitoring'
      ],
      outcomes: [
        '90% faster issue detection',
        'Reduced mean time to resolution',
        'Improved system reliability',
        'Enhanced user experience',
        'Data-driven decision making'
      ],
      requirements: [
        'Monitoring agent deployment',
        'Application instrumentation',
        'Alert notification setup',
        'Dashboard configuration',
        'Team training on tools'
      ]
    }
  ];

  const categories = [
    'all',
    'Cloud Migration',
    'DevOps',
    'Security',
    'Data & Analytics',
    'Container Orchestration',
    'Monitoring'
  ];

  const filteredAccelerators = accelerators.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || acc.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'all' || acc.complexity === selectedComplexity;
    const matchesPrice = selectedPrice === 'all' || acc.price === selectedPrice;

    return matchesSearch && matchesCategory && matchesComplexity && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const renderAcceleratorCard = (accelerator: Accelerator) => (
    <Card key={accelerator.id} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">{accelerator.icon}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                  {accelerator.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {accelerator.category}
                </Badge>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {accelerator.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{accelerator.rating}</span>
                  <span>({accelerator.reviews})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{accelerator.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{accelerator.implementationTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <Badge className={`${
              accelerator.price === 'Free' ? 'bg-green-100 text-green-700 border-green-200' :
              accelerator.price === 'Premium' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              'bg-purple-100 text-purple-700 border-purple-200'
            }`}>
              {accelerator.price}
            </Badge>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {accelerator.provider}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {accelerator.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-center">
            <DollarSign className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
            <div className="text-sm text-slate-600 dark:text-slate-400">Est. Savings</div>
            <div className="font-semibold text-emerald-600">{accelerator.estimatedSavings}</div>
          </div>
          <div className="text-center">
            <Target className="w-5 h-5 mx-auto text-blue-600 mb-1" />
            <div className="text-sm text-slate-600 dark:text-slate-400">Complexity</div>
            <div className={`font-semibold ${
              accelerator.complexity === 'Beginner' ? 'text-green-600' :
              accelerator.complexity === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {accelerator.complexity}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setSelectedAccelerator(accelerator)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Deploy Now
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderAcceleratorDetails = () => {
    if (!selectedAccelerator) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
        <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
          <div className="p-8 space-y-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">{selectedAccelerator.icon}</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedAccelerator.name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{selectedAccelerator.category}</Badge>
                    <Badge className={`${
                      selectedAccelerator.price === 'Free' ? 'bg-green-100 text-green-700 border-green-200' :
                      selectedAccelerator.price === 'Premium' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {selectedAccelerator.price}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    by {selectedAccelerator.provider}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSelectedAccelerator(null)}
                className="text-slate-600 hover:text-slate-900"
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto text-yellow-500 fill-current mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedAccelerator.rating}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedAccelerator.reviews} reviews
                </div>
              </div>
              
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedAccelerator.downloads.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">downloads</div>
              </div>
              
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto text-emerald-600 mb-2" />
                <div className="text-2xl font-bold text-emerald-600">
                  {selectedAccelerator.estimatedSavings}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">est. savings</div>
              </div>
              
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedAccelerator.implementationTime}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">timeline</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Description
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedAccelerator.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedAccelerator.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Expected Outcomes
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedAccelerator.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Requirements
                </h3>
                <div className="space-y-2">
                  {selectedAccelerator.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700 dark:text-slate-300">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedAccelerator.testimonial && (
                <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Success Story</span>
                    </div>
                    <blockquote className="text-slate-700 dark:text-slate-300 italic">
                      "{selectedAccelerator.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {selectedAccelerator.testimonial.author}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedAccelerator.testimonial.company}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">
                          {selectedAccelerator.testimonial.savings}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          First year impact
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Accelerator
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen p-8">
      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Accelerator Marketplace
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover and deploy enterprise-grade acceleration solutions. Over 200+ proven accelerators available.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accelerators, features, or technologies..."
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger>
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {filteredAccelerators.length} accelerators found
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Filter className="w-4 h-4" />
              <span>Sorted by {sortBy}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredAccelerators.map(renderAcceleratorCard)}
          </div>
        </div>

        {/* Accelerator Details Modal */}
        {renderAcceleratorDetails()}
      </div>
    </div>
  );
}