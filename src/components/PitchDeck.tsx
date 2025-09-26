import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Zap, Target, Rocket, Shield, TrendingUp, Users, DollarSign, Clock, CheckCircle } from "lucide-react";

const slides = [
  { id: 1, title: "Title & Vision", component: "TitleSlide" },
  { id: 2, title: "The Problem", component: "ProblemSlide" },
  { id: 3, title: "The Opportunity", component: "OpportunitySlide" },
  { id: 4, title: "The Solution", component: "SolutionSlide" },
  { id: 5, title: "How It Works", component: "HowItWorksSlide" },
  { id: 6, title: "Differentiators", component: "DifferentiatorsSlide" },
  { id: 7, title: "Competitive Positioning", component: "CompetitiveSlide" },
  { id: 8, title: "Pricing", component: "PricingSlide" },
  { id: 9, title: "Market Validation", component: "ValidationSlide" },
  { id: 10, title: "Roadmap", component: "RoadmapSlide" },
  { id: 11, title: "Financial Model", component: "FinancialSlide" },
  { id: 12, title: "Closing", component: "ClosingSlide" }
];

interface PitchDeckProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

// Title Slide
const TitleSlide = () => (
  <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
      <div className="space-y-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          <Badge className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0 animate-pulse-glow">
            SaaS Platform • AI-Powered • Enterprise-Grade
          </Badge>
          
          <div className="space-y-6">
            <h1 className="text-7xl xl:text-8xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Automated Experience-Based
            </h1>
            <h1 className="text-7xl xl:text-8xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Acceleration Platform
            </h1>
          </div>
          
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Democratize enterprise-grade acceleration by providing SMBs with an AI-powered, 
            digital-first platform that delivers <span className="text-blue-400">consulting outcomes</span> at a <span className="text-green-400">fraction of the cost</span>.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-slate-300">
          <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-2xl">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-lg">Enterprise-Grade Results</span>
          </div>
          <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-2xl">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-lg">70% Lower Cost</span>
          </div>
          <div className="flex items-center space-x-3 glass-card px-6 py-4 rounded-2xl">
            <Clock className="w-6 h-6 text-blue-400" />
            <span className="text-lg">30-Day MVP</span>
          </div>
        </div>
        
        <div className="pt-8">
          <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl">
            Start Presentation
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Problem Slide
const ProblemSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-red-100 text-red-700 border-red-200">Problem Statement</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          The Problem
        </h1>
        <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
          SMBs and startups face significant barriers in cloud adoption
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-red-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">High Consulting Fees</h3>
            <div className="space-y-2">
              <div className="text-4xl text-red-600">$50K-$200K+</div>
              <p className="text-slate-600">AWS ProServe and partner costs</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Long Delivery Cycles</h3>
            <div className="space-y-2">
              <div className="text-4xl text-orange-600">3-6 months</div>
              <p className="text-slate-600">Extended implementation timelines</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Limited Expertise</h3>
            <div className="space-y-2">
              <div className="text-4xl text-blue-600">Lacking</div>
              <p className="text-slate-600">In-house technical capabilities</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <TrendingUp className="w-10 h-10 text-white rotate-180" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Stalled Adoption</h3>
            <div className="space-y-2">
              <div className="text-4xl text-purple-600">Wasted</div>
              <p className="text-slate-600">Budgets and lost competitive edge</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl">
          <span className="text-2xl">⚠️</span>
          <span className="text-xl text-slate-700">These barriers prevent SMBs from realizing cloud benefits</span>
        </div>
      </div>
    </div>
  </div>
);

// Opportunity Slide
const OpportunitySlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-green-100 text-green-700 border-green-200">Market Opportunity</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          The Opportunity
        </h1>
        <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
          Massive and rapidly growing cloud market with underserved SMB segment
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-12 mb-16">
        <Card className="p-12 text-center space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <div className="text-6xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$100B+</div>
            <h3 className="text-2xl text-slate-800">AWS Cloud Spend</h3>
            <p className="text-slate-600 text-lg">Growing ~20% Year over Year</p>
            <div className="h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 text-center space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <div className="text-6xl">📈</div>
            <h3 className="text-2xl text-slate-800">SMB Growth</h3>
            <p className="text-slate-600 text-lg">Fastest-growing cloud adoption segment</p>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full w-5/6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 text-center space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Target className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <div className="text-6xl">⚡</div>
            <h3 className="text-2xl text-slate-800">Market Demand</h3>
            <p className="text-slate-600 text-lg">Faster outcomes, lower cost, less overhead</p>
            <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center">
        <div className="inline-block">
          <Card className="p-8 border-0 shadow-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8" />
              <span className="text-2xl">Perfect timing to capture this growing market</span>
              <Zap className="w-8 h-8" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

// Solution Slide
const SolutionSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-blue-100 text-blue-700 border-blue-200">Our Solution</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          The Solution
        </h1>
        <p className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent max-w-4xl mx-auto">
          AI-Powered, Digital-Only EBA Platform
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🔍</span>
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl text-slate-800">Discovery Automation</h3>
            <p className="text-slate-600">Roadmaps generated in hours, not weeks</p>
            <div className="pt-2">
              <Badge className="bg-blue-100 text-blue-700">AI-Powered</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl text-slate-800">Sprint Generator</h3>
            <p className="text-slate-600">IaC-driven accelerators with guided tasks</p>
            <div className="pt-2">
              <Badge className="bg-purple-100 text-purple-700">Automated</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">📚</span>
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl text-slate-800">AI-Built Playbooks</h3>
            <p className="text-slate-600">Governance, compliance, and blueprints</p>
            <div className="pt-2">
              <Badge className="bg-green-100 text-green-700">Smart</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl text-slate-800">Continuous Dashboard</h3>
            <p className="text-slate-600">KPIs, savings, AI facilitator support</p>
            <div className="pt-2">
              <Badge className="bg-orange-100 text-orange-700">Real-time</Badge>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center">
        <Card className="inline-block p-12 border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="space-y-6">
            <div className="text-4xl">From goals to MVP in <span className="text-yellow-300">30 days</span></div>
            <p className="text-2xl text-blue-100">No consultants required</p>
            <div className="flex justify-center space-x-4 pt-4">
              <CheckCircle className="w-8 h-8 text-green-300" />
              <span className="text-xl text-green-300">Proven Results</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// How It Works Slide
const HowItWorksSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-indigo-100 text-indigo-700 border-indigo-200">Process Flow</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto">
          Simple 4-step process from discovery to deployment
        </p>
      </div>
      
      <div className="relative">
        {/* Connection lines */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 transform -translate-y-1/2 z-0"></div>
        
        <div className="grid lg:grid-cols-4 gap-8 relative z-10">
          <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl text-slate-800">Discovery Intake</h3>
              <p className="text-slate-600">AI maps business goals to top accelerators</p>
              <div className="pt-2">
                <Badge className="bg-indigo-100 text-indigo-700">Intelligent Mapping</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl text-slate-800">Sprint Generator</h3>
              <p className="text-slate-600">Prebuilt IaC templates + guided tasks</p>
              <div className="pt-2">
                <Badge className="bg-purple-100 text-purple-700">Template Engine</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl text-slate-800">Playbook Builder</h3>
              <p className="text-slate-600">Custom adoption playbooks with compliance</p>
              <div className="pt-2">
                <Badge className="bg-green-100 text-green-700">Custom Build</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-cyan-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  4
                </div>
              </div>
              <h3 className="text-xl text-slate-800">Ongoing Dashboard</h3>
              <p className="text-slate-600">Cost savings, velocity, AI assistant</p>
              <div className="pt-2">
                <Badge className="bg-cyan-100 text-cyan-700">Continuous Monitoring</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="text-center mt-16">
        <Card className="inline-block p-8 border-0 shadow-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-lg">Seamless Flow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-lg">Automated Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-lg">Continuous Value</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// Differentiators Slide
const DifferentiatorsSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">Competitive Advantage</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Differentiators
        </h1>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto">
          Why we're uniquely positioned to win this market
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-emerald-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl text-slate-800">70-80% Lower Cost</h3>
              <p className="text-slate-600 text-lg">vs AWS ProServe/Partners</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Traditional</span>
                  <span>$50K-200K+</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600">Our Platform</span>
                  <span className="text-emerald-600">$10K-40K</span>
                </div>
                <div className="h-3 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl text-slate-800">All-Digital, AI-Powered</h3>
              <p className="text-slate-600 text-lg">vs people-heavy consulting</p>
              <div className="flex items-center space-x-4 pt-2">
                <Badge className="bg-blue-100 text-blue-700">24/7 Availability</Badge>
                <Badge className="bg-indigo-100 text-indigo-700">Scalable</Badge>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl text-slate-800">30-Day Timeline</h3>
              <p className="text-slate-600 text-lg">vs 3-6 months traditional</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">Our Speed</span>
                  <span className="text-sm">30 days</span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Traditional</span>
                  <span className="text-sm">3-6 months</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl text-slate-800">Broader Scope</h3>
              <p className="text-slate-600 text-lg">vs point SaaS (DevOps/FinOps)</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Badge className="bg-orange-100 text-orange-700 justify-center">DevOps</Badge>
                <Badge className="bg-red-100 text-red-700 justify-center">FinOps</Badge>
                <Badge className="bg-yellow-100 text-yellow-700 justify-center">Compliance</Badge>
                <Badge className="bg-pink-100 text-pink-700 justify-center">Governance</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// Competitive Slide (simplified for space)
const CompetitiveSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-slate-100 text-slate-700 border-slate-200">Market Analysis</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
          Competitive Positioning
        </h1>
      </div>
      
      <div className="overflow-hidden shadow-2xl rounded-3xl bg-white border-0">
        <div className="grid grid-cols-6 gap-4 p-6 bg-gradient-to-r from-slate-100 to-blue-100">
          <div className="text-slate-700">Provider</div>
          <div className="text-slate-700">Cost</div>
          <div className="text-slate-700">Delivery</div>
          <div className="text-slate-700">Speed</div>
          <div className="text-slate-700">AI/Digital</div>
          <div className="text-slate-700">Market Fit</div>
        </div>
        
        <div className="divide-y divide-slate-200">
          <div className="grid grid-cols-6 gap-4 p-6 items-center hover:bg-slate-50">
            <div>AWS ProServe</div>
            <Badge variant="destructive">$$$$</Badge>
            <div>Human</div>
            <div>3-6 mo</div>
            <span className="text-destructive text-xl">❌</span>
            <div>Large enterprises</div>
          </div>
          
          <div className="grid grid-cols-6 gap-4 p-6 items-center hover:bg-slate-50">
            <div>AWS Partners</div>
            <Badge className="bg-orange-100 text-orange-700">$$$</Badge>
            <div>Human</div>
            <div>2-6 mo</div>
            <span className="text-destructive text-xl">❌</span>
            <div>Mid/Large</div>
          </div>
          
          <div className="grid grid-cols-6 gap-4 p-6 items-center hover:bg-slate-50">
            <div>Point SaaS</div>
            <Badge className="bg-yellow-100 text-yellow-700">$$</Badge>
            <div>SaaS</div>
            <div>Weeks</div>
            <Badge className="bg-green-100 text-green-700">✅ Narrow</Badge>
            <div>SMBs (specific)</div>
          </div>
          
          <div className="grid grid-cols-6 gap-4 p-6 items-center bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="text-blue-700">Our Platform</div>
            <Badge className="bg-green-600 text-white">$</Badge>
            <div className="text-blue-700">SaaS/AI</div>
            <div className="text-blue-700">30 days</div>
            <Badge className="bg-green-600 text-white">✅✅ Broad</Badge>
            <div className="text-blue-700">SMBs + Enterprise teams</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Remaining slides follow similar enhanced patterns...
const PricingSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-green-100 text-green-700 border-green-200">Pricing Strategy</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Pricing</h1>
        <p className="text-2xl text-slate-600">Simple, transparent pricing that scales with you</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Essentials</h3>
            <div className="space-y-2">
              <div className="text-5xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$1,500</div>
              <div className="text-slate-600">/month</div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>1 accelerator</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Roadmap generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Basic playbooks</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 relative hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-2 border-blue-200">
          <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2">Most Popular</Badge>
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Growth</h3>
            <div className="space-y-2">
              <div className="text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$3,000</div>
              <div className="text-slate-600">/month</div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>3 accelerators</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>KPI dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Integrations</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-center space-y-4">
            <h3 className="text-2xl text-slate-800">Scale</h3>
            <div className="space-y-2">
              <div className="text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$5,000</div>
              <div className="text-slate-600">/month</div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                <span>Unlimited accelerators</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                <span>Compliance features</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                <span>SSO integration</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center">
        <Card className="inline-block p-8 border-0 shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="space-y-2">
            <h3 className="text-2xl">Add-ons Available</h3>
            <p className="text-lg">$5K–$10K per accelerator (vs $15K–$25K AWS QuickStarts)</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// Remaining slides would follow similar enhanced patterns...
const ValidationSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-blue-100 text-blue-700 border-blue-200">Market Evidence</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Market Validation</h1>
        <p className="text-2xl text-slate-600">Proven demand and established pricing benchmarks</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="p-8 text-center space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-5xl text-blue-600">$5K+</div>
          <h3 className="text-xl text-slate-800">AWS WARs</h3>
          <p className="text-slate-600">per workload assessment</p>
          <Badge className="bg-blue-100 text-blue-700">Established</Badge>
        </Card>
        
        <Card className="p-8 text-center space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-5xl text-orange-600">$10K-$25K</div>
          <h3 className="text-xl text-slate-800">AWS QuickStarts</h3>
          <p className="text-slate-600">per implementation</p>
          <Badge className="bg-orange-100 text-orange-700">Market Rate</Badge>
        </Card>
        
        <Card className="p-8 text-center space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-red-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-5xl text-red-600">$50K-$120K+</div>
          <h3 className="text-xl text-slate-800">ProServe</h3>
          <p className="text-slate-600">per engagement</p>
          <Badge className="bg-red-100 text-red-700">Premium</Badge>
        </Card>
        
        <Card className="p-8 text-center space-y-6 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-5xl text-green-600">$3K-$6.5K</div>
          <h3 className="text-xl text-slate-800">Automation SaaS</h3>
          <p className="text-slate-600">monthly recurring</p>
          <Badge className="bg-green-100 text-green-700">SaaS Model</Badge>
        </Card>
      </div>
      
      <div className="text-center">
        <Card className="inline-block p-8 border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="flex items-center space-x-4">
            <Target className="w-8 h-8" />
            <span className="text-2xl">Customers are already spending in this range — we deliver consulting-grade outcomes for much less</span>
            <Target className="w-8 h-8" />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const RoadmapSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-purple-100 text-purple-700 border-purple-200">Strategic Timeline</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Roadmap</h1>
        <p className="text-2xl text-slate-600">Strategic phases for sustainable growth</p>
      </div>
      
      <div className="relative">
        <div className="hidden lg:block absolute left-8 top-20 bottom-20 w-1 bg-gradient-to-b from-purple-200 via-blue-200 to-green-200"></div>
        
        <div className="space-y-12">
          <Card className="p-12 ml-0 lg:ml-20 border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 hover:shadow-3xl transition-all duration-500 hover:-translate-x-2">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
                1
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-3xl text-slate-800">Phase 1: MVP Launch</h3>
                  <Badge className="bg-purple-100 text-purple-700">0-6 months</Badge>
                </div>
                <ul className="space-y-2 text-slate-600 text-lg">
                  <li>• Discovery automation engine</li>
                  <li>• 3 core accelerators (Migration, DevOps, Security)</li>
                  <li>• Basic playbook generation</li>
                  <li>• Initial customer validation</li>
                </ul>
              </div>
            </div>
          </Card>
          
          <Card className="p-12 ml-0 lg:ml-20 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-x-2 border-2 border-blue-200">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
                2
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-3xl text-slate-800">Phase 2: Scale & Expand</h3>
                  <Badge className="bg-blue-600 text-white">6-12 months</Badge>
                </div>
                <ul className="space-y-2 text-slate-600 text-lg">
                  <li>• Expand to 10+ accelerators across all domains</li>
                  <li>• Advanced KPI dashboard with predictive analytics</li>
                  <li>• AI facilitator with natural language interface</li>
                  <li>• Integration marketplace</li>
                </ul>
              </div>
            </div>
          </Card>
          
          <Card className="p-12 ml-0 lg:ml-20 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-x-2">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0">
                3
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-3xl text-slate-800">Phase 3: Enterprise Ready</h3>
                  <Badge className="bg-green-100 text-green-700">12-24 months</Badge>
                </div>
                <ul className="space-y-2 text-slate-600 text-lg">
                  <li>• Enterprise features (SSO, RBAC, compliance reporting)</li>
                  <li>• AWS Marketplace listing and co-sell program</li>
                  <li>• White-label partner program</li>
                  <li>• Global expansion and localization</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

const FinancialSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-8 mb-16">
        <Badge className="px-6 py-2 bg-green-100 text-green-700 border-green-200">Financial Projections</Badge>
        <h1 className="text-6xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Financial Model</h1>
        <p className="text-2xl text-slate-600">Strong unit economics with clear growth trajectory</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 mb-16">
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-center space-y-6">
            <h3 className="text-3xl text-green-700">Year 1 Target</h3>
            <div className="space-y-4">
              <div className="text-6xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$500K</div>
              <div className="text-xl text-slate-600">Annual Recurring Revenue</div>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <span>Growth tier customers</span>
                <Badge className="bg-green-600 text-white">~15</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <span>Essentials tier customers</span>
                <Badge className="bg-green-600 text-white">~20</Badge>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-12 space-y-8 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="text-center space-y-6">
            <h3 className="text-3xl text-blue-700">Year 2 Target</h3>
            <div className="space-y-4">
              <div className="text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$2M</div>
              <div className="text-xl text-slate-600">Annual Recurring Revenue</div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span>Growth tier</span>
                <Badge className="bg-blue-600 text-white">40</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span>Scale tier</span>
                <Badge className="bg-blue-600 text-white">20</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span>Enterprise</span>
                <Badge className="bg-blue-600 text-white">5</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center">
        <Card className="inline-block p-8 border-0 shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl">High-margin accelerator marketplace add-ons = additional upside potential</span>
            <TrendingUp className="w-8 h-8" />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const ClosingSlide = () => (
  <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
      <div className="space-y-16 max-w-6xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-7xl xl:text-8xl leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Consulting outcomes.</span>
          </h1>
          <h1 className="text-7xl xl:text-8xl leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI efficiency.</span>
          </h1>
          <h1 className="text-7xl xl:text-8xl leading-tight">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">70% less cost.</span>
          </h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <Card className="p-12 text-center space-y-8 border-0 shadow-2xl glass-card hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-3xl">💼</span>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl text-white">For Investors</h3>
              <p className="text-xl text-blue-100">
                Join us in reshaping cloud acceleration for the SMB market
              </p>
              <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg">
                Partner With Us
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </Card>
          
          <Card className="p-12 text-center space-y-8 border-0 shadow-2xl glass-card hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl text-white">For Customers</h3>
              <p className="text-xl text-green-100">
                Start your first accelerator today and transform your cloud journey
              </p>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white shadow-lg">
                Get Started
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="text-xl">Ready to accelerate?</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xl">Let's build the future together</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function PitchDeck({ currentSlide, setCurrentSlide }: PitchDeckProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        if (currentSlide < slides.length) {
          setCurrentSlide(currentSlide + 1);
        } else {
          setIsPlaying(false);
        }
      }, 10000); // 10 seconds per slide

      return () => clearInterval(timer);
    }
  }, [isPlaying, currentSlide, setCurrentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const renderSlide = () => {
    switch (slides[currentSlide - 1]?.component) {
      case "TitleSlide": return <TitleSlide />;
      case "ProblemSlide": return <ProblemSlide />;
      case "OpportunitySlide": return <OpportunitySlide />;
      case "SolutionSlide": return <SolutionSlide />;
      case "HowItWorksSlide": return <HowItWorksSlide />;
      case "DifferentiatorsSlide": return <DifferentiatorsSlide />;
      case "CompetitiveSlide": return <CompetitiveSlide />;
      case "PricingSlide": return <PricingSlide />;
      case "ValidationSlide": return <ValidationSlide />;
      case "RoadmapSlide": return <RoadmapSlide />;
      case "FinancialSlide": return <FinancialSlide />;
      case "ClosingSlide": return <ClosingSlide />;
      default: return <TitleSlide />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header - only show on non-title slides */}
      {currentSlide !== 1 && (
        <div className="fixed top-0 left-0 right-0 z-50 border-b glass backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EBA Platform
                </h1>
                <Badge variant="outline" className="px-4 py-1">
                  {currentSlide} / {slides.length}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="glass border-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {currentSlide !== 1 && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <Progress 
            value={(currentSlide / slides.length) * 100} 
            className="h-1 bg-transparent"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {renderSlide()}
      </div>

      {/* Navigation - only show on non-title slides */}
      {currentSlide !== 1 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="p-4 glass border-0 shadow-2xl">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 1}
                className="border-0 glass"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                {slides.map((slide, index) => (
                  <Button
                    key={slide.id}
                    variant={currentSlide === slide.id ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0 border-0"
                    onClick={() => goToSlide(slide.id)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide === slides.length}
                className="border-0 glass"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}