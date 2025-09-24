import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  Play, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  BookOpen,
  Download,
  Share2,
  Video,
  Headphones,
  Eye,
  Target,
  Brain,
  Rocket
} from 'lucide-react';

export default function TrainingModules() {
  const [selectedAccelerator, setSelectedAccelerator] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [trainingModule, setTrainingModule] = useState<any>(null);

  const availableAccelerators = [
    {
      id: 'chatbot',
      name: 'AI-Powered Customer Support Chatbot',
      category: 'AI & ML',
      complexity: 'Medium',
      duration: '6 weeks'
    },
    {
      id: 'migration',
      name: 'Cloud Migration Accelerator',
      category: 'Infrastructure',
      complexity: 'High',
      duration: '8 weeks'
    },
    {
      id: 'cicd',
      name: 'CI/CD Pipeline Setup',
      category: 'DevOps',
      complexity: 'Medium',
      duration: '4 weeks'
    },
    {
      id: 'security',
      name: 'Security Baseline Implementation',
      category: 'Security',
      complexity: 'High',
      duration: '5 weeks'
    },
    {
      id: 'analytics',
      name: 'Real-time Analytics Pipeline',
      category: 'Data & Analytics',
      complexity: 'High',
      duration: '7 weeks'
    }
  ];

  const handleGenerateTraining = async (acceleratorId: string) => {
    setSelectedAccelerator(acceleratorId);
    setIsGenerating(true);
    
    // Simulate AI training generation
    setTimeout(() => {
      const accelerator = availableAccelerators.find(a => a.id === acceleratorId);
      setTrainingModule({
        accelerator: accelerator,
        overview: {
          duration: '12 minutes',
          format: ['text', 'video', 'audio'],
          difficulty: 'Intermediate',
          prerequisites: ['Basic AWS knowledge', 'Understanding of cloud concepts']
        },
        sections: [
          {
            title: 'What We Built',
            duration: '3 min',
            content: {
              summary: 'Overview of the implemented solution and its components',
              keyPoints: [
                'Architecture overview and design decisions',
                'AWS services utilized and their roles',
                'Integration patterns and data flow',
                'Cost optimization strategies applied'
              ]
            }
          },
          {
            title: 'How It Works',
            duration: '4 min',
            content: {
              summary: 'Deep dive into the technical implementation and workflows',
              keyPoints: [
                'Step-by-step process flow explanation',
                'API endpoints and data structures',
                'Authentication and security measures',
                'Error handling and monitoring setup'
              ]
            }
          },
          {
            title: 'Best Practices',
            duration: '3 min',
            content: {
              summary: 'Industry best practices and lessons learned',
              keyPoints: [
                'Security considerations and compliance',
                'Performance optimization techniques',
                'Scalability patterns and considerations',
                'Cost management and resource optimization'
              ]
            }
          },
          {
            title: 'Extending to Production',
            duration: '2 min',
            content: {
              summary: 'Guidelines for productionizing and scaling the solution',
              keyPoints: [
                'Production deployment checklist',
                'Monitoring and alerting setup',
                'Backup and disaster recovery',
                'Team training and handover process'
              ]
            }
          }
        ],
        deliverables: {
          textGuide: {
            pages: 15,
            sections: 8,
            includes: ['Step-by-step instructions', 'Code examples', 'Best practices', 'Troubleshooting guide']
          },
          videoNarration: {
            duration: '12 minutes',
            format: 'MP4 HD',
            includes: ['Screen recordings', 'Diagrams explanation', 'Code walkthrough', 'AI narration']
          },
          audioSummary: {
            duration: '8 minutes',
            format: 'MP3',
            includes: ['Key concepts summary', 'Best practices highlight', 'Action items review']
          }
        },
        learningObjectives: [
          'Understand the architecture and design principles',
          'Learn how to configure and customize the solution',
          'Master the operational aspects and monitoring',
          'Know how to extend and scale for production use'
        ],
        assessmentQuestions: [
          'What are the key AWS services used in this accelerator?',
          'How would you modify the solution for high availability?',
          'What monitoring should be implemented for production?',
          'How would you handle scaling for 10x more users?'
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  const getComplexityColor = (complexity: string) => {
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
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              AI Training Modules
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Every accelerator generates comprehensive 10-minute training guides with AI-narrated videos for your team
          </p>
        </div>

        {/* Accelerator Selection */}
        {!trainingModule && (
          <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Select an Accelerator
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Choose an accelerator to generate a customized training module
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableAccelerators.map((accelerator) => (
                  <Card 
                    key={accelerator.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => handleGenerateTraining(accelerator.id)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {accelerator.name}
                        </h3>
                        <Badge className={`${getComplexityColor(accelerator.complexity)} text-xs`}>
                          {accelerator.complexity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Category:</span>
                          <Badge variant="outline">{accelerator.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                          <span className="font-medium">{accelerator.duration}</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={isGenerating}
                      >
                        {isGenerating && selectedAccelerator === accelerator.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Generate Training
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Rocket className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    Training Auto-Generation
                  </h3>
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-sm max-w-2xl mx-auto">
                  Every time you complete an accelerator, AI automatically generates a comprehensive training module 
                  to help your team understand, maintain, and extend the solution.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Generated Training Module */}
        {trainingModule && (
          <div className="space-y-6">
            {/* Training Module Header */}
            <Card className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {trainingModule.accelerator.name} - Training Module
                  </h2>
                  <div className="flex items-center space-x-4 text-blue-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{trainingModule.overview.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>{trainingModule.overview.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Team Training</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {trainingModule.overview.format.map((format: string) => (
                    <Badge key={format} className="bg-white/20 text-white border-white/30">
                      {format === 'text' && <FileText className="w-3 h-3 mr-1" />}
                      {format === 'video' && <Video className="w-3 h-3 mr-1" />}
                      {format === 'audio' && <Headphones className="w-3 h-3 mr-1" />}
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Training Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Learning Objectives
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingModule.learningObjectives.map((objective: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{objective}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Prerequisites
                  </h3>
                  <div className="space-y-2">
                    {trainingModule.overview.prerequisites.map((prereq: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-600 dark:text-slate-400">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {trainingModule.sections.map((section: any, index: number) => (
                  <Card key={index} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {section.title}
                        </h3>
                      </div>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {section.duration}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {section.content.summary}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Key Topics Covered:
                      </h4>
                      <ul className="space-y-2">
                        {section.content.keyPoints.map((point: string, pointIndex: number) => (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="deliverables" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Text Guide
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Pages:</span>
                        <span className="font-semibold">{trainingModule.deliverables.textGuide.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Sections:</span>
                        <span className="font-semibold">{trainingModule.deliverables.textGuide.sections}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Includes:</h4>
                        <ul className="space-y-1">
                          {trainingModule.deliverables.textGuide.includes.map((item: string, index: number) => (
                            <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Video className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        AI-Narrated Video
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                        <span className="font-semibold">{trainingModule.deliverables.videoNarration.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Quality:</span>
                        <span className="font-semibold">{trainingModule.deliverables.videoNarration.format}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Features:</h4>
                        <ul className="space-y-1">
                          {trainingModule.deliverables.videoNarration.includes.map((item: string, index: number) => (
                            <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Headphones className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Audio Summary
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                        <span className="font-semibold">{trainingModule.deliverables.audioSummary.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Format:</span>
                        <span className="font-semibold">{trainingModule.deliverables.audioSummary.format}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Content:</h4>
                        <ul className="space-y-1">
                          {trainingModule.deliverables.audioSummary.includes.map((item: string, index: number) => (
                            <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Headphones className="w-4 h-4 mr-2" />
                        Listen Now
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-6">
                <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Knowledge Check Questions
                  </h3>
                  
                  <div className="space-y-4">
                    {trainingModule.assessmentQuestions.map((question: string, index: number) => (
                      <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-700 dark:text-slate-300 font-medium">
                              {question}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                          Assessment Purpose
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          These questions help validate understanding and can be used for team discussions or formal assessments.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Share with Team
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download All Materials
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Export to LMS
              </Button>
              <Button variant="outline" onClick={() => setTrainingModule(null)}>
                <GraduationCap className="w-4 h-4 mr-2" />
                Generate New Module
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}