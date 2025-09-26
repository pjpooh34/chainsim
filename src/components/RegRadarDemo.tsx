import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Radar,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  ExternalLink,
  Search,
  Filter,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Calendar,
  Building,
  Gavel,
  Globe,
  Zap,
  RefreshCw,
  Bell,
  Eye,
  Link as LinkIcon,
  Download,
  Share
} from 'lucide-react';

export default function RegRadarDemo() {
  const [selectedBrief, setSelectedBrief] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleExportReport = () => {
    console.log('Exporting regulatory report...');
    // Create a mock CSV export
    const csvContent = "Regulation,Organization,Priority,Status,Date\n" +
      "SEC T+1 Settlement Rules,SEC,High,Proposed,2024-01-15\n" +
      "FINRA Digital Asset Custody,FINRA,Medium,Final,2024-01-12\n";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regulatory-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAlerts = () => {
    console.log('Opening alert configuration...');
    alert('Alert configuration panel would open here in the full application.');
  };

  const handleSourceClick = (brief: any) => {
    console.log('Opening source for:', brief.title);
    // In a real app, this would open the actual source document
    window.open('https://sec.gov/rules/proposed', '_blank');
  };

  const handleShareClick = (brief: any) => {
    console.log('Sharing brief:', brief.title);
    if (navigator.share) {
      navigator.share({
        title: brief.title,
        text: brief.summary,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${brief.title} - ${brief.summary}\n\n${window.location.href}`);
      alert('Brief details copied to clipboard!');
    }
  };

  const regulatoryUpdates = [
    {
      id: 1,
      title: 'SEC Proposes New T+1 Settlement Rules for Digital Securities',
      organization: 'SEC',
      date: '2024-01-15',
      priority: 'high',
      status: 'proposed',
      category: 'settlement',
      impact: 'High impact on tokenized securities trading and settlement processes',
      summary: 'The Securities and Exchange Commission has proposed new rules requiring T+1 settlement for all digital securities transactions, significantly impacting current T+3 standards.',
      keyPoints: [
        'Mandatory T+1 settlement for all tokenized securities by Q4 2024',
        'Enhanced clearing and settlement infrastructure requirements',
        'New compliance frameworks for digital asset custodians',
        'Updated risk management protocols for shorter settlement cycles'
      ],
      sandboxTests: [
        'Test T+1 settlement scenarios in ChainSim Sandbox',
        'Validate compliance with new clearing requirements',
        'Simulate risk management protocols'
      ],
      implementationDate: '2024-10-01',
      commentPeriod: '2024-03-15'
    },
    {
      id: 2,
      title: 'FINRA Updates Digital Asset Custody Guidelines',
      organization: 'FINRA',
      date: '2024-01-12',
      priority: 'medium',
      status: 'final',
      category: 'custody',
      impact: 'Medium impact on custody requirements for tokenized assets',
      summary: 'FINRA has updated custody guidelines for digital assets, establishing new standards for qualified custodians handling tokenized securities.',
      keyPoints: [
        'New qualification requirements for digital asset custodians',
        'Enhanced segregation requirements for client assets',
        'Updated insurance and bonding requirements',
        'Regular audit and reporting obligations'
      ],
      sandboxTests: [
        'Test custody validation workflows',
        'Simulate segregation compliance checks',
        'Validate audit trail requirements'
      ],
      implementationDate: '2024-06-01',
      commentPeriod: null
    },
    {
      id: 3,
      title: 'DTCC Announces Blockchain Settlement Pilot Program',
      organization: 'DTCC',
      date: '2024-01-10',
      priority: 'medium',
      status: 'active',
      category: 'infrastructure',
      impact: 'Medium impact on settlement infrastructure and processes',
      summary: 'The Depository Trust & Clearing Corporation announces a pilot program for blockchain-based settlement of tokenized securities.',
      keyPoints: [
        'Pilot program for institutional blockchain settlement',
        'Integration with existing DTCC infrastructure',
        'Real-time settlement capability testing',
        'Interoperability with traditional settlement systems'
      ],
      sandboxTests: [
        'Test DTCC integration scenarios',
        'Simulate institutional settlement flows',
        'Validate interoperability protocols'
      ],
      implementationDate: '2024-08-15',
      commentPeriod: null
    },
    {
      id: 4,
      title: 'EU Markets in Crypto-Assets Regulation (MiCA) Updates',
      organization: 'EU Commission',
      date: '2024-01-08',
      priority: 'high',
      status: 'final',
      category: 'international',
      impact: 'High impact on EU operations and cross-border tokenized securities',
      summary: 'The European Union has published updated guidance on Markets in Crypto-Assets regulation affecting tokenized securities operations.',
      keyPoints: [
        'New licensing requirements for tokenized security issuers in EU',
        'Enhanced consumer protection measures',
        'Cross-border operational requirements',
        'Updated AML/KYC requirements for digital assets'
      ],
      sandboxTests: [
        'Test EU compliance scenarios',
        'Simulate cross-border trading restrictions',
        'Validate AML/KYC workflows for EU clients'
      ],
      implementationDate: '2024-07-01',
      commentPeriod: null
    },
    {
      id: 5,
      title: 'Fed Reserve Digital Dollar Pilot Impact Assessment',
      organization: 'Federal Reserve',
      date: '2024-01-05',
      priority: 'low',
      status: 'research',
      category: 'cbdc',
      impact: 'Potential future impact on tokenized securities settlement',
      summary: 'Federal Reserve publishes impact assessment for Central Bank Digital Currency (CBDC) pilot program and its effects on securities markets.',
      keyPoints: [
        'CBDC pilot program timeline and scope',
        'Potential impacts on existing payment systems',
        'Integration considerations for securities settlement',
        'Privacy and surveillance considerations'
      ],
      sandboxTests: [
        'Simulate CBDC payment integration',
        'Test hybrid settlement scenarios',
        'Validate privacy protection measures'
      ],
      implementationDate: 'TBD',
      commentPeriod: null
    }
  ];

  const compliancePlaybooks = [
    {
      title: 'T+1 Settlement Transition Guide',
      description: 'Step-by-step guide for transitioning to T+1 settlement requirements',
      steps: 12,
      estimatedTime: '4-6 weeks',
      difficulty: 'Medium',
      category: 'settlement'
    },
    {
      title: 'Digital Asset Custody Compliance',
      description: 'Complete compliance framework for digital asset custody operations',
      steps: 8,
      estimatedTime: '2-3 weeks',
      difficulty: 'High',
      category: 'custody'
    },
    {
      title: 'Cross-Border Trading Setup',
      description: 'International compliance requirements for tokenized securities',
      steps: 15,
      estimatedTime: '6-8 weeks',
      difficulty: 'High',
      category: 'international'
    },
    {
      title: 'AML/KYC for Digital Assets',
      description: 'Anti-money laundering and know-your-customer procedures',
      steps: 10,
      estimatedTime: '3-4 weeks',
      difficulty: 'Medium',
      category: 'compliance'
    }
  ];

  const filteredUpdates = regulatoryUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || update.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'proposed': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'active': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'research': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                  <Radar className="w-4 h-4 text-white dark:text-slate-900" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Regulatory Intelligence
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time regulatory monitoring with AI-powered analysis and compliance guidance
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-md border border-emerald-200 dark:border-emerald-800">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
              <Button variant="outline" size="sm" className="text-slate-600 dark:text-slate-400" onClick={handleAlerts}>
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">High Priority</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">5</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">127</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Tracked</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">98%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search regulations, organizations, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-800"
              >
                <option value="all">All Categories</option>
                <option value="settlement">Settlement</option>
                <option value="custody">Custody</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="international">International</option>
                <option value="cbdc">CBDC</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="updates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="updates">Regulatory Updates</TabsTrigger>
          <TabsTrigger value="playbooks">Compliance Playbooks</TabsTrigger>
          <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="updates" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Updates List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredUpdates.map((update) => (
                <Card 
                  key={update.id} 
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    selectedBrief?.id === update.id 
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-700' 
                      : 'bg-white/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800'
                  } backdrop-blur-sm`}
                  onClick={() => setSelectedBrief(update)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {update.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {update.summary}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <Badge className={getPriorityColor(update.priority)}>
                          {update.priority}
                        </Badge>
                        <Badge className={getStatusColor(update.status)}>
                          {update.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {update.organization}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(update.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="space-y-6">
              {selectedBrief ? (
                <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getPriorityColor(selectedBrief.priority)}>
                          {selectedBrief.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(selectedBrief.status)}>
                          {selectedBrief.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {selectedBrief.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <span>{selectedBrief.organization}</span>
                        <span>•</span>
                        <span>{new Date(selectedBrief.date).toLocaleDateString()}</span>
                      </div>
                      
                      <p className="text-slate-700 dark:text-slate-300">
                        {selectedBrief.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Key Points
                      </h4>
                      <ul className="space-y-2">
                        {selectedBrief.keyPoints.map((point: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                        <Zap className="w-4 h-4 text-blue-600 mr-2" />
                        Test in Sandbox
                      </h4>
                      <div className="space-y-2">
                        {selectedBrief.sandboxTests.map((test: string, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left"
                          >
                            <LinkIcon className="w-3 h-3 mr-2" />
                            {test}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Implementation:</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {selectedBrief.implementationDate}
                        </span>
                      </div>
                      
                      {selectedBrief.commentPeriod && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Comment Period:</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {selectedBrief.commentPeriod}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => handleSourceClick(selectedBrief)}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Source
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleShareClick(selectedBrief)}>
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="text-center text-slate-500 dark:text-slate-400">
                    <Radar className="w-12 h-12 mx-auto mb-4" />
                    <p>Select a regulatory update to view details</p>
                  </div>
                </Card>
              )}

              {/* AI Summary Card */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 backdrop-blur-sm border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">
                    AI Insights
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Trend Analysis:</strong> Regulatory focus is shifting toward faster settlement cycles and enhanced digital asset custody requirements.
                  </p>
                  
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Impact Prediction:</strong> Organizations should prioritize T+1 settlement preparation and custody infrastructure upgrades.
                  </p>
                  
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Recommendation:</strong> Begin sandbox testing of accelerated settlement scenarios now to ensure compliance readiness.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="playbooks" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {compliancePlaybooks.map((playbook, index) => (
              <Card key={index} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {playbook.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {playbook.description}
                      </p>
                    </div>
                    
                    <Badge className={`${
                      playbook.difficulty === 'High' 
                        ? 'bg-red-100 text-red-700 border-red-200' 
                        : 'bg-orange-100 text-orange-700 border-orange-200'
                    }`}>
                      {playbook.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {playbook.steps}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Steps</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {playbook.estimatedTime}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Est. Time</p>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Playbook
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Regulatory Trend Analysis
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Settlement Speed</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">↑ 85%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Focus on faster settlement</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Custody Requirements</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">↑ 72%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Enhanced custody standards</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">International Coordination</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">↑ 68%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Cross-border harmonization</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Compliance Readiness
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      T+1 Settlement Ready
                    </span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">98%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      Custody Compliance
                    </span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">74%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      EU MiCA Preparation
                    </span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">61%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      CBDC Integration
                    </span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700">25%</Badge>
                </div>
              </div>
              
              <Button className="w-full mt-6">
                <FileText className="w-4 h-4 mr-2" />
                Generate Compliance Report
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}