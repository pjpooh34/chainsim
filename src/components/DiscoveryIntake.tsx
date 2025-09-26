import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { 
  Brain,
  ChevronRight,
  ChevronLeft,
  Rocket,
  Shield,
  Cloud,
  Zap,
  Target,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Server,
  Database,
  Globe,
  Lock
} from "lucide-react";

interface DiscoveryQuestion {
  id: string;
  type: 'select' | 'multiselect' | 'text' | 'textarea' | 'number';
  question: string;
  description?: string;
  options?: string[];
  required: boolean;
  category: string;
}

interface DiscoveryResponse {
  questionId: string;
  answer: string | string[] | number;
}

export default function DiscoveryIntake() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<DiscoveryResponse[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const discoveryQuestions: DiscoveryQuestion[] = [
    // Business Overview
    {
      id: 'company-size',
      type: 'select',
      question: 'What is your company size?',
      description: 'This helps us understand your scale and complexity',
      options: ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'],
      required: true,
      category: 'Business'
    },
    {
      id: 'industry',
      type: 'select',
      question: 'What industry are you in?',
      description: 'Industry-specific accelerators available',
      options: ['Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Retail', 'Education', 'Other'],
      required: true,
      category: 'Business'
    },
    {
      id: 'revenue',
      type: 'select',
      question: 'What is your annual revenue range?',
      description: 'Helps determine ROI potential',
      options: ['Under $1M', '$1M-$5M', '$5M-$25M', '$25M-$100M', '$100M+'],
      required: true,
      category: 'Business'
    },
    
    // Current Infrastructure
    {
      id: 'cloud-provider',
      type: 'multiselect',
      question: 'Which cloud providers are you currently using?',
      description: 'Select all that apply',
      options: ['AWS', 'Microsoft Azure', 'Google Cloud', 'None (On-premise)', 'Other'],
      required: true,
      category: 'Infrastructure'
    },
    {
      id: 'cloud-maturity',
      type: 'select',
      question: 'How would you describe your cloud maturity?',
      description: 'This affects our acceleration approach',
      options: ['Just starting', 'Basic cloud usage', 'Intermediate', 'Advanced', 'Cloud-native'],
      required: true,
      category: 'Infrastructure'
    },
    {
      id: 'current-challenges',
      type: 'multiselect',
      question: 'What are your biggest infrastructure challenges?',
      description: 'Select your top 3 challenges',
      options: [
        'High operational costs',
        'Slow deployment cycles',
        'Security vulnerabilities',
        'Poor system reliability',
        'Lack of automation',
        'Compliance requirements',
        'Scalability issues',
        'Team skill gaps'
      ],
      required: true,
      category: 'Infrastructure'
    },

    // Goals and Objectives
    {
      id: 'primary-goals',
      type: 'multiselect',
      question: 'What are your primary objectives for the next 12 months?',
      description: 'Select your top priorities',
      options: [
        'Reduce operational costs',
        'Improve system performance',
        'Enhance security posture',
        'Accelerate time-to-market',
        'Improve scalability',
        'Achieve compliance',
        'Modernize applications',
        'Improve team productivity'
      ],
      required: true,
      category: 'Goals'
    },
    {
      id: 'timeline',
      type: 'select',
      question: 'What is your desired timeline for achieving these goals?',
      description: 'Realistic timelines lead to better success',
      options: ['1-3 months', '3-6 months', '6-12 months', '12+ months'],
      required: true,
      category: 'Goals'
    },
    {
      id: 'budget-range',
      type: 'select',
      question: 'What is your budget range for acceleration initiatives?',
      description: 'Helps us recommend appropriate solutions',
      options: ['Under $50K', '$50K-$200K', '$200K-$500K', '$500K-$1M', '$1M+'],
      required: true,
      category: 'Goals'
    }
  ];

  const steps = [
    { title: 'Business Overview', description: 'Tell us about your company' },
    { title: 'Current State', description: 'Your infrastructure and challenges' },
    { title: 'Goals & Timeline', description: 'What you want to achieve' },
    { title: 'AI Analysis', description: 'Generating recommendations' }
  ];

  const getQuestionsForStep = (stepIndex: number) => {
    const categories = ['Business', 'Infrastructure', 'Goals'];
    return discoveryQuestions.filter(q => q.category === categories[stepIndex]);
  };

  const handleResponse = (questionId: string, answer: string | string[] | number) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, answer } : r);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const getResponse = (questionId: string) => {
    return responses.find(r => r.questionId === questionId)?.answer;
  };

  const canProceed = () => {
    const currentQuestions = getQuestionsForStep(currentStep);
    return currentQuestions.every(q => {
      const response = getResponse(q.id);
      return !q.required || (response !== undefined && response !== '');
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 2) {
        // Start AI analysis
        startAnalysis();
      }
    }
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = generateAnalysisResults();
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 4000);
  };

  const generateAnalysisResults = () => {
    const industryResponse = getResponse('industry') as string;
    const companySizeResponse = getResponse('company-size') as string;
    const challengesResponse = getResponse('current-challenges') as string[];
    const goalsResponse = getResponse('primary-goals') as string[];
    const cloudMaturityResponse = getResponse('cloud-maturity') as string;

    return {
      riskScore: 73,
      opportunityScore: 87,
      recommendations: [
        {
          category: 'Infrastructure Modernization',
          priority: 'High',
          impact: '$180K annual savings',
          timeline: '3-4 months',
          description: 'Migrate legacy applications to cloud-native architecture with automated scaling and deployment.',
          accelerators: ['AWS Migration Accelerator', 'Container Migration Kit', 'Database Modernization Suite']
        },
        {
          category: 'Security Enhancement',
          priority: 'Critical',
          impact: 'Risk reduction: 85%',
          timeline: '2-3 months',
          description: 'Implement zero-trust security framework with automated compliance monitoring.',
          accelerators: ['Security Compliance Framework', 'Zero-Trust Implementation', 'Automated Security Scanning']
        },
        {
          category: 'DevOps Acceleration',
          priority: 'Medium',
          impact: '60% faster deployments',
          timeline: '2-3 months',
          description: 'Establish CI/CD pipelines with automated testing and deployment workflows.',
          accelerators: ['DevOps Pipeline Setup', 'Automated Testing Suite', 'Deployment Automation']
        }
      ],
      metrics: {
        potentialSavings: '$450K',
        timeToValue: '90 days',
        riskMitigation: '85%',
        efficiencyGain: '65%'
      },
      nextSteps: [
        'Review detailed accelerator recommendations',
        'Schedule technical deep-dive session',
        'Begin with highest-priority accelerator',
        'Establish success metrics and monitoring'
      ]
    };
  };

  const renderQuestion = (question: DiscoveryQuestion) => {
    const response = getResponse(question.id);

    switch (question.type) {
      case 'select':
        return (
          <Select 
            value={response as string || ''} 
            onValueChange={(value) => handleResponse(question.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={(response as string[] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentSelections = (response as string[]) || [];
                    if (checked) {
                      handleResponse(question.id, [...currentSelections, option]);
                    } else {
                      handleResponse(question.id, currentSelections.filter(s => s !== option));
                    }
                  }}
                />
                <label 
                  htmlFor={`${question.id}-${option}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <Input
            value={response as string || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder="Enter your answer..."
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={response as string || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder="Enter your answer..."
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  const renderAnalysisStep = () => {
    if (isAnalyzing) {
      return (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
              <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping"></div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              AI Analysis in Progress
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our AI is analyzing your responses and matching them against our database of 200+ enterprise accelerators...
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={75} className="w-full max-w-md mx-auto" />
            <div className="flex justify-center space-x-8 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Business analysis complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Risk assessment complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating recommendations...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (analysisComplete && analysisResults) {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Analysis Complete
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We've identified key opportunities for acceleration
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-4 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {analysisResults.metrics.potentialSavings}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Potential Annual Savings
              </div>
            </Card>
            
            <Card className="p-4 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {analysisResults.metrics.timeToValue}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Time to Value
              </div>
            </Card>

            <Card className="p-4 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {analysisResults.metrics.riskMitigation}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Risk Mitigation
              </div>
            </Card>

            <Card className="p-4 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {analysisResults.metrics.efficiencyGain}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Efficiency Gain
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Recommended Accelerators
            </h4>
            
            {analysisResults.recommendations.map((rec: any, index: number) => (
              <Card key={index} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-semibold text-slate-900 dark:text-slate-100">
                        {rec.category}
                      </h5>
                      <Badge className={`${
                        rec.priority === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                        rec.priority === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {rec.description}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">
                      {rec.impact}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Timeline: {rec.timeline}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Available Accelerators:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.accelerators.map((acc: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {acc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800/50">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Recommended Next Steps
            </h4>
            <div className="space-y-3">
              {analysisResults.nextSteps.map((step: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => {
                setCurrentStep(0);
                setResponses([]);
                setAnalysisComplete(false);
                setAnalysisResults(null);
              }}
            >
              Start New Assessment
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Rocket className="w-4 h-4 mr-2" />
              Launch Accelerators
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen p-8">
      <div className="relative max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            AI-Powered Discovery
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our AI will analyze your responses to create a personalized acceleration roadmap tailored to your business needs.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-px mx-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 min-h-[500px]">
          {currentStep < 3 ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {steps[currentStep].title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="space-y-6">
                {getQuestionsForStep(currentStep).map((question) => (
                  <div key={question.id} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {question.question}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {question.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {question.description}
                        </p>
                      )}
                    </div>
                    {renderQuestion(question)}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep === 2 ? 'Start Analysis' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            renderAnalysisStep()
          )}
        </Card>
      </div>
    </div>
  );
}