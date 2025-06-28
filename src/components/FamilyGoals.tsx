
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, DollarSign } from "lucide-react";

interface FamilyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  contributors: string[];
}

interface FamilyMember {
  id: string;
  name: string;
  initials: string;
  contribution: number;
}

const FamilyGoals = () => {
  const [familyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Mom', initials: 'M', contribution: 150 },
    { id: '2', name: 'Dad', initials: 'D', contribution: 200 },
    { id: '3', name: 'Alex', initials: 'A', contribution: 50 },
    { id: '4', name: 'Sam', initials: 'S', contribution: 25 },
  ]);

  const [goals, setGoals] = useState<FamilyGoal[]>([
    {
      id: '1',
      title: 'Family Vacation to Disney World',
      target: 3000,
      current: 1250,
      deadline: '2025-07-15',
      contributors: ['Mom', 'Dad', 'Alex', 'Sam']
    },
    {
      id: '2',
      title: 'New Family Car',
      target: 15000,
      current: 4500,
      deadline: '2025-12-31',
      contributors: ['Mom', 'Dad']
    },
    {
      id: '3',
      title: 'Emergency Fund',
      target: 5000,
      current: 2800,
      deadline: '2025-06-30',
      contributors: ['Mom', 'Dad', 'Alex']
    }
  ]);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  const addGoal = () => {
    if (newGoalTitle && newGoalTarget && newGoalDeadline) {
      const newGoal: FamilyGoal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        target: parseFloat(newGoalTarget),
        current: 0,
        deadline: newGoalDeadline,
        contributors: ['Mom', 'Dad']
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalTarget('');
      setNewGoalDeadline('');
    }
  };

  const addContribution = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
        : goal
    ));
  };

  const totalFamilyContributions = familyMembers.reduce((sum, member) => sum + member.contribution, 0);
  const totalGoalsTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalGoalsCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Family Savings Goals
        </h1>
        <p className="text-lg text-gray-600">
          Work together as a family to achieve your financial dreams
        </p>
      </div>

      {/* Family Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Family Power</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-600">${totalFamilyContributions}</div>
            <div className="text-sm text-gray-600">Monthly Contributions</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ${totalGoalsCurrent}
            </div>
            <div className="text-sm text-gray-600">of ${totalGoalsTarget} saved</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Active Goals</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-600">{goals.length}</div>
            <div className="text-sm text-gray-600">Goals in progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Family Members */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/40">
        <CardHeader>
          <CardTitle>Family Contributors</CardTitle>
          <CardDescription>Everyone's monthly contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="text-center space-y-2">
                <Avatar className="mx-auto">
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium">{member.name}</div>
                <Badge variant="secondary">${member.contribution}/month</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Goal */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add New Family Goal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g., Family vacation"
              />
            </div>
            <div>
              <Label htmlFor="goal-target">Target Amount</Label>
              <Input
                id="goal-target"
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="goal-deadline">Deadline</Label>
              <Input
                id="goal-deadline"
                type="date"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={addGoal} className="mt-4 w-full md:w-auto">
            Create Goal
          </Button>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const timeLeft = getTimeRemaining(goal.deadline);
          
          return (
            <Card key={goal.id} className="bg-white/80 backdrop-blur-sm border-white/40">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    <CardDescription>
                      Target: ${goal.target} • Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant={percentage >= 100 ? "default" : "outline"}>
                    {Math.round(percentage)}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: ${goal.current}</span>
                    <span>Remaining: ${remaining}</span>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Time left: {timeLeft}</span>
                    <span>Contributors: {goal.contributors.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => addContribution(goal.id, 25)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    +$25
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addContribution(goal.id, 50)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    +$50
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addContribution(goal.id, 100)}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    +$100
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Family Challenge */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">🏆 This Month's Challenge</CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <div className="space-y-2">
            <h3 className="font-semibold">Skip the Coffee Shop Challenge</h3>
            <p>Each family member saves money by making coffee at home this week. Put the savings toward your vacation fund!</p>
            <div className="flex items-center space-x-2 mt-4">
              <Badge className="bg-green-500">Challenge Progress: 3/7 days</Badge>
              <span className="text-sm">Potential savings: $84</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyGoals;
