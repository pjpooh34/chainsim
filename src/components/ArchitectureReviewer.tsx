import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileCheck, 
  Upload, 
  AlertTriangle, 
  Shield, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileCode,
  Eye,
  Download
} from 'lucide-react';

export default function ArchitectureReviewer() {
  const [architectureInput, setArchitectureInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        overallScore: 78,
        securityScore: 72,
        costScore: 85,
        scalabilityScore: 80,
        securityIssues: [
          {
            severity: 'high',
            title: 'Public S3 Bucket Detected',
            description: 'S3 bucket "user-uploads" has public read access enabled',
            recommendation: 'Enable bucket encryption and restrict public access'
          },
          {
            severity: 'medium',
            title: 'Missing VPC Flow Logs',
            description: 'VPC subnets do not have flow logging enabled',
            recommendation: 'Enable VPC flow logs for security monitoring'
          }
        ],
        costRisks: [
          {
            severity: 'medium',
            title: 'Oversized RDS Instance',
            description: 'RDS instance appears oversized for current workload',
            potentialSaving: '$450/month',
            recommendation: 'Consider right-sizing to db.t3.medium'
          }
        ],
        scalingIssues: [
          {
            severity: 'low',
            title: 'Single AZ Deployment',
            description: 'Application deployed in single availability zone',
            recommendation: 'Implement multi-AZ deployment for high availability'
          }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'low': return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      default: return <CheckCircle className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              AI Architecture Reviewer
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Paste in your AWS architecture diagram or CloudFormation JSON for AI-powered security, cost, and scalability analysis
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Architecture Input
              </h2>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <Eye className="w-4 h-4 mr-2" />
                Analysis Only - No Changes Made
              </Badge>
            </div>

            <Tabs defaultValue="json" className="w-full">
              <TabsList>
                <TabsTrigger value="json" className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>CloudFormation JSON</span>
                </TabsTrigger>
                <TabsTrigger value="diagram" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Architecture Diagram</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="json" className="space-y-4">
                <Textarea
                  placeholder="Paste your CloudFormation JSON template here..."
                  value={architectureInput}
                  onChange={(e) => setArchitectureInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </TabsContent>
              
              <TabsContent value="diagram" className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Upload your architecture diagram
                  </p>
                  <p className="text-sm text-slate-500">
                    Supports PNG, JPG, PDF, or Visio files
                  </p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleAnalyze}
              disabled={!architectureInput && !isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Architecture...
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4 mr-2" />
                  Analyze Architecture
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {analysisResults && (
          <div className="space-y-6">
            {/* Overall Scores */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Architecture Scorecard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {analysisResults.overallScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Overall Score</div>
                  <Progress value={analysisResults.overallScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {analysisResults.securityScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Security</div>
                  <Progress value={analysisResults.securityScore} className="mt-2" />
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  <div className="text-center">
                    {analysisResults.costScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Cost Optimization</div>
                  <Progress value={analysisResults.costScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {analysisResults.scalabilityScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Scalability</div>
                  <Progress value={analysisResults.scalabilityScore} className="mt-2" />
                </div>
              </div>
            </Card>

            {/* Issues Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Security Issues */}
              <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Security Issues
                  </h3>
                </div>
                <div className="space-y-4">
                  {analysisResults.securityIssues.map((issue: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{issue.title}</h4>
                          <p className="text-sm mb-2">{issue.description}</p>
                          <p className="text-sm font-medium">💡 {issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cost Risks */}
              <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Cost Risks
                  </h3>
                </div>
                <div className="space-y-4">
                  {analysisResults.costRisks.map((risk: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(risk.severity)}`}>
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(risk.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{risk.title}</h4>
                          <p className="text-sm mb-2">{risk.description}</p>
                          <div className="text-sm font-bold text-emerald-600 mb-1">
                            Potential Saving: {risk.potentialSaving}
                          </div>
                          <p className="text-sm font-medium">💡 {risk.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Scaling Issues */}
              <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Scaling Issues
                  </h3>
                </div>
                <div className="space-y-4">
                  {analysisResults.scalingIssues.map((issue: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{issue.title}</h4>
                          <p className="text-sm mb-2">{issue.description}</p>
                          <p className="text-sm font-medium">💡 {issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Action Items */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Prioritized Improvement Checklist
                </h2>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </Button>
              </div>

              <div className="space-y-4">
                {/* High Priority */}
                <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-red-600 text-white">High Priority</Badge>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Address Security Vulnerabilities
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 ml-6">
                    <li>• Fix public S3 bucket exposure</li>
                    <li>• Implement proper access controls</li>
                    <li>• Enable encryption for sensitive data</li>
                  </ul>
                </div>

                {/* Medium Priority */}
                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-amber-600 text-white">Medium Priority</Badge>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Optimize Costs & Monitoring
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 ml-6">
                    <li>• Right-size RDS instance</li>
                    <li>• Enable VPC flow logs</li>
                    <li>• Set up CloudWatch alerts</li>
                  </ul>
                </div>

                {/* Low Priority */}
                <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className="bg-blue-600 text-white">Low Priority</Badge>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Improve Availability & Resilience
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 ml-6">
                    <li>• Implement multi-AZ deployment</li>
                    <li>• Add load balancer health checks</li>
                    <li>• Set up automated backups</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Disclaimer:</strong> This analysis is for planning purposes only and should not be considered as 
                  professional advice. Always validate recommendations with your security and compliance teams.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}