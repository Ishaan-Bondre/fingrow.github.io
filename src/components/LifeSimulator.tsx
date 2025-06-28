
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, DollarSign } from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    impact: number;
    explanation: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "First Job Decision",
    description: "You just turned 16 and got your first job! You earn $200/week. What's your plan?",
    options: [
      {
        text: "Save 50% for college, spend the rest",
        impact: 100,
        explanation: "Great choice! Building a savings habit early sets you up for success."
      },
      {
        text: "Spend it all on things I want",
        impact: -50,
        explanation: "It's tempting, but saving some money now will help you later."
      },
      {
        text: "Save 20%, spend 80%",
        impact: 40,
        explanation: "Good balance! You're enjoying some money while still saving."
      }
    ]
  },
  {
    id: 2,
    title: "College Funding",
    description: "Time for college! How will you pay for it?",
    options: [
      {
        text: "Take out large student loans",
        impact: -200,
        explanation: "Student loans can burden you for years. Consider other options first."
      },
      {
        text: "Mix of savings, grants, and small loans",
        impact: 150,
        explanation: "Smart approach! You're minimizing debt while investing in education."
      },
      {
        text: "Work full-time, skip college",
        impact: -100,
        explanation: "College isn't for everyone, but consider the long-term earning potential."
      }
    ]
  },
  {
    id: 3,
    title: "First Credit Card",
    description: "You're offered your first credit card with a $500 limit. What do you do?",
    options: [
      {
        text: "Use it for emergencies only, pay in full",
        impact: 120,
        explanation: "Perfect! This builds credit history responsibly."
      },
      {
        text: "Max it out immediately",
        impact: -150,
        explanation: "Dangerous! This can hurt your credit score and create debt."
      },
      {
        text: "Use it for small purchases, pay in full",
        impact: 80,
        explanation: "Good strategy! You're building credit responsibly."
      }
    ]
  }
];

const LifeSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const handleChoice = (impact: number, explanation: string) => {
    setNetWorth(prev => prev + impact);
    setExperience(prev => prev + 25);
    
    if (experience + 25 >= 100) {
      setLevel(prev => prev + 1);
      setExperience(0);
    }

    setCompletedScenarios(prev => [...prev, scenarios[currentScenario].id]);
    
    // Show explanation (in a real app, this would be a toast or modal)
    alert(explanation);
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    }
  };

  const resetSimulation = () => {
    setCurrentScenario(0);
    setNetWorth(0);
    setLevel(1);
    setExperience(0);
    setCompletedScenarios([]);
  };

  const scenario = scenarios[currentScenario];
  const isComplete = currentScenario >= scenarios.length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Life Mode Simulator
        </h1>
        <p className="text-lg text-gray-600">
          Make financial decisions and watch your virtual life unfold
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <CircleDollarSign className="w-5 h-5" />
              <span>Net Worth</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-3xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netWorth >= 0 ? '+' : ''}${netWorth}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Financial Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-600">Level {level}</div>
            <Progress value={experience} className="w-full" />
            <div className="text-sm text-gray-600">{experience}/100 XP</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {completedScenarios.length}/{scenarios.length}
            </div>
            <div className="text-sm text-gray-600">Scenarios Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Card */}
      {!isComplete ? (
        <Card className="bg-white/80 backdrop-blur-sm border-white/40 max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge variant="outline">Scenario {currentScenario + 1}</Badge>
              <Badge>{completedScenarios.length} completed</Badge>
            </div>
            <CardTitle className="text-2xl">{scenario.title}</CardTitle>
            <CardDescription className="text-lg">{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scenario.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left h-auto p-4 hover:bg-blue-50 border-2 hover:border-blue-200"
                onClick={() => handleChoice(option.impact, option.explanation)}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{option.text}</span>
                  <Badge variant={option.impact > 0 ? "default" : "destructive"}>
                    {option.impact > 0 ? '+' : ''}{option.impact}
                  </Badge>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border-white/40 max-w-4xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Simulation Complete!</CardTitle>
            <CardDescription className="text-lg">
              You've made it through all the scenarios. Here's how you did:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Final Net Worth: ${netWorth >= 0 ? '+' : ''}${netWorth}
              </div>
              <div className="text-xl text-blue-600">Reached Level {level}</div>
            </div>
            
            <div className="space-y-2">
              {netWorth >= 200 && <Badge className="bg-green-500">Financial Superstar!</Badge>}
              {netWorth >= 100 && netWorth < 200 && <Badge className="bg-blue-500">Smart Money Manager</Badge>}
              {netWorth >= 0 && netWorth < 100 && <Badge className="bg-yellow-500">Learning the Ropes</Badge>}
              {netWorth < 0 && <Badge variant="destructive">Room for Improvement</Badge>}
            </div>

            <Button
              onClick={resetSimulation}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LifeSimulator;
