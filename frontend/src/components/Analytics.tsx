import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Zap,
  Target,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Shield
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Mock data for charts
  const costSavingsData = [
    { month: 'Jan', savings: 45000, projected: 40000 },
    { month: 'Feb', savings: 52000, projected: 45000 },
    { month: 'Mar', savings: 48000, projected: 50000 },
    { month: 'Apr', savings: 61000, projected: 55000 },
    { month: 'May', savings: 58000, projected: 60000 },
    { month: 'Jun', savings: 67000, projected: 65000 }
  ];

  const acceleratorPerformance = [
    { name: 'Migration', completed: 8, inProgress: 3, success: 95 },
    { name: 'DevOps', completed: 12, inProgress: 5, success: 88 },
    { name: 'Security', completed: 6, inProgress: 2, success: 97 },
    { name: 'Analytics', completed: 4, inProgress: 1, success: 92 },
    { name: 'Database', completed: 7, inProgress: 2, success: 89 }
  ];

  const timeToValueData = [
    { accelerator: 'Migration Pro', standardTime: 120, actualTime: 78, savings: 35 },
    { accelerator: 'DevOps Starter', standardTime: 90, actualTime: 62, savings: 31 },
    { accelerator: 'Security Framework', standardTime: 75, actualTime: 53, savings: 29 },
    { accelerator: 'Analytics Platform', standardTime: 150, actualTime: 95, savings: 37 },
    { accelerator: 'Database Modern', standardTime: 105, actualTime: 71, savings: 32 }
  ];

  const utilizationData = [
    { name: 'Compute', value: 78, target: 85 },
    { name: 'Storage', value: 82, target: 80 },
    { name: 'Network', value: 65, target: 75 },
    { name: 'Database', value: 88, target: 85 }
  ];

  const riskMetrics = [
    { category: 'Security', score: 92, trend: 'up', issues: 2 },
    { category: 'Compliance', score: 89, trend: 'up', issues: 1 },
    { category: 'Performance', score: 85, trend: 'down', issues: 3 },
    { category: 'Cost', score: 94, trend: 'up', issues: 0 }
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const kpis = [
    {
      title: "Total Cost Savings",
      value: "$1.2M",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      description: "Compared to last quarter"
    },
    {
      title: "Average Time to Value",
      value: "18 days",
      change: "-12 days",
      trend: "up", 
      icon: Clock,
      description: "50% faster than industry average"
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      description: "Accelerator completion rate"
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+6",
      trend: "up",
      icon: Zap,
      description: "Across 8 teams"
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Track performance, measure impact, and identify optimization opportunities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-3xl font-semibold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="risks">Risk & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Cost Savings Trend</h3>
                  <Badge variant="outline">Monthly</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={costSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.2}
                      name="Actual Savings"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="#94a3b8"
                      fill="#94a3b8"
                      fillOpacity={0.1}
                      strokeDasharray="5 5"
                      name="Projected"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Accelerator Distribution</h3>
                  <Badge variant="outline">By Type</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={acceleratorPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="completed"
                    >
                      {acceleratorPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Time to Value Comparison</h3>
                <Badge variant="outline">Days</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeToValueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="accelerator" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="standardTime" fill="#94a3b8" name="Industry Standard" />
                  <Bar dataKey="actualTime" fill="#2563eb" name="Actual Time" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Success Rates by Category</h3>
                <div className="space-y-4">
                  {acceleratorPerformance.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.success}%</span>
                      </div>
                      <Progress value={item.success} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Status Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-semibold text-success">37</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-semibold text-primary">13</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-semibold text-warning">5</div>
                    <div className="text-sm text-muted-foreground">Delayed</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-semibold text-muted-foreground">2</div>
                    <div className="text-sm text-muted-foreground">Cancelled</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Team Performance</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { team: 'Platform Team', velocity: 85, projects: 8 },
                  { team: 'Security Team', velocity: 92, projects: 6 },
                  { team: 'Data Team', velocity: 78, projects: 5 }
                ].map((team, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{team.team}</h4>
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Velocity Score</span>
                          <span>{team.velocity}%</span>
                        </div>
                        <Progress value={team.velocity} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {team.projects} active projects
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resource Utilization</h3>
                <div className="space-y-4">
                  {utilizationData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <div className="flex items-center space-x-2 text-sm">
                          <span>{item.value}%</span>
                          <span className="text-muted-foreground">/ {item.target}% target</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={item.value} className="h-2" />
                        {item.value < item.target && (
                          <div className="text-xs text-warning">Below target</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cost Optimization Opportunities</h3>
                <div className="space-y-3">
                  {[
                    { resource: 'Unused EC2 Instances', savings: '$12,450/month', priority: 'High' },
                    { resource: 'Oversized RDS Instances', savings: '$8,200/month', priority: 'Medium' },
                    { resource: 'Unattached EBS Volumes', savings: '$3,600/month', priority: 'Low' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{item.resource}</div>
                        <div className="text-xs text-muted-foreground">Potential savings: {item.savings}</div>
                      </div>
                      <Badge variant={
                        item.priority === 'High' ? 'destructive' :
                        item.priority === 'Medium' ? 'default' : 'secondary'
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Risk Assessment</h3>
                <div className="space-y-4">
                  {riskMetrics.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{risk.category}</div>
                          <div className="text-sm text-muted-foreground">
                            {risk.issues} open issues
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{risk.score}</span>
                        {risk.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Compliance Status</h3>
                <div className="space-y-3">
                  {[
                    { framework: 'SOC 2 Type II', status: 'Compliant', lastAudit: '2 months ago' },
                    { framework: 'ISO 27001', status: 'In Progress', lastAudit: '6 months ago' },
                    { framework: 'PCI DSS', status: 'Compliant', lastAudit: '1 month ago' },
                    { framework: 'GDPR', status: 'Action Required', lastAudit: '3 months ago' }
                  ].map((compliance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{compliance.framework}</div>
                        <div className="text-sm text-muted-foreground">Last audit: {compliance.lastAudit}</div>
                      </div>
                      <Badge variant={
                        compliance.status === 'Compliant' ? 'default' :
                        compliance.status === 'In Progress' ? 'secondary' : 'destructive'
                      }>
                        {compliance.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}