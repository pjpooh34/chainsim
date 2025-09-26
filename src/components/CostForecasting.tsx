import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  DollarSign, 
  Upload, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  FileText,
  Target
} from 'lucide-react';

export default function CostForecasting() {
  const [billUploaded, setBillUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [forecastResults, setForecastResults] = useState<any>(null);

  const handleUploadBill = () => {
    setBillUploaded(true);
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setForecastResults({
        currentSpend: {
          monthly: 3420,
          trending: 'up',
          change: 12
        },
        breakdown: {
          compute: { cost: 1245, percentage: 36.4 },
          storage: { cost: 567, percentage: 16.6 },
          networking: { cost: 423, percentage: 12.4 },
          database: { cost: 689, percentage: 20.1 },
          other: { cost: 496, percentage: 14.5 }
        },
        projections: [
          {
            scenario: 'Current Trajectory',
            description: 'Continue with existing usage patterns',
            cost: 4100,
            change: 20,
            confidence: 92
          },
          {
            scenario: 'Planned Migration',
            description: 'Migrate 3 workloads to containers',
            cost: 2890,
            change: -15.5,
            confidence: 85,
            savings: 530
          },
          {
            scenario: 'Full Optimization',
            description: 'Right-size instances + reserved capacity',
            cost: 2340,
            change: -31.6,
            confidence: 78,
            savings: 1080
          }
        ],
        optimizations: [
          {
            category: 'EC2 Instances',
            current: 1245,
            optimized: 890,
            savings: 355,
            action: 'Right-size 4 over-provisioned instances',
            effort: 'Low'
          },
          {
            category: 'RDS Database',
            current: 689,
            optimized: 445,
            savings: 244,
            action: 'Move to Aurora Serverless for dev/test',
            effort: 'Medium'
          },
          {
            category: 'Storage',
            current: 567,
            optimized: 398,
            savings: 169,
            action: 'Implement lifecycle policies for S3',
            effort: 'Low'
          }
        ],
        timeline: [
          { month: 'Jan', current: 3420, optimized: 3420 },
          { month: 'Feb', current: 3550, optimized: 3200 },
          { month: 'Mar', current: 3680, optimized: 2980 },
          { month: 'Apr', current: 3820, optimized: 2760 },
          { month: 'May', current: 3960, optimized: 2540 },
          { month: 'Jun', current: 4100, optimized: 2340 }
        ]
      });
      setIsAnalyzing(false);
    }, 3500);
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-red-600' : 'text-emerald-600';
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              AI Cost Forecasting
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Upload your AWS bill for AI-generated cost projection scenarios and savings opportunities
          </p>
        </div>

        {/* Upload Section */}
        {!billUploaded ? (
          <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Upload AWS Bill
              </h2>
              
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12">
                <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Upload your AWS Cost and Usage Report
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Supports CSV, JSON, or PDF billing reports
                </p>
                <Button 
                  onClick={handleUploadBill}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Secure processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Data not stored</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Planning tool only</span>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  AWS Bill Uploaded Successfully
                </span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                aws-bill-2024-01.csv
              </Badge>
            </div>
          </Card>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Analyzing Your AWS Spending
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                AI is processing your usage patterns and generating cost forecasts...
              </p>
              <Progress value={65} className="w-full max-w-md mx-auto" />
            </div>
          </Card>
        )}

        {/* Results Section */}
        {forecastResults && (
          <div className="space-y-6">
            {/* Current Spend Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      Current Monthly Spend
                    </h3>
                    <Badge className={`${getChangeColor(forecastResults.currentSpend.change)} bg-opacity-10`}>
                      {getChangeIcon(forecastResults.currentSpend.change)}
                      {Math.abs(forecastResults.currentSpend.change)}%
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    ${forecastResults.currentSpend.monthly.toLocaleString()}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Based on last 30 days of usage
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  {Object.entries(forecastResults.breakdown).map(([service, data]: [string, any]) => (
                    <div key={service} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                        <span className="capitalize font-medium text-slate-700 dark:text-slate-300">
                          {service}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          ${data.cost}
                        </div>
                        <div className="text-sm text-slate-500">
                          {data.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Cost Projections */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                6-Month Cost Projections
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {forecastResults.projections.map((projection: any, index: number) => (
                  <div key={index} className={`p-6 border rounded-lg ${
                    projection.scenario === 'Full Optimization' 
                      ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">
                          {projection.scenario}
                        </h3>
                        {projection.scenario === 'Full Optimization' && (
                          <Badge className="bg-emerald-600 text-white">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {projection.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          ${projection.cost.toLocaleString()}
                        </div>
                        
                        <div className={`flex items-center space-x-1 ${getChangeColor(projection.change)}`}>
                          {getChangeIcon(projection.change)}
                          <span className="font-semibold">
                            {Math.abs(projection.change)}% vs current
                          </span>
                        </div>
                        
                        {projection.savings && (
                          <div className="text-emerald-600 font-semibold">
                            Save ${projection.savings}/month
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <Progress value={projection.confidence} className="flex-1" />
                          <span className="text-sm text-slate-500">
                            {projection.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Optimization Opportunities */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Optimization Opportunities
              </h2>
              <div className="space-y-4">
                {forecastResults.optimizations.map((opt: any, index: number) => (
                  <div key={index} className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">
                          {opt.category}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {opt.action}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          ${opt.current}
                        </div>
                        <div className="text-sm text-slate-500">Current</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          ${opt.optimized}
                        </div>
                        <div className="text-sm text-slate-500">Optimized</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          ${opt.savings}
                        </div>
                        <div className="text-sm text-slate-500">Monthly Savings</div>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${
                            opt.effort === 'Low' 
                              ? 'text-emerald-600 border-emerald-200' 
                              : 'text-amber-600 border-amber-200'
                          }`}
                        >
                          {opt.effort} Effort
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                      Total Potential Savings
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 font-bold text-lg">
                      ${forecastResults.optimizations.reduce((sum: number, opt: any) => sum + opt.savings, 0)}/month 
                      = ${forecastResults.optimizations.reduce((sum: number, opt: any) => sum + opt.savings, 0) * 12}/year
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cost Timeline Chart Placeholder */}
            <Card className="p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  6-Month Cost Projection
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Current Trajectory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>With Optimization</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Interactive cost projection chart would be displayed here
                  </p>
                </div>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
                    Important Disclaimer
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    These cost projections are estimates based on historical usage patterns and should be used for 
                    planning purposes only. Actual costs may vary based on usage changes, AWS pricing updates, and 
                    other factors. We do not guarantee the accuracy of these projections and recommend validating 
                    all cost optimization strategies in a test environment first.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Detailed Report
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Review Meeting
              </Button>
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Start Optimization Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}