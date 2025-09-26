import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText,
  Download,
  Eye,
  Edit,
  Share,
  Copy,
  Mail,
  Presentation,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Zap,
  Building,
  Globe,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Settings,
  Layout,
  Palette,
  Type,
  Image as ImageIcon,
  Sparkles,
  Send,
  CheckCircle,
  Play
} from 'lucide-react';

// Mock data for templates and communications
const templates = [
  {
    id: 'monthly_newsletter',
    name: 'Monthly Performance Newsletter',
    description: 'Comprehensive monthly update with portfolio performance and market insights',
    category: 'Newsletter',
    format: 'Email/PDF',
    lastUsed: '2024-09-01',
    popularity: 95,
    preview: '/api/templates/monthly_newsletter_preview.jpg',
    sections: ['Executive Summary', 'Portfolio Performance', 'Market Analysis', 'Upcoming Events'],
    customizable: ['Colors', 'Logo', 'Data Sources', 'Content Sections']
  },
  {
    id: 'quarterly_report',
    name: 'Quarterly Investment Report',
    description: 'Detailed quarterly analysis with tokenization impact and projections',
    category: 'Report',
    format: 'PDF/Print',
    lastUsed: '2024-08-15',
    popularity: 88,
    preview: '/api/templates/quarterly_report_preview.jpg',
    sections: ['Performance Overview', 'Tokenization Benefits', 'Risk Analysis', 'Forward Outlook'],
    customizable: ['Branding', 'Charts', 'Metrics', 'Appendices']
  },
  {
    id: 'investor_onepager',
    name: 'Investor One-Pager',
    description: 'Concise one-page summary highlighting key metrics and opportunities',
    category: 'One-Pager',
    format: 'PDF/Digital',
    lastUsed: '2024-09-05',
    popularity: 92,
    preview: '/api/templates/onepager_preview.jpg',
    sections: ['Key Metrics', 'Investment Highlights', 'Market Position', 'Next Steps'],
    customizable: ['Layout', 'Colors', 'Data Points', 'CTA']
  },
  {
    id: 'pitch_deck',
    name: 'Tokenization Pitch Deck',
    description: 'Professional presentation deck for investor meetings and roadshows',
    category: 'Presentation',
    format: 'PowerPoint/PDF',
    lastUsed: '2024-08-28',
    popularity: 90,
    preview: '/api/templates/pitch_deck_preview.jpg',
    sections: ['Problem Statement', 'Solution Overview', 'Market Opportunity', 'Financial Projections'],
    customizable: ['Slides', 'Graphics', 'Data', 'Animations']
  }
];

const recentCommunications = [
  {
    id: 'comm_001',
    title: 'Q3 2024 Performance Update',
    type: 'Newsletter',
    status: 'Sent',
    recipients: 247,
    openRate: 78,
    clickRate: 24,
    generatedDate: '2024-09-01',
    template: 'monthly_newsletter',
    dataSource: 'Portfolio Analytics',
    preview: 'Strong Q3 performance with 15.3% returns driven by tokenized asset allocation...'
  },
  {
    id: 'comm_002',
    title: 'Tokenization Benefits Analysis',
    type: 'One-Pager',
    status: 'Draft',
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    generatedDate: '2024-09-08',
    template: 'investor_onepager',
    dataSource: 'Simulation Results',
    preview: 'Analysis shows 23% cost reduction and 40% faster settlement times through tokenization...'
  },
  {
    id: 'comm_003',
    title: 'Investor Presentation - September',
    type: 'Presentation',
    status: 'Ready',
    recipients: 12,
    openRate: 100,
    clickRate: 67,
    generatedDate: '2024-08-25',
    template: 'pitch_deck',
    dataSource: 'RegRadar Briefs + Analytics',
    preview: 'Comprehensive overview of tokenized securities strategy and implementation roadmap...'
  }
];

const dataSources = [
  {
    id: 'portfolio_analytics',
    name: 'Portfolio Analytics',
    description: 'Real-time portfolio performance data and metrics',
    type: 'ChainSim Data',
    lastSync: '2024-09-08 14:30',
    status: 'active',
    dataPoints: ['Returns', 'Risk Metrics', 'Asset Allocation', 'Performance Attribution']
  },
  {
    id: 'simulation_results',
    name: 'Simulation Results',
    description: 'Sandbox simulation outcomes and scenario testing data',
    type: 'ChainSim Data',
    lastSync: '2024-09-08 12:15',
    status: 'active',
    dataPoints: ['Settlement Times', 'Cost Analysis', 'Efficiency Gains', 'Risk Scenarios']
  },
  {
    id: 'regulatory_briefs',
    name: 'RegRadar Briefs',
    description: 'Latest regulatory updates and compliance insights',
    type: 'ChainSim Data',
    lastSync: '2024-09-08 09:00',
    status: 'active',
    dataPoints: ['Regulatory Changes', 'Compliance Impact', 'Industry Updates', 'Risk Alerts']
  },
  {
    id: 'market_data',
    name: 'Market Data Feed',
    description: 'External market data and benchmarks',
    type: 'External API',
    lastSync: '2024-09-08 16:00',
    status: 'active',
    dataPoints: ['Market Indices', 'Sector Performance', 'Volatility Metrics', 'Economic Indicators']
  }
];

export default function InvestorCommsGenerator() {
  const [activeTab, setActiveTab] = useState('generator');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedDataSources, setSelectedDataSources] = useState(['portfolio_analytics', 'simulation_results']);
  const [generationStep, setGenerationStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    for (let step = 1; step <= 4; step++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationStep(step);
    }
    setIsGenerating(false);
    setGenerationStep(1);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Newsletter': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Report': return 'bg-green-100 text-green-700 border-green-200';
      case 'One-Pager': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Presentation': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-700 border-green-200';
      case 'Ready': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Draft': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Investor Communication Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Transform simulations and briefs into professional client-ready communications
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
            <Sparkles className="w-4 h-4 mr-1" />
            AI-Powered
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">24</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Communications Sent</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">1,247</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Recipients</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">82%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Open Rate</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">34%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Click Rate</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full lg:w-auto">
          <TabsTrigger value="generator" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Generator</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center space-x-2">
            <Layout className="w-4 h-4" />
            <span>Templates</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Communications</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Step 1: Template Selection */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Select Template
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedTemplate.id === template.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100">
                              {template.name}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {template.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getCategoryColor(template.category)}>
                                {template.category}
                              </Badge>
                              <span className="text-xs text-slate-500">
                                {template.format}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Step 2: Data Sources */}
              <Card className="p-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Select Data Sources
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedDataSources.includes(source.id)
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                        onClick={() => {
                          if (selectedDataSources.includes(source.id)) {
                            setSelectedDataSources(selectedDataSources.filter(id => id !== source.id));
                          } else {
                            setSelectedDataSources([...selectedDataSources, source.id]);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                {source.name}
                              </h4>
                              {selectedDataSources.includes(source.id) && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {source.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {source.type}
                              </Badge>
                              <span className="text-xs text-slate-500">
                                Last sync: {new Date(source.lastSync).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Generation Area */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Generate Communication
                    </h3>
                    <Badge variant="outline">{selectedTemplate.format}</Badge>
                  </div>

                  {/* Template Preview */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <Layout className="w-5 h-5 text-slate-600" />
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedTemplate.name}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {selectedTemplate.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                          Included Sections
                        </h5>
                        <ul className="space-y-1">
                          {selectedTemplate.sections.map((section, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                {section}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                          Customizable Elements
                        </h5>
                        <ul className="space-y-1">
                          {selectedTemplate.customizable.map((element, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Settings className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                {element}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Selected Data Sources */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Selected Data Sources ({selectedDataSources.length})
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {dataSources
                        .filter(source => selectedDataSources.includes(source.id))
                        .map((source) => (
                          <div key={source.id} className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {source.name}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {source.dataPoints.slice(0, 2).map((point, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {point}
                                </Badge>
                              ))}
                              {source.dataPoints.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{source.dataPoints.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Generation Progress */}
                  {isGenerating && (
                    <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span className="font-medium text-blue-900 dark:text-blue-100">
                          Generating Communication...
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className={`flex items-center space-x-2 ${generationStep >= 1 ? 'text-green-700' : 'text-slate-500'}`}>
                          <CheckCircle className={`w-4 h-4 ${generationStep >= 1 ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className="text-sm">Processing data sources</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${generationStep >= 2 ? 'text-green-700' : 'text-slate-500'}`}>
                          <CheckCircle className={`w-4 h-4 ${generationStep >= 2 ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className="text-sm">Generating content</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${generationStep >= 3 ? 'text-green-700' : 'text-slate-500'}`}>
                          <CheckCircle className={`w-4 h-4 ${generationStep >= 3 ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className="text-sm">Applying template</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${generationStep >= 4 ? 'text-green-700' : 'text-slate-500'}`}>
                          <CheckCircle className={`w-4 h-4 ${generationStep >= 4 ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className="text-sm">Finalizing document</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Template
                    </Button>
                    
                    <Button 
                      onClick={handleGenerate}
                      disabled={selectedDataSources.length === 0 || isGenerating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Communication
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-slate-600">{template.popularity}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {template.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {template.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Format:</span>
                      <span className="font-medium">{template.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Last used:</span>
                      <span className="font-medium">{template.lastUsed}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="space-y-6">
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <Card key={comm.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {comm.title}
                      </h3>
                      <Badge className={getCategoryColor(comm.type)}>
                        {comm.type}
                      </Badge>
                      <Badge className={getStatusColor(comm.status)}>
                        {comm.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {comm.preview}
                    </p>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>{comm.recipients} recipients</span>
                      </div>
                      {comm.status === 'Sent' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <span>{comm.openRate}% open rate</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-slate-500" />
                            <span>{comm.clickRate}% click rate</span>
                          </div>
                        </>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>{comm.generatedDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {comm.status === 'Draft' && (
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Engagement Metrics
              </h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 mx-auto text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">Engagement analytics chart</p>
                  <p className="text-sm text-slate-500">Open rates, click rates, and response tracking</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Template Performance
              </h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-12 h-12 mx-auto text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">Template usage trends</p>
                  <p className="text-sm text-slate-500">Most popular templates and success rates</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Newsletter sent', time: '2 hours ago', recipients: 247, template: 'Monthly Performance' },
                { action: 'One-pager generated', time: '1 day ago', recipients: 0, template: 'Tokenization Benefits' },
                { action: 'Presentation created', time: '3 days ago', recipients: 12, template: 'Investor Pitch' },
                { action: 'Report exported', time: '5 days ago', recipients: 89, template: 'Quarterly Analysis' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {activity.action}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {activity.template} • {activity.recipients > 0 ? `${activity.recipients} recipients` : 'Draft'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}