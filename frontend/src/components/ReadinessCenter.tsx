import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle,
  Circle,
  AlertCircle,
  Clock,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  FileText,
  Download,
  Play,
  ChevronRight,
  Shield,
  Building,
  Users,
  Zap,
  Lightbulb,
  MapPin,
  Calendar,
  Star,
  RefreshCw,
  Search
} from 'lucide-react';

// Mock data for assessments
const assessments = [
  {
    id: 'tokenization_fundamentals',
    title: 'Tokenization Fundamentals',
    description: 'Core concepts and infrastructure requirements',
    category: 'Foundation',
    duration: '15 mins',
    difficulty: 'Beginner',
    progress: 100,
    status: 'completed',
    score: 92,
    lastCompleted: '2024-09-01',
    sections: [
      { name: 'Asset Tokenization Basics', completed: true, score: 95 },
      { name: 'Blockchain Infrastructure', completed: true, score: 88 },
      { name: 'Smart Contract Fundamentals', completed: true, score: 93 }
    ]
  },
  {
    id: 'regulatory_compliance',
    title: 'Regulatory Compliance Framework',
    description: 'SEC, FINRA, and DTCC compliance requirements',
    category: 'Compliance',
    duration: '25 mins',
    difficulty: 'Intermediate',
    progress: 65,
    status: 'in_progress',
    score: null,
    lastCompleted: null,
    sections: [
      { name: 'SEC Security Token Rules', completed: true, score: 87 },
      { name: 'FINRA Reporting Requirements', completed: true, score: 91 },
      { name: 'DTCC Settlement Protocols', completed: false, score: null },
      { name: 'Cross-Border Regulations', completed: false, score: null }
    ]
  },
  {
    id: 'technical_implementation',
    title: 'Technical Implementation Readiness',
    description: 'Architecture, security, and integration assessment',
    category: 'Technical',
    duration: '35 mins',
    difficulty: 'Advanced',
    progress: 0,
    status: 'not_started',
    score: null,
    lastCompleted: null,
    sections: [
      { name: 'System Architecture Review', completed: false, score: null },
      { name: 'Security & Custody Implementation', completed: false, score: null },
      { name: 'API Integration Testing', completed: false, score: null },
      { name: 'Scalability & Performance', completed: false, score: null },
      { name: 'Disaster Recovery Planning', completed: false, score: null }
    ]
  }
];

const checklists = [
  {
    id: 'pre_launch',
    title: 'Pre-Launch Checklist',
    description: 'Essential steps before going live with tokenized securities',
    category: 'Launch',
    totalItems: 24,
    completedItems: 18,
    lastUpdated: '2024-09-05',
    priority: 'high',
    items: [
      { id: 1, text: 'Legal framework review completed', completed: true, critical: true },
      { id: 2, text: 'Regulatory approvals obtained', completed: true, critical: true },
      { id: 3, text: 'Custody solution implemented', completed: true, critical: true },
      { id: 4, text: 'Smart contracts audited', completed: true, critical: true },
      { id: 5, text: 'KYC/AML procedures documented', completed: true, critical: false },
      { id: 6, text: 'Investor accreditation process defined', completed: true, critical: false },
      { id: 7, text: 'Trading infrastructure tested', completed: false, critical: true },
      { id: 8, text: 'Settlement workflows verified', completed: false, critical: true },
      { id: 9, text: 'Risk management protocols active', completed: false, critical: true }
    ]
  },
  {
    id: 'compliance_ongoing',
    title: 'Ongoing Compliance Checklist',
    description: 'Monthly compliance requirements and monitoring',
    category: 'Compliance',
    totalItems: 16,
    completedItems: 12,
    lastUpdated: '2024-09-08',
    priority: 'medium',
    items: [
      { id: 1, text: 'Monthly regulatory reporting submitted', completed: true, critical: true },
      { id: 2, text: 'Investor records updated', completed: true, critical: false },
      { id: 3, text: 'Transaction audit trails verified', completed: true, critical: true },
      { id: 4, text: 'Compliance training completed', completed: false, critical: false }
    ]
  }
];

const recommendations = [
  {
    id: 'security_enhancement',
    title: 'Enhanced Security Protocols',
    description: 'Implement multi-signature custody and advanced monitoring',
    priority: 'high',
    impact: 'high',
    effort: 'medium',
    category: 'Security',
    timeframe: '2-4 weeks',
    benefits: ['Reduced custody risk', 'Enhanced investor confidence', 'Regulatory compliance'],
    steps: [
      'Deploy multi-signature wallet infrastructure',
      'Implement real-time transaction monitoring',
      'Set up automated alert systems',
      'Conduct security penetration testing'
    ]
  },
  {
    id: 'automation_upgrade',
    title: 'Compliance Automation Suite',
    description: 'Automate regulatory reporting and KYC processes',
    priority: 'medium',
    impact: 'high',
    effort: 'high',
    category: 'Automation',
    timeframe: '6-8 weeks',
    benefits: ['Reduced manual errors', 'Faster processing', 'Cost savings'],
    steps: [
      'Integrate automated KYC verification',
      'Set up regulatory reporting workflows',
      'Implement automated compliance checks',
      'Deploy monitoring dashboards'
    ]
  },
  {
    id: 'investor_portal',
    title: 'Self-Service Investor Portal',
    description: 'Enable investors to view holdings and transaction history',
    priority: 'low',
    impact: 'medium',
    effort: 'low',
    category: 'User Experience',
    timeframe: '3-4 weeks',
    benefits: ['Improved investor satisfaction', 'Reduced support overhead', 'Enhanced transparency'],
    steps: [
      'Design investor dashboard interface',
      'Implement secure authentication',
      'Build portfolio visualization',
      'Add transaction history views'
    ]
  }
];

export default function ReadinessCenter() {
  const [activeTab, setActiveTab] = useState('assessments');
  const [selectedAssessment, setSelectedAssessment] = useState(assessments[0]);
  const [selectedChecklist, setSelectedChecklist] = useState(checklists[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'not_started': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const overallProgress = Math.round(
    assessments.reduce((acc, assessment) => acc + assessment.progress, 0) / assessments.length
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Readiness Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Guided assessments, checklists, and personalized recommendations for tokenized securities implementation
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
            <Target className="w-4 h-4 mr-1" />
            {overallProgress}% Ready
          </Badge>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Assessments</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {checklists.reduce((acc, checklist) => acc + checklist.completedItems, 0)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tasks Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {recommendations.filter(r => r.priority === 'high').length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">High Priority Recs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">92%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Score</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full lg:w-auto">
          <TabsTrigger value="assessments" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Assessments</span>
          </TabsTrigger>
          <TabsTrigger value="checklists" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Checklists</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Recommendations</span>
          </TabsTrigger>
        </TabsList>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Assessment List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Available Assessments
              </h3>
              
              {assessments.map((assessment) => (
                <Card 
                  key={assessment.id} 
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedAssessment.id === assessment.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : ''
                  }`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-slate-500">{assessment.duration}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {assessment.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {assessment.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-medium">{assessment.progress}%</span>
                      </div>
                      <Progress value={assessment.progress} className="h-2" />
                    </div>
                    
                    {assessment.score && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Score: {assessment.score}%
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Assessment Details */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {selectedAssessment.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {selectedAssessment.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{selectedAssessment.category}</Badge>
                      <Badge variant="outline">{selectedAssessment.difficulty}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                      <p className="font-semibold">{selectedAssessment.duration}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <TrendingUp className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">Progress</p>
                      <p className="font-semibold">{selectedAssessment.progress}%</p>
                    </div>
                    
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Award className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">Score</p>
                      <p className="font-semibold">
                        {selectedAssessment.score ? `${selectedAssessment.score}%` : 'Not completed'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Assessment Sections
                    </h4>
                    
                    <div className="space-y-3">
                      {selectedAssessment.sections.map((section, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {section.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                            <span className="text-slate-900 dark:text-slate-100">
                              {section.name}
                            </span>
                          </div>
                          
                          {section.score && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              {section.score}%
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                    
                    {selectedAssessment.status === 'completed' ? (
                      <Button>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retake Assessment
                      </Button>
                    ) : (
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        {selectedAssessment.status === 'not_started' ? 'Start Assessment' : 'Continue Assessment'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Checklists Tab */}
        <TabsContent value="checklists" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Checklist Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Active Checklists
              </h3>
              
              {checklists.map((checklist) => (
                <Card 
                  key={checklist.id} 
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedChecklist.id === checklist.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : ''
                  }`}
                  onClick={() => setSelectedChecklist(checklist)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(checklist.priority)}>
                        {checklist.priority} priority
                      </Badge>
                      <Badge variant="outline">{checklist.category}</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {checklist.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {checklist.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-medium">
                          {checklist.completedItems}/{checklist.totalItems}
                        </span>
                      </div>
                      <Progress 
                        value={(checklist.completedItems / checklist.totalItems) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Checklist Details */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {selectedChecklist.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {selectedChecklist.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {Math.round((selectedChecklist.completedItems / selectedChecklist.totalItems) * 100)}%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedChecklist.completedItems} of {selectedChecklist.totalItems} complete
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedChecklist.items.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                          item.completed 
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" />
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <span className={`${
                              item.completed 
                                ? 'text-green-700 dark:text-green-300' 
                                : 'text-slate-900 dark:text-slate-100'
                            }`}>
                              {item.text}
                            </span>
                            {item.critical && (
                              <Badge variant="destructive" className="text-xs">
                                Critical
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {!item.completed && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Checklist
                    </Button>
                    
                    <Button>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Status
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {recommendation.title}
                        </h3>
                        <Badge className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority} priority
                        </Badge>
                        <Badge variant="outline">{recommendation.category}</Badge>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {recommendation.description}
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Impact: {recommendation.impact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <span className="text-sm">Effort: {recommendation.effort}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Timeline: {recommendation.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Expected Benefits
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Implementation Steps
                      </h4>
                      <ol className="space-y-2">
                        {recommendation.steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 text-xs rounded-full flex items-center justify-center mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        Schedule Implementation
                      </Button>
                      <Button>
                        <ChevronRight className="w-4 h-4 mr-2" />
                        Start Implementation
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}