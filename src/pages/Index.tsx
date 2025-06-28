
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, PieChart, CircleDollarSign, Coins, DollarSign } from "lucide-react";
import LifeSimulator from "@/components/LifeSimulator";
import BudgetTracker from "@/components/BudgetTracker";
import FamilyGoals from "@/components/FamilyGoals";
import GameHub from "@/components/GameHub";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FinGrow
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "home" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("simulate")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "simulate" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Life Mode
              </button>
              <button
                onClick={() => setActiveTab("budget")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "budget" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Budget
              </button>
              <button
                onClick={() => setActiveTab("family")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "family" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Family
              </button>
              <button
                onClick={() => setActiveTab("games")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "games" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Games
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Master Money,
                  <br />
                  Build Your Future
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  FinGrow makes financial literacy fun and engaging for teens and families. 
                  Learn through interactive simulations, gamified challenges, and real-world scenarios.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                  onClick={() => setActiveTab("simulate")}
                >
                  Start Life Mode
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-3 text-lg"
                  onClick={() => setActiveTab("budget")}
                >
                  Try Budget Tracker
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Life Simulations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Make real-world financial decisions and see their impact over time
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Smart Budgeting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Learn to manage money with interactive budget tools and challenges
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Family Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Set and achieve savings goals together as a family unit
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Mini-Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Learn through fun games like Investo, Budget Battle, and Crypto Quest
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/40">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Your Financial Journey
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Level 1</div>
                  <div className="text-gray-600">Financial Beginner</div>
                  <Progress value={25} className="mt-4" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$0</div>
                  <div className="text-gray-600">Virtual Net Worth</div>
                  <div className="flex justify-center mt-4">
                    <Badge variant="secondary">Start Building!</Badge>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0/10</div>
                  <div className="text-gray-600">Achievements Unlocked</div>
                  <div className="flex justify-center mt-4">
                    <Badge variant="outline">Ready to Earn</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "simulate" && <LifeSimulator />}
        {activeTab === "budget" && <BudgetTracker />}
        {activeTab === "family" && <FamilyGoals />}
        {activeTab === "games" && <GameHub />}
      </div>
    </div>
  );
};

export default Index;
