import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Play,
  Code,
  FileCode,
  Terminal,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Database,
  Shield,
  TrendingUp,
  Copy,
  Download,
  Settings,
  Book,
  Lightbulb,
  Activity,
  BarChart3,
  FileText,
  Users
} from 'lucide-react';

export default function SandboxDemo() {
  const [activeLanguage, setActiveLanguage] = useState<'javascript' | 'python'>('javascript');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [codeExample, setCodeExample] = useState('');

  const jsExample = `// ChainSim SDK - Tokenized Trade Example
import { ChainSim } from '@chainsim/sdk';

const chainSim = new ChainSim({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});

async function executeTokenizedTrade() {
  try {
    // Create a tokenized asset
    const asset = await chainSim.createAsset({
      symbol: 'AAPL-TOKEN',
      name: 'Apple Inc. Tokenized Shares',
      totalSupply: 1000000,
      decimals: 18,
      compliance: {
        kycRequired: true,
        amlChecks: true,
        accreditedOnly: false
      }
    });

    // Execute a trade with T+0 settlement
    const trade = await chainSim.executeTrade({
      assetId: asset.id,
      buyer: 'wallet_0x123...abc',
      seller: 'wallet_0x456...def',
      quantity: 100,
      price: 150.25,
      settlementCycle: 'T+0'
    });

    // Validate compliance
    const compliance = await chainSim.validateCompliance(trade.id);
    
    console.log('Trade executed:', trade);
    console.log('Compliance status:', compliance.passed);
    
    return {
      tradeId: trade.id,
      status: trade.status,
      complianceScore: compliance.score
    };
    
  } catch (error) {
    console.error('Trade failed:', error);
    throw error;
  }
}

// Run the simulation
executeTokenizedTrade()
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));`;

  const pythonExample = `# ChainSim SDK - Tokenized Trade Example
from chainsim import ChainSim
import asyncio

# Initialize the ChainSim client
client = ChainSim(
    api_key="your-api-key",
    environment="sandbox"
)

async def execute_tokenized_trade():
    """
    Demonstrate tokenized securities trading with T+0 settlement
    """
    try:
        # Create a tokenized asset
        asset = await client.create_asset(
            symbol="AAPL-TOKEN",
            name="Apple Inc. Tokenized Shares",
            total_supply=1000000,
            decimals=18,
            compliance={
                "kyc_required": True,
                "aml_checks": True,
                "accredited_only": False
            }
        )
        
        # Execute trade with instant settlement
        trade = await client.execute_trade(
            asset_id=asset.id,
            buyer="wallet_0x123...abc",
            seller="wallet_0x456...def", 
            quantity=100,
            price=150.25,
            settlement_cycle="T+0"
        )
        
        # Run compliance validation
        compliance = await client.validate_compliance(trade.id)
        
        print(f"Trade executed: {trade.id}")
        print(f"Compliance passed: {compliance.passed}")
        
        return {
            "trade_id": trade.id,
            "status": trade.status,
            "compliance_score": compliance.score
        }
        
    except Exception as error:
        print(f"Trade failed: {error}")
        raise error

# Run the simulation
async def main():
    try:
        result = await execute_tokenized_trade()
        print(f"Success: {result}")
    except Exception as e:
        print(f"Error: {e}")

# Execute the demo
if __name__ == "__main__":
    asyncio.run(main())`;

  const runSimulation = async () => {
    setSimulationRunning(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSimulationResults({
      tradeId: 'trade_' + Math.random().toString(36).substr(2, 9),
      status: 'completed',
      executionTime: '0.245s',
      gasUsed: '0.00234 ETH',
      complianceScore: 98.5,
      settlementTime: 'T+0 (Instant)',
      auditLog: [
        { timestamp: '2024-01-15T10:30:00Z', event: 'Trade initiated', status: 'success' },
        { timestamp: '2024-01-15T10:30:01Z', event: 'KYC validation', status: 'success' },
        { timestamp: '2024-01-15T10:30:01Z', event: 'AML screening', status: 'success' },
        { timestamp: '2024-01-15T10:30:02Z', event: 'Settlement executed', status: 'success' },
        { timestamp: '2024-01-15T10:30:02Z', event: 'Compliance verified', status: 'success' }
      ],
      performance: {
        throughput: '10,000 TPS',
        latency: '50ms avg',
        uptime: '99.99%'
      }
    });
    
    setSimulationRunning(false);
  };

  const handleCopyCode = () => {
    const codeText = activeLanguage === 'javascript' ? jsExample : pythonExample;
    navigator.clipboard.writeText(codeText).then(() => {
      console.log('Code copied to clipboard!');
      // You could add a toast notification here in a real app
    });
  };

  const handleExportCode = () => {
    const codeText = activeLanguage === 'javascript' ? jsExample : pythonExample;
    const extension = activeLanguage === 'javascript' ? 'js' : 'py';
    const blob = new Blob([codeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chainsim-example.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewDocs = () => {
    window.open('https://docs.chainsim.dev', '_blank');
  };

  const handleSuggestionClick = (suggestion: any) => {
    console.log('Applying suggestion:', suggestion.title);
    // In a real app, this would modify the code editor
    setCodeExample(suggestion.code);
  };

  const copilotSuggestions = [
    {
      title: 'Try Multi-Asset Trading',
      description: 'Simulate trading multiple tokenized securities in a single transaction',
      code: 'chainSim.batchTrade([trade1, trade2, trade3])'
    },
    {
      title: 'Test Compliance Scenarios',
      description: 'Explore different regulatory requirements and jurisdictions',
      code: 'chainSim.setJurisdiction("EU").enableGDPR()'
    },
    {
      title: 'Stress Test Settlement',
      description: 'Run high-volume trading scenarios to test system limits',
      code: 'chainSim.stressTest({ volume: 100000, duration: "1h" })'
    }
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
                  <Code className="w-4 h-4 text-white dark:text-slate-900" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Simulation Environment
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Production-grade tokenized securities simulation with comprehensive SDK support
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-md border border-emerald-200 dark:border-emerald-800">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              <Button variant="outline" size="sm" className="text-slate-600 dark:text-slate-400">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">247</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">API Calls Today</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">98.5%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Success Rate</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">145ms</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avg Response</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">100%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Compliance</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Sandbox Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      Development Environment
                    </h3>
                    <Select value={activeLanguage} onValueChange={(value: any) => setActiveLanguage(value)}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={handleCopyCode}>
                      <Copy className="w-3 h-3 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={handleExportCode}>
                      <Download className="w-3 h-3 mr-2" />
                      Export
                    </Button>
                    <Button 
                      onClick={runSimulation}
                      disabled={simulationRunning}
                      size="sm"
                      className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 h-8"
                    >
                      {simulationRunning ? (
                        <>
                          <Activity className="w-3 h-3 mr-2 animate-spin" />
                          Running
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-2" />
                          Execute
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-950 p-6 overflow-x-auto rounded-b-lg">
                <pre className="text-green-400 text-sm leading-relaxed">
                  <code>
                    {activeLanguage === 'javascript' ? jsExample : pythonExample}
                  </code>
                </pre>
              </div>
            </div>

            {/* Simulation Results */}
            {simulationResults && (
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      Execution Results
                    </h3>
                    <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded text-sm">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span>Success</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="audit">Audit Log</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Trade ID:</span>
                            <span className="font-mono text-slate-900 dark:text-slate-100">
                              {simulationResults.tradeId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Status:</span>
                            <Badge className="bg-emerald-100 text-emerald-700">
                              {simulationResults.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Execution Time:</span>
                            <span className="text-slate-900 dark:text-slate-100">
                              {simulationResults.executionTime}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Gas Used:</span>
                            <span className="text-slate-900 dark:text-slate-100">
                              {simulationResults.gasUsed}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Compliance Score:</span>
                            <span className="text-emerald-600 font-semibold">
                              {simulationResults.complianceScore}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Settlement:</span>
                            <span className="text-slate-900 dark:text-slate-100">
                              {simulationResults.settlementTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="audit" className="space-y-4">
                      <div className="space-y-3">
                        {simulationResults.auditLog.map((log: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 dark:text-slate-100">
                                {log.event}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700">
                              {log.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {simulationResults.performance.throughput}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Throughput</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {simulationResults.performance.latency}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Latency</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {simulationResults.performance.uptime}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Uptime</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Copilot */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  AI Copilot
                </h3>
              </div>
            
              <div className="space-y-4">
                {copilotSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {suggestion.description}
                    </p>
                    <code className="text-xs bg-slate-900 text-green-400 p-2 rounded block">
                      {suggestion.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* API Documentation */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Book className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Quick Reference
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Asset Creation
                  </p>
                  <code className="text-xs text-slate-600 dark:text-slate-400">
                    createAsset(params)
                  </code>
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Trade Execution
                  </p>
                  <code className="text-xs text-slate-600 dark:text-slate-400">
                    executeTrade(params)
                  </code>
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Compliance Check
                  </p>
                  <code className="text-xs text-slate-600 dark:text-slate-400">
                    validateCompliance(id)
                  </code>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4" onClick={handleViewDocs}>
                <FileText className="w-4 h-4 mr-2" />
                Full Documentation
              </Button>
            </div>

            {/* Connection Status */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Connection Status
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Environment:</span>
                  <Badge className="bg-blue-100 text-blue-700">Sandbox</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Region:</span>
                  <span className="text-slate-900 dark:text-slate-100">US-East-1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">API Version:</span>
                  <span className="text-slate-900 dark:text-slate-100">v2.1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}