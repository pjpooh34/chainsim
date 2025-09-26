import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Shield, 
  Building, 
  Heart, 
  CreditCard, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Download,
  Eye,
  Scale
} from 'lucide-react';

export default function ComplianceGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [complianceResults, setComplianceResults] = useState<any>(null);

  const industries = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      description: 'HIPAA, HITECH compliance requirements',
      regulations: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11']
    },
    {
      id: 'finance',
      name: 'Financial Services',
      icon: CreditCard,
      description: 'PCI DSS, SOX, banking regulations',
      regulations: ['PCI DSS', 'SOX', 'FFIEC', 'GLBA']
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: Building,
      description: 'PCI DSS, GDPR, consumer protection',
      regulations: ['PCI DSS', 'GDPR', 'CCPA', 'COPPA']
    },
    {
      id: 'government',
      name: 'Government',
      icon: Scale,
      description: 'FedRAMP, FISMA, NIST compliance',
      regulations: ['FedRAMP', 'FISMA', 'NIST 800-53', 'CJIS']
    },
    {
      id: 'general',
      name: 'General Enterprise',
      icon: Globe,
      description: 'GDPR, SOC 2, ISO 27001 standards',
      regulations: ['GDPR', 'SOC 2', 'ISO 27001', 'NIST CSF']
    }
  ];

  const handleGenerateChecklist = async (industryId: string) => {
    setSelectedIndustry(industryId);
    setIsGenerating(true);
    
    // Simulate AI checklist generation
    setTimeout(() => {
      const industry = industries.find(i => i.id === industryId);
      setComplianceResults({
        industry: industry?.name,
        regulations: industry?.regulations,
        categories: [
          {
            name: 'Data Protection & Encryption',
            priority: 'Critical',
            items: [
              {
                requirement: 'Encrypt data at rest using AES-256',
                status: 'required',
                description: 'All sensitive data must be encrypted when stored',
                awsServices: ['S3', 'EBS', 'RDS'],
                effort: 'Medium'
              },
              {
                requirement: 'Encrypt data in transit using TLS 1.2+',
                status: 'required',
                description: 'All data transmission must use strong encryption',
                awsServices: ['ALB', 'CloudFront', 'API Gateway'],
                effort: 'Low'
              },
              {
                requirement: 'Implement key management and rotation',
                status: 'required',
                description: 'Encryption keys must be managed and rotated regularly',
                awsServices: ['KMS', 'CloudHSM'],
                effort: 'High'
              }
            ]
          },
          {
            name: 'Access Control & Authentication',
            priority: 'Critical',
            items: [
              {
                requirement: 'Multi-factor authentication for all admin access',
                status: 'required',
                description: 'Administrative accounts must use MFA',
                awsServices: ['IAM', 'SSO'],
                effort: 'Low'
              },
              {
                requirement: 'Role-based access control (RBAC)',
                status: 'required',
                description: 'Users should have minimum necessary permissions',
                awsServices: ['IAM', 'Organizations'],
                effort: 'Medium'
              },
              {
                requirement: 'Regular access reviews and certification',
                status: 'recommended',
                description: 'Periodic review of user access and permissions',
                awsServices: ['IAM Access Analyzer', 'CloudTrail'],
                effort: 'Medium'
              }
            ]
          },
          {
            name: 'Monitoring & Logging',
            priority: 'High',
            items: [
              {
                requirement: 'Comprehensive audit logging',
                status: 'required',
                description: 'Log all security-relevant events and activities',
                awsServices: ['CloudTrail', 'CloudWatch', 'VPC Flow Logs'],
                effort: 'Medium'
              },
              {
                requirement: 'Real-time security monitoring',
                status: 'required',
                description: 'Monitor for security threats and anomalies',
                awsServices: ['GuardDuty', 'Security Hub', 'Detective'],
                effort: 'High'
              },
              {
                requirement: 'Log retention and integrity protection',
                status: 'required',
                description: 'Logs must be retained and protected from tampering',
                awsServices: ['S3', 'Glacier', 'CloudWatch Logs'],
                effort: 'Low'
              }
            ]
          },
          {
            name: 'Network Security',
            priority: 'High',
            items: [
              {
                requirement: 'Network segmentation and isolation',
                status: 'required',
                description: 'Separate sensitive workloads using network controls',
                awsServices: ['VPC', 'Security Groups', 'NACLs'],
                effort: 'Medium'
              },
              {
                requirement: 'Intrusion detection and prevention',
                status: 'recommended',
                description: 'Monitor and block malicious network activity',
                awsServices: ['WAF', 'Shield', 'Inspector'],
                effort: 'High'
              }
            ]
          }
        ],
        summary: {
          totalRequirements: 9,
          criticalRequirements: 5,
          estimatedEffort: '6-8 weeks',
          complianceScore: 0
        }
      });
      setIsGenerating(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'text-red-600 bg-red-50 border-red-200';
      case 'recommended': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'optional': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
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
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Compliance Checklist Generator
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Generate industry-specific security and compliance checklists for Healthcare, Finance, Retail and more
          </p>
        </div>

        {/* Industry Selection */}
        {!complianceResults && (
          <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Select Your Industry
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Choose your industry to generate a customized compliance checklist
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <Card 
                      key={industry.id}
                      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleGenerateChecklist(industry.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {industry.name}
                          </h3>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {industry.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Key Regulations:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {industry.regulations.map((reg) => (
                              <Badge key={reg} variant="outline" className="text-xs">
                                {reg}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full"
                          disabled={isGenerating}
                        >
                          {isGenerating && selectedIndustry === industry.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Generate Checklist
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Generated Checklist Results */}
        {complianceResults && (
          <div className="space-y-6">
            {/* Header with Industry Info */}
            <Card className="p-6 bg-gradient-to-r from-red-600 to-rose-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {complianceResults.industry} Compliance Checklist
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {complianceResults.regulations.map((reg: string) => (
                      <Badge key={reg} className="bg-white/20 text-white border-white/30">
                        {reg}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white text-red-600 px-3 py-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Guidance Framework Only
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Summary Dashboard */}
            <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Compliance Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {complianceResults.summary.totalRequirements}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Requirements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {complianceResults.summary.criticalRequirements}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Critical Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {complianceResults.summary.estimatedEffort}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Est. Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {complianceResults.summary.complianceScore}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Current Score</div>
                  <Progress value={complianceResults.summary.complianceScore} className="mt-2" />
                </div>
              </div>
            </Card>

            {/* Compliance Categories */}
            <div className="space-y-6">
              {complianceResults.categories.map((category: any, categoryIndex: number) => (
                <Card key={categoryIndex} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {category.name}
                      </h3>
                      <Badge className={`${getPriorityColor(category.priority)} px-3 py-1`}>
                        {category.priority} Priority
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500">
                      {category.items.length} requirements
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="space-y-3">
                          {/* Requirement Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                  {item.requirement}
                                </h4>
                                <Badge className={`${getStatusColor(item.status)} text-xs`}>
                                  {item.status}
                                </Badge>
                                <Badge className={`${getEffortColor(item.effort)} text-xs`}>
                                  {item.effort} Effort
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* AWS Services */}
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Relevant AWS Services:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.awsServices.map((service: string) => (
                                <Badge key={service} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Implementation Guide */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Implementation Roadmap
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-800 dark:text-red-200">
                      Phase 1: Critical Requirements (Weeks 1-2)
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-red-700 dark:text-red-300 ml-8">
                    <li>• Implement data encryption at rest and in transit</li>
                    <li>• Enable multi-factor authentication for all admin accounts</li>
                    <li>• Set up comprehensive audit logging</li>
                    <li>• Configure network segmentation and security groups</li>
                  </ul>
                </div>

                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                      Phase 2: High Priority Requirements (Weeks 3-4)
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300 ml-8">
                    <li>• Deploy real-time security monitoring</li>
                    <li>• Implement role-based access control</li>
                    <li>• Set up log retention and integrity protection</li>
                  </ul>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                      Phase 3: Recommended Enhancements (Weeks 5-8)
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300 ml-8">
                    <li>• Regular access reviews and certification</li>
                    <li>• Intrusion detection and prevention systems</li>
                    <li>• Advanced threat detection capabilities</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="p-6 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
              <div className="flex items-start space-x-3">
                <Scale className="w-6 h-6 text-slate-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Legal Disclaimer
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    This compliance checklist is provided for guidance purposes only and should not be considered 
                    as legal or professional advice. Compliance requirements may vary based on your specific use case, 
                    jurisdiction, and business context. Always consult with qualified legal and compliance professionals 
                    before implementing security controls. This tool is not a substitute for professional compliance auditing.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700">
                <Download className="w-4 h-4 mr-2" />
                Download Checklist PDF
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export to Project Plan
              </Button>
              <Button variant="outline" onClick={() => setComplianceResults(null)}>
                <Shield className="w-4 h-4 mr-2" />
                Generate New Checklist
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}