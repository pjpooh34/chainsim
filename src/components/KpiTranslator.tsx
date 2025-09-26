import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  Target, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Clock,
  DollarSign,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Brain
} from 'lucide-react';

export default function KpiTranslator() {
  const [businessGoal, setBusinessGoal] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResults, setTranslationResults] = useState<any>(null);

  const sampleGoals = [
    'Reduce customer churn by 25%',
    'Increase website conversion rate',
    'Improve customer support response time',
    'Scale to handle 10x more users',
    'Reduce operational costs by 30%'
  ];

  const handleTranslate = async () => {
    setIsTranslating(true);
    // Simulate AI translation
    setTimeout(() => {
      const mockResults = {
        businessGoal: businessGoal || 'Reduce customer churn by 25%',
        techKpis: [
          {
            category: 'Infrastructure',
            kpi: 'Application Response Time',
            target: '< 200ms average',
            reasoning: 'Slow page loads increase bounce rates and customer frustration'
          },
          {
            category: 'Monitoring',
            kpi: 'Error Rate',
            target: '< 0.5%',
            reasoning: 'Application errors directly correlate with customer dissatisfaction'
          },
          {
            category: 'Availability',
            kpi: 'Uptime SLA',
            target: '99.9%',
            reasoning: 'Service downtime leads to customer frustration and churn'
          }
        ],
        suggestedAccelerators: [
          {
            name: 'Real-time Analytics Pipeline',
            description: 'Track user behavior and identify churn signals in real-time',
            impact: 'Enable proactive customer retention strategies',
            estimatedTime: '4 weeks'
          },
          {
            name: 'AI-Powered Customer Support Chatbot',
            description: 'Reduce support response time with intelligent automation',
            impact: 'Improve customer satisfaction and reduce support costs',
            estimatedTime: '6 weeks'
          },
          {
            name: 'Personalization Engine',
            description: 'Deliver personalized experiences based on user behavior',
            impact: 'Increase engagement and reduce likelihood of churn',
            estimatedTime: '8 weeks'
          }
        ],
        implementationRoadmap: [
          {
            phase: 'Foundation (Weeks 1-2)',
            tasks: [
              'Set up monitoring dashboards',
              'Implement application performance monitoring',
              'Establish baseline metrics'
            ]
          },
          {
            phase: 'Analytics (Weeks 3-6)',
            tasks: [
              'Deploy real-time analytics pipeline',
              'Configure churn prediction models',
              'Set up automated alerts'
            ]
          },
          {
            phase: 'Automation (Weeks 7-10)',
            tasks: [
              'Implement AI chatbot',
              'Deploy personalization engine',
              'Integrate customer feedback loops'
            ]
          }
        ]
      };
      setTranslationResults(mockResults);
      setIsTranslating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Business KPI Translator
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Enter your business goals and get AI-mapped technical KPIs with suggested accelerator recommendations
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Business Goal
              </h2>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Translation
              </Badge>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Describe your business goal (e.g., 'reduce customer churn by 25%' or 'increase website conversion rate by 15%')"
                value={businessGoal}
                onChange={(e) => setBusinessGoal(e.target.value)}
                className="min-h-[120px]"
              />

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Or try these examples:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleGoals.map((goal, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setBusinessGoal(goal)}
                      className="text-xs"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleTranslate}
              disabled={!businessGoal && !isTranslating}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Translating Business Goal...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Translate to Technical KPIs
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {translationResults && (
          <div className="space-y-6">
            {/* Business Goal Summary */}
            <Card className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-6 h-6" />
                <h2 className="text-xl font-bold">Business Goal</h2>
              </div>
              <p className="text-lg font-medium">{translationResults.businessGoal}</p>
            </Card>

            {/* Technical KPIs */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Mapped Technical KPIs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {translationResults.techKpis.map((kpi: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="space-y-3">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {kpi.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {kpi.kpi}
                      </h3>
                      <div className="text-2xl font-bold text-emerald-600">
                        {kpi.target}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {kpi.reasoning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Suggested Accelerators */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Suggested Accelerators
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {translationResults.suggestedAccelerators.map((accelerator: any, index: number) => (
                  <div key={index} className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {accelerator.name}
                        </h3>
                        <Badge variant="outline">
                          {accelerator.estimatedTime}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {accelerator.description}
                      </p>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5" />
                          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            {accelerator.impact}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        View Accelerator Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Implementation Roadmap */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Implementation Roadmap
              </h2>
              <div className="space-y-6">
                {translationResults.implementationRoadmap.map((phase: any, index: number) => (
                  <div key={index} className="relative">
                    {/* Phase Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {phase.phase}
                      </h3>
                    </div>

                    {/* Phase Tasks */}
                    <div className="ml-12 space-y-2">
                      {phase.tasks.map((task: string, taskIndex: number) => (
                        <div key={taskIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-slate-600 dark:text-slate-400">{task}</span>
                        </div>
                      ))}
                    </div>

                    {/* Phase Connector */}
                    {index < translationResults.implementationRoadmap.length - 1 && (
                      <div className="absolute left-4 top-12 w-px h-16 bg-gradient-to-b from-emerald-600 to-teal-600"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      Pro Tip
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Start with Foundation phase to establish measurement baselines. 
                      This ensures you can accurately track progress toward your business goal.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Rocket className="w-4 h-4 mr-2" />
                Start First Accelerator
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Share with Team
              </Button>
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Planning Session
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}