import { useState, useEffect } from "react";
import ChainSimHomepage from "./components/ChainSimHomepage";
import SandboxDemo from "./components/SandboxDemo";
import PortfolioDemo from "./components/PortfolioDemo";
import RegRadarDemo from "./components/RegRadarDemo";
import AnalyticsDemo from "./components/AnalyticsDemo";
import LiveAnalytics from "./components/LiveAnalytics";
import ReadinessCenter from "./components/ReadinessCenter";
import InvestorCommsGenerator from "./components/InvestorCommsGenerator";
import RiskComplianceSimulator from "./components/RiskComplianceSimulator";
import Settings from "./components/Settings";
import PricingPlans from "./components/PricingPlans";
import BillingManagement from "./components/BillingManagement";
import { Button } from "./components/ui/button";
import AuthDialog from "./components/AuthDialog";
import { AuthAPI } from "./lib/api";
import { 
  Home,
  Code,
  PieChart,
  Radar,
  BarChart3,
  Settings as SettingsIcon,
  CheckCircle,
  FileText,
  Shield,
  Menu,
  X,
  Layers,
  CreditCard,
  DollarSign
} from "lucide-react";
import type { AppView } from "./types/navigation";

type ActiveView = AppView;

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const navigation = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: Home, 
      description: 'Platform Overview',
      showInSidebar: !isAuthenticated
    },
    { 
      id: 'sandbox', 
      name: 'Sandbox', 
      icon: Code, 
      description: 'Simulation Environment',
      showInSidebar: true
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio Copilot', 
      icon: PieChart, 
      description: 'RIA Analytics Tool',
      showInSidebar: true
    },
    { 
      id: 'regRadar', 
      name: 'RegRadar', 
      icon: Radar, 
      description: 'Regulatory Intelligence',
      showInSidebar: true
    },
    { 
      id: 'readiness', 
      name: 'Readiness Center', 
      icon: CheckCircle, 
      description: 'Guided Assessments',
      showInSidebar: true
    },
    { 
      id: 'investorComms', 
      name: 'Investor Comms', 
      icon: FileText, 
      description: 'Communication Generator',
      showInSidebar: true
    },
    { 
      id: 'riskCompliance', 
      name: 'Risk & Compliance', 
      icon: Shield, 
      description: 'Stress Testing',
      showInSidebar: true
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3, 
      description: 'Usage & Performance',
      showInSidebar: true
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: SettingsIcon, 
      description: 'Configuration',
      showInSidebar: true
    },
    { 
      id: 'pricing', 
      name: 'Pricing', 
      icon: DollarSign, 
      description: 'Subscription Plans',
      showInSidebar: true
    },
    { 
      id: 'billing', 
      name: 'Billing', 
      icon: CreditCard, 
      description: 'Manage Subscription',
      showInSidebar: true
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartTrial = () => {
    setActiveView('sandbox');
  };

  useEffect(() => {
    // Try to fetch current user on load
    AuthAPI.me()
      .then((u) => {
        setCurrentUser(u);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setCurrentUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  const handleAuthed = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    if (activeView === 'home') setActiveView('sandbox');
  };

  const handleLogout = async () => {
    await AuthAPI.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveView('home');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <ChainSimHomepage
            onStartTrial={handleStartTrial}
            onNavigate={(view) => setActiveView(view)}
          />
        );
      case 'sandbox':
        return <SandboxDemo />;
      case 'portfolio':
        return <PortfolioDemo />;
      case 'regRadar':
        return <RegRadarDemo />;
      case 'readiness':
        return <ReadinessCenter />;
      case 'investorComms':
        return <InvestorCommsGenerator />;
      case 'riskCompliance':
        return <RiskComplianceSimulator />;
      case 'analytics':
        return (
          <>
            <LiveAnalytics />
            <AnalyticsDemo />
          </>
        );
      case 'settings':
        return <Settings />;
      case 'pricing':
        return <PricingPlans currentPlan="free" onPlanChange={(planId) => console.log('Plan changed to:', planId)} />;
      case 'billing':
        return <BillingManagement customerId="cus_test123" />;
      default:
        return (
          <ChainSimHomepage
            onStartTrial={handleStartTrial}
            onNavigate={(view) => setActiveView(view)}
          />
        );
    }
  };

  const visibleNavigation = navigation.filter(item => 
    activeView === 'home' ? item.showInSidebar : item.id !== 'home'
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sophisticated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"></div>
      
      {/* Subtle ambient overlay */}
      <div 
        className="fixed inset-0 opacity-20 dark:opacity-30 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08) 0%, transparent 50%)`
        }}
      ></div>
      
      {/* Elegant geometric background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-slate-100/40 dark:from-blue-950/20 dark:to-slate-950/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-200/40 to-gray-200/40 dark:from-slate-800/20 dark:to-gray-800/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Show full-width homepage without sidebar */}
      {activeView === 'home' ? (
        <main className="min-h-screen relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-slate-50/20 to-slate-100/40 dark:from-slate-900/40 dark:via-slate-800/20 dark:to-slate-700/40 backdrop-blur-xl"></div>
          <div className="relative">
            {renderActiveView()}
          </div>
        </main>
      ) : (
        <>
          {/* Mobile menu */}
          <div className="lg:hidden fixed top-6 left-6 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:scale-105"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

          {/* Top-right auth controls */}
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-slate-600 dark:text-slate-300">{currentUser?.name || currentUser?.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <AuthDialog onAuthed={handleAuthed} />
            )}
          </div>

          <div className="flex relative z-10">
            {/* Professional sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-80 transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="h-full relative">
                {/* Sidebar background with subtle gradient */}
                <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-700/50"></div>
                
                {/* Elegant accent line */}
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
                
                <div className="relative h-full flex flex-col p-8">
                  {/* Logo section */}
                  <div className="flex items-center mb-12 group cursor-pointer" onClick={() => setActiveView('home')}>
                    <div className="relative mr-4">
                      <div className="relative w-12 h-12 transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {/* Animated background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 animate-pulse-glow"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-xl animate-float"></div>
                        
                        {/* Main logo container */}
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center overflow-hidden">
                          {/* AI Circuit pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                          </div>
                          
                          {/* Dynamic icon stack */}
                          <div className="relative z-10 flex items-center justify-center">
                            <Layers className="w-6 h-6 text-white relative transform group-hover:translate-y-[-1px] transition-transform duration-300" />
                          </div>
                          
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                        ChainSim Hub
                      </h1>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Tokenized Securities Platform
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 space-y-2">
                    {visibleNavigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;
                      
                      return (
                        <div key={item.id} className="relative group">
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-full shadow-sm"></div>
                          )}
                          
                          <button
                            className={`relative w-full p-4 rounded-xl transition-all duration-300 text-left ${
                              isActive 
                                ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-100 dark:border-blue-900/50' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                            onClick={() => {
                              setActiveView(item.id as ActiveView);
                              if (window.innerWidth < 1024) setSidebarOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-4">
                              {/* Icon */}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                isActive 
                                  ? 'bg-blue-600 text-white shadow-sm' 
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              
                              {/* Text content */}
                              <div className="flex-1">
                                <div className={`font-semibold transition-colors duration-300 ${
                                  isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                  {item.name}
                                </div>
                                <div className={`text-xs transition-colors duration-300 ${
                                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                                }`}>
                                  {item.description}
                                </div>
                              </div>
                              
                              {/* Active indicator dot */}
                              {isActive && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </nav>

                  {/* User profile */}
                  <div className="mt-8">
                    <div className="relative p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-white">JD</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            John Doe
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs text-slate-600 dark:text-slate-400">Growth Plan</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors"></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors"></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" 
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main content area */}
            <div className="flex-1 relative">
              <main className="min-h-screen relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-slate-50/20 to-slate-100/40 dark:from-slate-900/40 dark:via-slate-800/20 dark:to-slate-700/40 backdrop-blur-xl"></div>
                <div className="relative">
                  {renderActiveView()}
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
