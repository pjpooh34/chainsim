import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart3,
  TrendingUp,
  Activity,
  DollarSign,
  Users,
  Clock,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Code,
  PieChart,
  Radar,
  Globe,
  Server,
  Shield
} from 'lucide-react';

export default function AnalyticsDemo() {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleExport = () => {
    console.log('Exporting analytics data...');
    // Create a mock CSV export with analytics data
    const csvData = [
      ['Metric', 'Value', 'Period'],
      ['Total API Calls', usageMetrics.totalApiCalls, timeRange],
      ['Success Rate', `${usageMetrics.successRate}%`, timeRange],
      ['Avg Response Time', `${usageMetrics.avgResponseTime}ms`, timeRange],
      ['Active Projects', usageMetrics.activeProjects, timeRange],
      ['Monthly Growth', `${usageMetrics.monthlyGrowth}%`, timeRange],
      ['Cost Savings', `${usageMetrics.costSavings}`, timeRange]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chainsim-analytics-${timeRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const usageMetrics = {
    totalApiCalls: 45672,
    successRate: 98.7,
    avgResponseTime: 145,
    activeProjects: 12,
    monthlyGrowth: 23.5,
    costSavings: 47500,
    complianceScore: 96.2,
    uptime: 99.98
  };

  const apiEndpoints = [
    { endpoint: '/api/v2/assets/create', calls: 8934, successRate: 99.2, avgTime: 120 },
    { endpoint: '/api/v2/trades/execute', calls: 15678, successRate: 98.9, avgTime: 89 },
    { endpoint: '/api/v2/compliance/validate', calls: 12456, successRate: 97.8, avgTime: 234 },
    { endpoint: '/api/v2/portfolio/analyze', calls: 5623, successRate: 99.5, avgTime: 567 },
    { endpoint: '/api/v2/settlement/process', calls: 2981, successRate: 98.1, avgTime: 445 }
  ];

  const performanceData = [
    { time: '00:00', api: 1200, sandbox: 850, portfolio: 340, radar: 120 },
    { time: '04:00', api: 980, sandbox: 720, portfolio: 290, radar: 95 },
    { time: '08:00', api: 2100, sandbox: 1450, portfolio: 680, radar: 180 },
    { time: '12:00', api: 3200, sandbox: 2100, portfolio: 950, radar: 240 },
    { time: '16:00', api: 2800, sandbox: 1800, portfolio: 820, radar: 210 },
    { time: '20:00', api: 1600, sandbox: 1100, portfolio: 450, radar: 140 }
  ];

  const revenueMetrics = {
    mrr: 12500,
    arr: 150000,
    churnRate: 2.3,
    ltv: 24000,
    cac: 850,
    grossMargin: 89.5
  };

  const topCustomers = [
    { name: 'TechCorp Solutions', plan: 'Scale', usage: 15678, revenue: 799 },
    { name: 'FinanceFirst LLC', plan: 'Team', usage: 8934, revenue: 299 },
    { name: 'Global Trading Co', plan: 'Team', usage: 7234, revenue: 299 },
    { name: 'StartupABC', plan: 'Pro', usage: 3456, revenue: 99 },
    { name: 'Enterprise XYZ', plan: 'Scale', usage: 2987, revenue: 799 }
  ];

  const complianceMetrics = [
    { metric: 'KYC Validation Rate', value: 99.4, trend: 'up', change: 1.2 },
    { metric: 'AML Screening Success', value: 97.8, trend: 'up', change: 0.8 },
    { metric: 'Audit Trail Completeness', value: 100, trend: 'stable', change: 0 },
    { metric: 'Data Privacy Compliance', value: 98.9, trend: 'up', change: 2.1 },
    { metric: 'Settlement Accuracy', value: 99.97, trend: 'up', change: 0.03 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white dark:text-slate-900" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Analytics Dashboard
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time performance metrics, usage analytics, and business intelligence
              </p>
            </div>
          
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {usageMetrics.totalApiCalls.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">API Calls</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 text-emerald-600 mr-1" />
                  <span className="text-xs text-emerald-600 font-medium">+{usageMetrics.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {usageMetrics.successRate}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Success Rate</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 text-emerald-600 mr-1" />
                  <span className="text-xs text-emerald-600 font-medium">+0.3%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {usageMetrics.avgResponseTime}ms
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avg Response</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="w-3 h-3 text-emerald-600 mr-1" />
                  <span className="text-xs text-emerald-600 font-medium">-12ms</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ${revenueMetrics.mrr.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Revenue</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 text-emerald-600 mr-1" />
                  <span className="text-xs text-emerald-600 font-medium">+18%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Analytics Interface */}
        <Tabs defaultValue="usage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Usage Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      API Usage Over Time
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Sandbox</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Portfolio</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">RegRadar</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simplified chart representation */}
                  <div className="h-64 flex items-end space-x-4">
                    {performanceData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                        <div className="flex flex-col space-y-1 w-full">
                          <div 
                            className="bg-blue-600 rounded-t"
                            style={{ height: `${(data.sandbox / 25)}px` }}
                          ></div>
                          <div 
                            className="bg-purple-600"
                            style={{ height: `${(data.portfolio / 25)}px` }}
                          ></div>
                          <div 
                            className="bg-emerald-600 rounded-b"
                            style={{ height: `${(data.radar / 25)}px` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {data.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Service Usage
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                          <Code className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-slate-900 dark:text-slate-100">Sandbox</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">67%</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">30.7K calls</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950/30 rounded-lg flex items-center justify-center">
                          <PieChart className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-slate-900 dark:text-slate-100">Portfolio</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">23%</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">10.5K calls</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/30 rounded-lg flex items-center justify-center">
                          <Radar className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-900 dark:text-slate-100">RegRadar</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">10%</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">4.6K calls</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Active Projects
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {usageMetrics.activeProjects}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Total Projects
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Sandbox Projects</span>
                        <span className="text-slate-900 dark:text-slate-100">8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Portfolio Analyses</span>
                        <span className="text-slate-900 dark:text-slate-100">3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Radar Monitors</span>
                        <span className="text-slate-900 dark:text-slate-100">1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Endpoints Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Top API Endpoints
              </h3>
              
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <p className="font-mono text-sm text-slate-900 dark:text-slate-100 mb-1">
                        {endpoint.endpoint}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {endpoint.calls.toLocaleString()} calls
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {endpoint.successRate}%
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Success</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {endpoint.avgTime}ms
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Avg Time</p>
                      </div>
                      
                      <Badge className={
                        endpoint.successRate > 99 
                          ? 'bg-emerald-100 text-emerald-700'
                          : endpoint.successRate > 98 
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }>
                        {endpoint.successRate > 99 ? 'Excellent' : endpoint.successRate > 98 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  System Performance
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Response Time</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{usageMetrics.avgResponseTime}ms</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">Excellent performance</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Uptime</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{usageMetrics.uptime}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '99.98%'}}></div>
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">Above SLA target</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Error Rate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">0.8%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">Well within limits</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Infrastructure Status
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">API Gateway</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">All systems operational</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Database Cluster</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Optimal performance</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">CDN Network</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Global edge optimization</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Security Scanning</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Running scheduled scan</p>
                      </div>
                    </div>
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Monthly Recurring Revenue
                </h3>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    ${revenueMetrics.mrr.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">+18% from last month</span>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Scale Plans</span>
                      <span className="text-slate-900 dark:text-slate-100">$7,990</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Team Plans</span>
                      <span className="text-slate-900 dark:text-slate-100">$3,588</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Pro Plans</span>
                      <span className="text-slate-900 dark:text-slate-100">$891</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Add-ons</span>
                      <span className="text-slate-900 dark:text-slate-100">$231</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Key Metrics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">ARR</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      ${revenueMetrics.arr.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Churn Rate</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {revenueMetrics.churnRate}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">LTV</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      ${revenueMetrics.ltv.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">CAC</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      ${revenueMetrics.cac}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Gross Margin</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {revenueMetrics.grossMargin}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Cost Savings
                </h3>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600 mb-2">
                    ${usageMetrics.costSavings.toLocaleString()}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Annual Savings vs. Legacy Providers
                  </p>
                  
                  <div className="pt-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Projected at current growth rate:
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      $185,000 ARR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Compliance Metrics
                </h3>
                
                <div className="space-y-6">
                  {complianceMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600 dark:text-slate-400">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {metric.value}%
                          </span>
                          {metric.trend === 'up' && (
                            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{width: `${metric.value}%`}}
                        ></div>
                      </div>
                      {metric.change > 0 && (
                        <p className="text-sm text-emerald-600 mt-1">
                          +{metric.change}% improvement
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Security & Compliance Status
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">SOC 2 Type II</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Current certification</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">GDPR Compliance</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">EU data protection</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Compliant</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">ISO 27001</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Information security</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Certified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">PCI DSS</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Renewal pending</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Top Customers by Usage
              </h3>
              
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {customer.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            customer.plan === 'Scale' 
                              ? 'bg-purple-100 text-purple-700'
                              : customer.plan === 'Team'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }>
                            {customer.plan}
                          </Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {customer.usage.toLocaleString()} API calls
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        ${customer.revenue}/mo
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}