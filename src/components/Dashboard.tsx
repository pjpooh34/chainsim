import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  TrendingUp,
  TrendingDown, 
  Clock, 
  DollarSign, 
  Zap, 
  ArrowRight, 
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Target,
  Users,
  Calendar,
  Plus,
  Activity,
  Shield,
  Database,
  Globe
} from "lucide-react";

export default function Dashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [activeAccelerators] = useState([
    {
      id: 1,
      name: "AWS Migration Accelerator",
      type: "Cloud Migration",
      progress: 75,
      status: "In Progress",
      estimatedSavings: "$45,000",
      timeRemaining: "8 days",
      lastActivity: "2 hours ago",
      team: 5,
      priority: "High"
    },
    {
      id: 2,
      name: "DevOps Pipeline Setup",
      type: "Infrastructure", 
      progress: 45,
      status: "In Progress",
      estimatedSavings: "$25,000",
      timeRemaining: "15 days",
      lastActivity: "1 day ago",
      team: 3,
      priority: "Medium"
    },
    {
      id: 3,
      name: "Security Compliance Framework",
      type: "Security",
      progress: 90,
      status: "Finalizing",
      estimatedSavings: "$35,000",
      timeRemaining: "3 days",
      lastActivity: "30 minutes ago",
      team: 4,
      priority: "Critical"
    }
  ]);

  const stats = [
    {
      title: "Total Cost Savings",
      value: "$2.8M",
      change: "+23%",
      icon: DollarSign,
      trend: "up",
      subtitle: "This Quarter",
      description: "Enterprise cost optimization"
    },
    {
      title: "Active Accelerators",
      value: "24",
      change: "+8",
      icon: Zap,
      trend: "up",
      subtitle: "Currently Running",
      description: "Automated workflows"
    },
    {
      title: "Avg. Completion Time",
      value: "12 days",
      change: "-6 days",
      icon: Clock,
      trend: "up",
      subtitle: "Industry Leading",
      description: "Faster than traditional"
    },
    {
      title: "Success Rate",
      value: "97%",
      change: "+2%",
      icon: Target,
      trend: "up",
      subtitle: "All Projects",
      description: "Proven methodology"
    }
  ];

  const recentActivity = [
    {
      title: "Security Framework completed with zero critical vulnerabilities found",
      time: "30 minutes ago",
      type: "completion",
      impact: "high",
      icon: Shield
    },
    {
      title: "AI optimization identified $12K monthly savings opportunity",
      time: "2 hours ago", 
      type: "insight",
      impact: "high",
      icon: Database
    },
    {
      title: "DevOps Pipeline achieved 99.9% uptime milestone",
      time: "4 hours ago",
      type: "milestone",
      impact: "medium",
      icon: Activity
    },
    {
      title: "New accelerator templates published to enterprise marketplace",
      time: "1 day ago",
      type: "update",
      impact: "medium",
      icon: Globe
    }
  ];

  return (
    <div className="relative min-h-screen p-8">
      {/* Subtle cursor tracking effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Dashboard
                </h1>
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-blue-600 rounded-full"></div>
              </div>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Monitor your enterprise acceleration initiatives and track performance metrics in real-time.
              </p>
              
              {/* Status indicators */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">All Systems Operational</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">AI Engine Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                New Accelerator
              </Button>
            </div>
          </div>
        </div>

        {/* Stats grid with professional cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="relative p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group shadow-sm hover:shadow-lg"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        {stat.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{stat.subtitle}</p>
                    </div>
                    
                    {/* Icon */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium ${
                        stat.trend === 'up' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{stat.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Active Accelerators */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Active Accelerators
                </h2>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50">
                    {activeAccelerators.length} Running
                  </Badge>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Peak performance mode
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              {activeAccelerators.map((accelerator) => (
                <Card 
                  key={accelerator.id} 
                  className="relative p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 group shadow-sm hover:shadow-lg"
                >
                  {/* Priority indicator */}
                  {accelerator.priority === "Critical" && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-lg"></div>
                  )}
                  
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <div className="text-lg">
                            {accelerator.type === "Cloud Migration" && "☁️"}
                            {accelerator.type === "Infrastructure" && "⚙️"}
                            {accelerator.type === "Security" && "🔒"}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {accelerator.name}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs"
                            >
                              {accelerator.type}
                            </Badge>
                            {accelerator.priority === "Critical" && (
                              <Badge className="bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50 text-xs">
                                Critical
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                              <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">
                                {accelerator.estimatedSavings}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800/50">
                              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                              <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
                                {accelerator.timeRemaining}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2">
                          {accelerator.status === "Finalizing" ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                          )}
                          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{accelerator.progress}%</span>
                        </div>
                        <Badge 
                          className={`${
                            accelerator.status === "Finalizing" 
                              ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                              : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                          } text-xs`}
                        >
                          {accelerator.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Progress section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Progress</span>
                        <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{accelerator.team} members</span>
                          </div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span>Updated {accelerator.lastActivity}</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={accelerator.progress} 
                          className="h-2 bg-slate-200 dark:bg-slate-700" 
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        On track for completion
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Activity Feed
            </h2>
            
            <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                  >
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                        activity.impact === 'high' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                          {activity.time}
                        </div>
                        {activity.impact === 'high' && (
                          <Badge className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 text-xs">
                            High Impact
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button 
                  variant="ghost" 
                  className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  View All Activity
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                {[
                  { icon: Plus, text: "Start Discovery", description: "Begin new assessment" },
                  { icon: Users, text: "Invite Team", description: "Add collaborators" },
                  { icon: TrendingUp, text: "View Analytics", description: "Performance insights" }
                ].map((action, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300 p-4 h-auto"
                  >
                    <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action.text}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">{action.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}