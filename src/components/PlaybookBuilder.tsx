import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { 
  BookOpen,
  Plus,
  Download,
  Share,
  Eye,
  Edit,
  Settings,
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Code,
  Zap,
  Target,
  Users,
  Clock
} from "lucide-react";

export default function PlaybookBuilder() {
  const [activePlaybook, setActivePlaybook] = useState('migration');
  const [isEditing, setIsEditing] = useState(false);

  const playbooks = [
    {
      id: 'migration',
      title: 'AWS Migration Playbook',
      description: 'Comprehensive guide for cloud migration projects',
      type: 'Migration',
      status: 'Published',
      version: '2.1',
      lastUpdated: '2 days ago',
      compliance: ['SOC 2', 'ISO 27001'],
      sections: 12,
      pages: 47
    },
    {
      id: 'devops',
      title: 'DevOps Implementation Playbook', 
      description: 'Best practices for DevOps pipeline setup',
      type: 'DevOps',
      status: 'Draft',
      version: '1.3',
      lastUpdated: '5 hours ago',
      compliance: ['PCI DSS'],
      sections: 8,
      pages: 32
    },
    {
      id: 'security',
      title: 'Security Compliance Playbook',
      description: 'Security framework and compliance guidelines',
      type: 'Security', 
      status: 'Review',
      version: '1.8',
      lastUpdated: '1 day ago',
      compliance: ['SOC 2', 'HIPAA', 'GDPR'],
      sections: 15,
      pages: 68
    }
  ];

  const sections = [
    {
      id: 1,
      title: 'Executive Summary',
      type: 'overview',
      status: 'complete',
      aiGenerated: true,
      content: 'High-level project overview and business impact'
    },
    {
      id: 2,
      title: 'Prerequisites & Requirements',
      type: 'requirements',
      status: 'complete', 
      aiGenerated: true,
      content: 'Technical and business prerequisites'
    },
    {
      id: 3,
      title: 'Architecture Overview',
      type: 'technical',
      status: 'complete',
      aiGenerated: false,
      content: 'Target architecture and design principles'
    },
    {
      id: 4,
      title: 'Migration Strategy',
      type: 'process',
      status: 'complete',
      aiGenerated: true,
      content: 'Phased approach and migration methodology'
    },
    {
      id: 5,
      title: 'Security & Compliance',
      type: 'security',
      status: 'in-progress',
      aiGenerated: true,
      content: 'Security controls and compliance mapping'
    },
    {
      id: 6,
      title: 'Implementation Steps',
      type: 'process',
      status: 'in-progress',
      aiGenerated: false,
      content: 'Detailed step-by-step implementation guide'
    },
    {
      id: 7,
      title: 'Testing & Validation',
      type: 'validation',
      status: 'pending',
      aiGenerated: true,
      content: 'Testing procedures and success criteria'
    },
    {
      id: 8,
      title: 'Rollback Procedures',
      type: 'contingency',
      status: 'pending',
      aiGenerated: true,
      content: 'Emergency rollback and recovery procedures'
    }
  ];

  const complianceControls = [
    {
      id: 'soc2-cc6.1',
      framework: 'SOC 2',
      control: 'CC6.1 - Logical Access Controls',
      status: 'implemented',
      description: 'Access controls are implemented to restrict logical access'
    },
    {
      id: 'soc2-cc6.2',
      framework: 'SOC 2', 
      control: 'CC6.2 - Authentication',
      status: 'implemented',
      description: 'Multi-factor authentication is required for privileged access'
    },
    {
      id: 'iso-a9.1.1',
      framework: 'ISO 27001',
      control: 'A.9.1.1 - Access Control Policy',
      status: 'in-progress',
      description: 'Access control policy is established and maintained'
    },
    {
      id: 'iso-a12.6.1',
      framework: 'ISO 27001',
      control: 'A.12.6.1 - Management of Technical Vulnerabilities',
      status: 'pending',
      description: 'Technical vulnerabilities are managed systematically'
    }
  ];

  const currentPlaybook = playbooks.find(p => p.id === activePlaybook) || playbooks[0];

  const generateAIContent = (sectionId: number) => {
    // Simulate AI content generation
    console.log(`Generating AI content for section ${sectionId}`);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Playbook Builder</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered playbook generation with governance and compliance overlays.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Stop Editing' : 'Edit Playbook'}
          </Button>
        </div>
      </div>

      {/* Playbook Selection */}
      <div className="grid md:grid-cols-3 gap-6">
        {playbooks.map((playbook) => (
          <Card 
            key={playbook.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activePlaybook === playbook.id ? 'border-primary shadow-lg' : ''
            }`}
            onClick={() => setActivePlaybook(playbook.id)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{playbook.title}</h3>
                  <Badge variant="secondary">{playbook.type}</Badge>
                </div>
                <Badge variant={
                  playbook.status === 'Published' ? 'default' :
                  playbook.status === 'Review' ? 'secondary' : 'outline'
                }>
                  {playbook.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{playbook.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Version {playbook.version}</span>
                  <span className="text-muted-foreground">{playbook.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{playbook.sections} sections, {playbook.pages} pages</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {playbook.compliance.map((comp) => (
                    <Badge key={comp} variant="outline" className="text-xs">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Playbook Content */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Table of Contents</h3>
            {isEditing && (
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {sections.map((section) => (
              <div 
                key={section.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  section.status === 'complete' ? 'bg-success text-success-foreground' :
                  section.status === 'in-progress' ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {section.status === 'complete' ? <CheckCircle className="w-3 h-3" /> : section.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{section.title}</p>
                  <div className="flex items-center space-x-2">
                    {section.aiGenerated && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="w-2 h-2 mr-1" />
                        AI
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground capitalize">{section.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-3 p-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{currentPlaybook.title}</h2>
                    <p className="text-muted-foreground">{currentPlaybook.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    {isEditing && (
                      <Button size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Generate with AI
                      </Button>
                    )}
                  </div>
                </div>

                {/* Current Section Content */}
                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Executive Summary</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                      <Badge variant="default">Complete</Badge>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Enter section content..."
                        className="min-h-[300px]"
                        defaultValue={`This playbook provides a comprehensive guide for migrating applications and infrastructure to Amazon Web Services (AWS). The migration will enhance scalability, reduce operational costs, and improve security posture while ensuring minimal business disruption.

Key Benefits:
• 30-40% reduction in infrastructure costs
• 99.9% uptime SLA with AWS services
• Enhanced security and compliance controls
• Improved disaster recovery capabilities
• Scalable infrastructure to support business growth

Project Scope:
• 15 applications across 3 business units
• 50TB of data migration
• 200+ users to be trained
• 6-month implementation timeline
• $2.5M total project budget

Success Criteria:
• Zero data loss during migration
• <4 hours of total downtime
• All applications performing at baseline or better
• Team training completion rate >95%
• Cost savings targets achieved within 3 months`}
                      />
                      <div className="flex space-x-3">
                        <Button variant="outline">
                          <Zap className="w-4 h-4 mr-2" />
                          Enhance with AI
                        </Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground mb-4">
                        This playbook provides a comprehensive guide for migrating applications and infrastructure to Amazon Web Services (AWS). 
                        The migration will enhance scalability, reduce operational costs, and improve security posture while ensuring minimal business disruption.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-success">Key Benefits</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span>30-40% reduction in infrastructure costs</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span>99.9% uptime SLA with AWS services</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span>Enhanced security and compliance controls</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-primary">Project Scope</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-primary" />
                              <span>15 applications across 3 business units</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-primary" />
                              <span>200+ users to be trained</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>6-month implementation timeline</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Section Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline">
                    ← Previous Section
                  </Button>
                  <Button>
                    Next Section →
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Compliance Controls</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Control
                  </Button>
                </div>

                <div className="space-y-4">
                  {complianceControls.map((control) => (
                    <Card key={control.id} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline">{control.framework}</Badge>
                              <h4 className="font-semibold">{control.control}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{control.description}</p>
                          </div>
                          <Badge variant={
                            control.status === 'implemented' ? 'default' :
                            control.status === 'in-progress' ? 'secondary' : 'outline'
                          }>
                            {control.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        {isEditing && (
                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Evidence
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Migration Checklist Template</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pre-flight checklist for application migration
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-success" />
                      <h4 className="font-semibold">Infrastructure as Code Template</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Terraform templates for AWS infrastructure
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Playbook Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="playbookTitle">Playbook Title</Label>
                      <Input id="playbookTitle" defaultValue={currentPlaybook.title} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="playbookDescription">Description</Label>
                      <Textarea id="playbookDescription" defaultValue={currentPlaybook.description} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="playbookType">Type</Label>
                      <Select defaultValue={currentPlaybook.type.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="migration">Migration</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="optimization">Optimization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Compliance Frameworks</Label>
                      <div className="space-y-2">
                        {['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'].map((framework) => (
                          <div key={framework} className="flex items-center space-x-2">
                            <Checkbox 
                              id={framework}
                              defaultChecked={currentPlaybook.compliance.includes(framework)}
                            />
                            <Label htmlFor={framework} className="text-sm font-normal">{framework}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}