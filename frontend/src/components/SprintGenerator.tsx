import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { 
  Rocket,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap,
  Brain,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Settings,
  Database,
  Shield,
  Cloud,
  Code,
  Monitor,
  FileText,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Review' | 'Completed';
  assignee: string;
  estimatedHours: number;
  dependencies: string[];
  category: string;
}

interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'Active' | 'Review' | 'Completed';
  progress: number;
  tasks: Task[];
  accelerator: string;
  team: string[];
}

export default function SprintGenerator() {
  const [selectedAccelerator, setSelectedAccelerator] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintDuration, setSprintDuration] = useState('2');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'generator' | 'active' | 'completed'>('generator');
  const [generatedSprint, setGeneratedSprint] = useState<Sprint | null>(null);

  const availableAccelerators = [
    { id: 'aws-migration', name: 'AWS Migration Accelerator', category: 'Infrastructure' },
    { id: 'devops-pipeline', name: 'DevOps Pipeline Setup', category: 'DevOps' },
    { id: 'security-framework', name: 'Security Compliance Framework', category: 'Security' },
    { id: 'container-migration', name: 'Container Migration Kit', category: 'Infrastructure' },
    { id: 'database-modernization', name: 'Database Modernization Suite', category: 'Data' },
    { id: 'zero-trust', name: 'Zero-Trust Implementation', category: 'Security' },
    { id: 'automated-testing', name: 'Automated Testing Suite', category: 'DevOps' },
    { id: 'monitoring-setup', name: 'Monitoring & Observability', category: 'Operations' }
  ];

  const teamMembersList = [
    'John Smith (DevOps Engineer)',
    'Sarah Johnson (Cloud Architect)', 
    'Mike Chen (Security Specialist)',
    'Lisa Rodriguez (Backend Developer)',
    'David Kim (Frontend Developer)',
    'Emma Wilson (QA Engineer)',
    'Alex Thompson (Site Reliability Engineer)',
    'Rachel Green (Product Manager)'
  ];

  const activeSprints: Sprint[] = [
    {
      id: 'sprint-001',
      name: 'AWS Infrastructure Migration - Phase 1',
      goal: 'Migrate core application infrastructure to AWS with improved scalability and cost optimization',
      startDate: '2024-01-15',
      endDate: '2024-02-05',
      status: 'Active',
      progress: 73,
      accelerator: 'AWS Migration Accelerator',
      team: ['John Smith', 'Sarah Johnson', 'Lisa Rodriguez'],
      tasks: [
        {
          id: 'task-001',
          title: 'Set up AWS VPC and networking',
          description: 'Configure secure VPC with public/private subnets, NAT gateways, and security groups',
          priority: 'High',
          status: 'Completed',
          assignee: 'Sarah Johnson',
          estimatedHours: 16,
          dependencies: [],
          category: 'Infrastructure'
        },
        {
          id: 'task-002', 
          title: 'Migrate application databases',
          description: 'Use AWS DMS to migrate existing databases to RDS with minimal downtime',
          priority: 'High',
          status: 'In Progress',
          assignee: 'John Smith',
          estimatedHours: 24,
          dependencies: ['task-001'],
          category: 'Data'
        },
        {
          id: 'task-003',
          title: 'Configure auto-scaling groups',
          description: 'Set up EC2 auto-scaling based on CPU and memory metrics',
          priority: 'Medium',
          status: 'Review',
          assignee: 'Lisa Rodriguez',
          estimatedHours: 12,
          dependencies: ['task-001'],
          category: 'Infrastructure'
        },
        {
          id: 'task-004',
          title: 'Implement monitoring and alerts',
          description: 'Set up CloudWatch monitoring, custom metrics, and alerting policies',
          priority: 'Medium',
          status: 'Not Started',
          assignee: 'John Smith',
          estimatedHours: 20,
          dependencies: ['task-002', 'task-003'],
          category: 'Monitoring'
        }
      ]
    },
    {
      id: 'sprint-002',
      name: 'Security Compliance Implementation',
      goal: 'Implement comprehensive security framework meeting SOC 2 and ISO 27001 requirements',
      startDate: '2024-01-22',
      endDate: '2024-02-12',
      status: 'Active',
      progress: 45,
      accelerator: 'Security Compliance Framework',
      team: ['Mike Chen', 'Alex Thompson', 'Emma Wilson'],
      tasks: [
        {
          id: 'task-005',
          title: 'Deploy security scanning tools',
          description: 'Install and configure automated security scanning for vulnerabilities',
          priority: 'High',
          status: 'Completed',
          assignee: 'Mike Chen',
          estimatedHours: 14,
          dependencies: [],
          category: 'Security'
        },
        {
          id: 'task-006',
          title: 'Implement access controls',
          description: 'Set up role-based access control (RBAC) and multi-factor authentication',
          priority: 'High',
          status: 'In Progress',
          assignee: 'Alex Thompson',
          estimatedHours: 18,
          dependencies: ['task-005'],
          category: 'Security'
        }
      ]
    }
  ];

  const completedSprints: Sprint[] = [
    {
      id: 'sprint-completed-001',
      name: 'DevOps Pipeline Foundation',
      goal: 'Establish CI/CD pipeline with automated testing and deployment',
      startDate: '2023-12-01',
      endDate: '2023-12-22',
      status: 'Completed',
      progress: 100,
      accelerator: 'DevOps Pipeline Setup',
      team: ['David Kim', 'Emma Wilson', 'Rachel Green'],
      tasks: []
    }
  ];

  const generateSprint = async () => {
    if (!selectedAccelerator || !sprintGoal) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const accelerator = availableAccelerators.find(a => a.id === selectedAccelerator);
      const mockSprint = generateMockSprint(accelerator!, sprintGoal, parseInt(sprintDuration));
      setGeneratedSprint(mockSprint);
      setIsGenerating(false);
    }, 3000);
  };

  const generateMockSprint = (accelerator: any, goal: string, duration: number): Sprint => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + (duration * 7));

    const taskTemplates = {
      'aws-migration': [
        { title: 'AWS Account Setup & IAM Configuration', category: 'Infrastructure', hours: 8 },
        { title: 'VPC and Network Architecture Design', category: 'Infrastructure', hours: 16 },
        { title: 'Database Migration Planning', category: 'Data', hours: 12 },
        { title: 'Application Container Setup', category: 'Infrastructure', hours: 20 },
        { title: 'Load Balancer Configuration', category: 'Infrastructure', hours: 10 },
        { title: 'Monitoring and Logging Setup', category: 'Monitoring', hours: 14 },
        { title: 'Security Groups and Access Controls', category: 'Security', hours: 12 },
        { title: 'Backup and Disaster Recovery', category: 'Operations', hours: 16 }
      ],
      'devops-pipeline': [
        { title: 'Git Repository Structure Setup', category: 'DevOps', hours: 6 },
        { title: 'CI/CD Pipeline Configuration', category: 'DevOps', hours: 18 },
        { title: 'Automated Testing Framework', category: 'Testing', hours: 20 },
        { title: 'Docker Container Optimization', category: 'Infrastructure', hours: 14 },
        { title: 'Deployment Automation Scripts', category: 'DevOps', hours: 16 },
        { title: 'Environment Configuration Management', category: 'Operations', hours: 12 },
        { title: 'Performance Testing Integration', category: 'Testing', hours: 10 }
      ],
      'security-framework': [
        { title: 'Security Assessment and Gap Analysis', category: 'Security', hours: 16 },
        { title: 'Identity and Access Management Setup', category: 'Security', hours: 20 },
        { title: 'Vulnerability Scanning Implementation', category: 'Security', hours: 12 },
        { title: 'Security Policies Documentation', category: 'Compliance', hours: 14 },
        { title: 'Incident Response Procedures', category: 'Security', hours: 10 },
        { title: 'Compliance Reporting Automation', category: 'Compliance', hours: 18 },
        { title: 'Security Training Materials', category: 'Training', hours: 8 }
      ]
    };

    const templates = taskTemplates[accelerator.id as keyof typeof taskTemplates] || taskTemplates['aws-migration'];
    const selectedTemplates = templates.slice(0, Math.min(6, templates.length));
    
    const tasks: Task[] = selectedTemplates.map((template, index) => ({
      id: `generated-task-${index + 1}`,
      title: template.title,
      description: `Implementation of ${template.title.toLowerCase()} as part of the ${accelerator.name}`,
      priority: index < 2 ? 'High' : index < 4 ? 'Medium' : 'Low',
      status: 'Not Started',
      assignee: teamMembers[index % teamMembers.length] || 'Unassigned',
      estimatedHours: template.hours,
      dependencies: index > 0 ? [`generated-task-${index}`] : [],
      category: template.category
    }));

    return {
      id: `generated-sprint-${Date.now()}`,
      name: `${accelerator.name} - Sprint 1`,
      goal,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'Planning',
      progress: 0,
      accelerator: accelerator.name,
      team: teamMembers,
      tasks
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Planning': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const renderSprintGenerator = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Generate New Sprint
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Our AI will create a customized sprint plan based on your selected accelerator and goals.
        </p>
      </div>

      <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Select Accelerator *
              </label>
              <Select value={selectedAccelerator} onValueChange={setSelectedAccelerator}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an accelerator..." />
                </SelectTrigger>
                <SelectContent>
                  {availableAccelerators.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      <div className="flex items-center space-x-2">
                        <span>{acc.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {acc.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Sprint Duration
              </label>
              <Select value={sprintDuration} onValueChange={setSprintDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 week</SelectItem>
                  <SelectItem value="2">2 weeks</SelectItem>
                  <SelectItem value="3">3 weeks</SelectItem>
                  <SelectItem value="4">4 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Sprint Goal *
            </label>
            <Input
              value={sprintGoal}
              onChange={(e) => setSprintGoal(e.target.value)}
              placeholder="e.g., Migrate core applications to AWS with improved scalability..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Team Members
            </label>
            <div className="grid md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {teamMembersList.map((member) => (
                <div key={member} className="flex items-center space-x-2">
                  <Checkbox
                    id={member}
                    checked={teamMembers.includes(member)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTeamMembers(prev => [...prev, member]);
                      } else {
                        setTeamMembers(prev => prev.filter(m => m !== member));
                      }
                    }}
                  />
                  <label htmlFor={member} className="text-sm cursor-pointer">
                    {member}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {isGenerating ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Generating Sprint Plan...
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  AI is creating optimized tasks and timeline
                </p>
              </div>
              <Progress value={75} className="w-full max-w-md mx-auto" />
            </div>
          ) : generatedSprint ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <CheckCircle className="w-12 h-12 mx-auto text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Sprint Generated Successfully!
                </h3>
              </div>

              <Card className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {generatedSprint.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {generatedSprint.goal}
                      </p>
                    </div>
                    <Badge className="bg-slate-100 text-slate-700">
                      {generatedSprint.tasks.length} tasks
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                      <div className="text-sm text-slate-600 dark:text-slate-400">Duration</div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {sprintDuration} weeks
                      </div>
                    </div>
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto text-green-600 mb-1" />
                      <div className="text-sm text-slate-600 dark:text-slate-400">Team Size</div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {generatedSprint.team.length} members
                      </div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                      <div className="text-sm text-slate-600 dark:text-slate-400">Est. Hours</div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {generatedSprint.tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100">Generated Tasks:</h5>
                    {generatedSprint.tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100">{task.title}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{task.estimatedHours}h • {task.assignee}</div>
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                    {generatedSprint.tasks.length > 3 && (
                      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                        +{generatedSprint.tasks.length - 3} more tasks
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setGeneratedSprint(null)}>
                  Generate New Sprint
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Start Sprint
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={generateSprint}
              disabled={!selectedAccelerator || !sprintGoal}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Generate Sprint Plan
            </Button>
          )}
        </div>
      </Card>
    </div>
  );

  const renderActiveSprints = () => (
    <div className="space-y-6">
      {activeSprints.map((sprint) => (
        <Card key={sprint.id} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {sprint.name}
                  </h3>
                  <Badge className={getStatusColor(sprint.status)}>
                    {sprint.status}
                  </Badge>
                  <Badge variant="secondary">
                    {sprint.accelerator}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  {sprint.goal}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {sprint.progress}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Complete
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Target className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <div className="text-sm text-slate-600 dark:text-slate-400">Tasks</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {sprint.tasks.filter(t => t.status === 'Completed').length}/{sprint.tasks.length}
                </div>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto text-green-600 mb-1" />
                <div className="text-sm text-slate-600 dark:text-slate-400">Team</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {sprint.team.length} members
                </div>
              </div>
              <div className="text-center">
                <Calendar className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                <div className="text-sm text-slate-600 dark:text-slate-400">Start Date</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {new Date(sprint.startDate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto text-orange-600 mb-1" />
                <div className="text-sm text-slate-600 dark:text-slate-400">End Date</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {new Date(sprint.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <Progress value={sprint.progress} className="h-2" />

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Tasks</h4>
              {sprint.tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'Completed' ? 'bg-emerald-500' :
                    task.status === 'In Progress' ? 'bg-blue-500' :
                    task.status === 'Review' ? 'bg-amber-500' : 'bg-slate-300'
                  }`}></div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{task.title}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {task.assignee} • {task.estimatedHours}h • {task.category}
                    </div>
                  </div>

                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>

                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCompletedSprints = () => (
    <div className="space-y-6">
      {completedSprints.map((sprint) => (
        <Card key={sprint.id} className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {sprint.name}
                </h3>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {sprint.goal}
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <span>Completed: {new Date(sprint.endDate).toLocaleDateString()}</span>
                <span>Team: {sprint.team.length} members</span>
                <span>Accelerator: {sprint.accelerator}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl text-emerald-600 mb-2">✅</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">100% Complete</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen p-8">
      <div className="relative max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Sprint Generator
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            AI-powered sprint planning that creates optimized task sequences based on accelerator best practices.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {[
              { id: 'generator', label: 'Generate Sprint', icon: Rocket },
              { id: 'active', label: 'Active Sprints', icon: Play },
              { id: 'completed', label: 'Completed', icon: CheckCircle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'generator' && renderSprintGenerator()}
        {activeTab === 'active' && renderActiveSprints()}
        {activeTab === 'completed' && renderCompletedSprints()}
      </div>
    </div>
  );
}