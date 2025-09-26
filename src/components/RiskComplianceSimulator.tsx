import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  TrendingDown,
  TrendingUp,
  Activity,
  Zap,
  Database,
  Eye,
  FileText,
  Users,
  Building,
  Globe,
  Target,
  Layers,
  BarChart3,
  PieChart,
  LineChart,
  HeatMapIcon,
  AlertCircle,
  ChevronRight,
  Plus,
  Filter,
  Calendar,
  Search
} from 'lucide-react';

// Mock data for risk scenarios
const riskScenarios = [
  {
    id: 'kyc_failure_cascade',
    name: 'KYC Failure Cascade',
    description: 'Simulate the impact of multiple KYC verification failures during high-volume trading',
    category: 'Compliance',
    severity: 'high',
    duration: '15 mins',
    lastRun: '2024-09-05',
    status: 'completed',
    riskScore: 8.7,
    affectedSystems: ['Trading', 'Settlement', 'Custody', 'Reporting'],
    parameters: {
      failureRate: 15,
      volumeMultiplier: 3.2,
      cascadeDelay: 30,
      recoveryTime: 120
    },
    results: {
      tradingHalts: 3,
      settlementDelays: 47,
      complianceAlerts: 23,
      regulatoryReports: 8
    }
  },
  {
    id: 'custody_break_chain',
    name: 'Custody Break Chain Reaction',
    description: 'Test system resilience when custody provider experiences technical failures',
    category: 'Operations',
    severity: 'critical',
    duration: '25 mins',
    lastRun: '2024-09-03',
    status: 'in_progress',
    riskScore: 9.2,
    affectedSystems: ['Custody', 'Settlement', 'Risk Management', 'Client Reporting'],
    parameters: {
      custodyFailureRate: 8,
      fallbackActivation: 45,
      dataIntegrity: 95,
      clientImpact: 234
    },
    results: null
  },
  {
    id: 'material_rights_mismatch',
    name: 'Material Rights Mismatch',
    description: 'Analyze impact of corporate action rights misalignment between traditional and tokenized assets',
    category: 'Corporate Actions',
    severity: 'medium',
    duration: '20 mins',
    lastRun: '2024-09-01',
    status: 'scheduled',
    riskScore: 6.4,
    affectedSystems: ['Corporate Actions', 'Entitlements', 'Tax Reporting', 'Client Communications'],
    parameters: {
      mismatchRate: 5,
      assetTypes: 12,
      clientSegments: 3,
      correctionWindow: 72
    },
    results: {
      entitlementErrors: 156,
      clientInquiries: 89,
      manualCorrections: 23,
      regulatoryExceptions: 4
    }
  },
  {
    id: 'liquidity_stress_test',
    name: 'Liquidity Stress Test',
    description: 'Extreme market volatility impact on tokenized asset liquidity and pricing',
    category: 'Market Risk',
    severity: 'high',
    duration: '30 mins',
    lastRun: '2024-08-28',
    status: 'completed',
    riskScore: 8.1,
    affectedSystems: ['Trading', 'Pricing', 'Risk Management', 'Margin Calculations'],
    parameters: {
      volatilitySpike: 45,
      liquidityDrop: 60,
      marginCalls: 78,
      priceDiscrepancy: 12
    },
    results: {
      forcedSales: 23,
      pricingErrors: 7,
      marginDeficits: 45,
      clientExposure: 892000
    }
  }
];

const heatmapData = [
  { system: 'Trading Engine', kyc: 3, custody: 8, rights: 2, liquidity: 7 },
  { system: 'Settlement', kyc: 9, custody: 9, rights: 4, liquidity: 5 },
  { system: 'Custody Systems', kyc: 2, custody: 10, rights: 1, liquidity: 3 },
  { system: 'Risk Management', kyc: 6, custody: 7, rights: 3, liquidity: 9 },
  { system: 'Compliance', kyc: 10, custody: 4, rights: 8, liquidity: 2 },
  { system: 'Client Reporting', kyc: 5, custody: 6, rights: 9, liquidity: 4 },
  { system: 'Regulatory Reporting', kyc: 8, custody: 3, rights: 7, liquidity: 1 },
  { system: 'Corporate Actions', kyc: 1, custody: 2, rights: 10, liquidity: 3 }
];

const alertsAndIncidents = [
  {
    id: 'alert_001',
    type: 'Critical',
    title: 'Custody Provider API Timeout',
    description: 'Primary custody provider experiencing intermittent API timeouts affecting 23% of transactions',
    timestamp: '2024-09-08 14:32',
    status: 'active',
    affectedClients: 247,
    estimatedImpact: 'High',
    scenario: 'custody_break_chain'
  },
  {
    id: 'alert_002',
    type: 'Warning',
    title: 'KYC Verification Backlog',
    description: 'KYC verification queue exceeding normal processing times due to increased volume',
    timestamp: '2024-09-08 13:15',
    status: 'monitoring',
    affectedClients: 89,
    estimatedImpact: 'Medium',
    scenario: 'kyc_failure_cascade'
  },
  {
    id: 'alert_003',
    type: 'Info',
    title: 'Corporate Action Processing Delay',
    description: 'Dividend processing for tokenized REIT shares delayed by 2 hours due to rights reconciliation',
    timestamp: '2024-09-08 11:45',
    status: 'resolved',
    affectedClients: 156,
    estimatedImpact: 'Low',
    scenario: 'material_rights_mismatch'
  }
];

const complianceChecks = [
  {
    category: 'KYC/AML',
    checks: [
      { name: 'Identity Verification', status: 'passing', score: 94 },
      { name: 'Sanctions Screening', status: 'warning', score: 87 },
      { name: 'PEP Identification', status: 'passing', score: 96 },
      { name: 'Source of Funds', status: 'failing', score: 72 }
    ]
  },
  {
    category: 'Market Compliance',
    checks: [
      { name: 'Best Execution', status: 'passing', score: 91 },
      { name: 'Market Manipulation Detection', status: 'passing', score: 88 },
      { name: 'Insider Trading Monitoring', status: 'warning', score: 83 },
      { name: 'Position Limits', status: 'passing', score: 95 }
    ]
  },
  {
    category: 'Operational Risk',
    checks: [
      { name: 'Settlement Failure Monitoring', status: 'warning', score: 79 },
      { name: 'Custody Reconciliation', status: 'failing', score: 68 },
      { name: 'Data Quality Checks', status: 'passing', score: 92 },
      { name: 'Disaster Recovery Readiness', status: 'passing', score: 89 }
    ]
  }
];

export default function RiskComplianceSimulator() {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState(riskScenarios[0]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const runSimulation = async () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSimulationProgress(i);
    }
    
    setSimulationRunning(false);
    setSimulationProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scheduled': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Info': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case 'passing': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'failing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHeatmapColor = (value: number) => {
    if (value >= 8) return 'bg-red-500';
    if (value >= 6) return 'bg-orange-500';
    if (value >= 4) return 'bg-yellow-500';
    if (value >= 2) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Risk & Compliance Simulator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Stress test edge cases, analyze system resilience, and generate comprehensive risk heatmaps
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-red-100 text-red-700 border-red-200 px-3 py-1">
            <Shield className="w-4 h-4 mr-1" />
            3 Active Alerts
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Scenario
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">8.7</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg Risk Score</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">156</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Simulations Run</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">92%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">System Resilience</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Incidents</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full lg:w-auto">
          <TabsTrigger value="scenarios" className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Scenarios</span>
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Risk Heatmap</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
        </TabsList>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Scenario List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Risk Scenarios
                </h3>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              {riskScenarios.map((scenario) => (
                <Card 
                  key={scenario.id} 
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedScenario.id === scenario.id 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : ''
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getSeverityColor(scenario.severity)}>
                        {scenario.severity}
                      </Badge>
                      <Badge className={getStatusColor(scenario.status)}>
                        {scenario.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {scenario.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {scenario.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Risk Score:</span>
                      <span className="font-bold text-red-600">{scenario.riskScore}/10</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                      <span className="font-medium">{scenario.duration}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Scenario Details */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {selectedScenario.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {selectedScenario.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getSeverityColor(selectedScenario.severity)}>
                        {selectedScenario.severity}
                      </Badge>
                      <Badge variant="outline">{selectedScenario.category}</Badge>
                    </div>
                  </div>

                  {/* Risk Score Visualization */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-slate-100">Risk Score</span>
                      <span className="text-2xl font-bold text-red-600">{selectedScenario.riskScore}/10</span>
                    </div>
                    <Progress value={selectedScenario.riskScore * 10} className="h-3" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  {/* Affected Systems */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Affected Systems
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedScenario.affectedSystems.map((system, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-slate-900 dark:text-slate-100">{system}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulation Parameters */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Simulation Parameters
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(selectedScenario.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                            {key.includes('Rate') ? '%' : key.includes('Time') ? 's' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results (if available) */}
                  {selectedScenario.results && (
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Last Simulation Results
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(selectedScenario.results).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-bold text-blue-700 dark:text-blue-300">
                              {typeof value === 'number' ? value.toLocaleString() : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simulation Progress */}
                  {simulationRunning && (
                    <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span className="font-medium text-blue-900 dark:text-blue-100">
                          Running Simulation... {simulationProgress}%
                        </span>
                      </div>
                      <Progress value={simulationProgress} className="h-2" />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View History
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {simulationRunning ? (
                        <Button variant="outline" onClick={() => setSimulationRunning(false)}>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={runSimulation}>
                          <Play className="w-4 h-4 mr-2" />
                          Run Simulation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Risk Heatmap Tab */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  System Risk Heatmap
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Impact analysis across systems and risk scenarios
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Risk Level:</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs">Low</span>
                    <div className="w-3 h-3 bg-green-500 rounded ml-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs">High</span>
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-slate-600 dark:text-slate-400">System</th>
                    <th className="text-center p-3 text-sm font-medium text-slate-600 dark:text-slate-400">KYC Failure</th>
                    <th className="text-center p-3 text-sm font-medium text-slate-600 dark:text-slate-400">Custody Break</th>
                    <th className="text-center p-3 text-sm font-medium text-slate-600 dark:text-slate-400">Rights Mismatch</th>
                    <th className="text-center p-3 text-sm font-medium text-slate-600 dark:text-slate-400">Liquidity Stress</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, index) => (
                    <tr key={index}>
                      <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                        {row.system}
                      </td>
                      <td className="p-3 text-center">
                        <div className={`w-8 h-8 mx-auto rounded ${getHeatmapColor(row.kyc)} flex items-center justify-center text-white text-sm font-bold`}>
                          {row.kyc}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className={`w-8 h-8 mx-auto rounded ${getHeatmapColor(row.custody)} flex items-center justify-center text-white text-sm font-bold`}>
                          {row.custody}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className={`w-8 h-8 mx-auto rounded ${getHeatmapColor(row.rights)} flex items-center justify-center text-white text-sm font-bold`}>
                          {row.rights}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className={`w-8 h-8 mx-auto rounded ${getHeatmapColor(row.liquidity)} flex items-center justify-center text-white text-sm font-bold`}>
                          {row.liquidity}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Risk Analysis Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Risk Distribution by Category
              </h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <PieChart className="w-12 h-12 mx-auto text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">Risk category breakdown</p>
                  <p className="text-sm text-slate-500">Compliance, Operations, Market Risk</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Risk Trends Over Time
              </h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <LineChart className="w-12 h-12 mx-auto text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">Risk score evolution</p>
                  <p className="text-sm text-slate-500">30-day risk trend analysis</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {complianceChecks.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {category.category}
                    </h3>
                    <Badge variant="outline">
                      {category.checks.filter(c => c.status === 'passing').length}/{category.checks.length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {check.status === 'passing' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : check.status === 'warning' ? (
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {check.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${getCheckStatusColor(check.status)}`}>
                            {check.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Overall Score:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {Math.round(category.checks.reduce((acc, check) => acc + check.score, 0) / category.checks.length)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Compliance Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Recommended Actions
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Fix Custody Reconciliation</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Critical compliance issue requiring immediate attention</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive">
                  Address Now
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Review Sanctions Screening</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Warning threshold reached for sanctions compliance</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Active Alerts & Incidents
            </h3>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {alertsAndIncidents.map((alert) => (
              <Card key={alert.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={getAlertColor(alert.type)}>
                        {alert.type}
                      </Badge>
                      <Badge variant="outline">{alert.status}</Badge>
                      <span className="text-sm text-slate-500">{alert.timestamp}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {alert.title}
                    </h4>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {alert.description}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>{alert.affectedClients} affected clients</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-slate-500" />
                        <span>Impact: {alert.estimatedImpact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-slate-500" />
                        <span>Scenario: {alert.scenario.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <Button size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Investigate
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Details
                    </Button>
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