
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Plus, DollarSign } from "lucide-react";

interface BudgetItem {
  id: string;
  category: string;
  planned: number;
  spent: number;
  color: string;
}

const BudgetTracker = () => {
  const [income, setIncome] = useState(1000);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Food', planned: 200, spent: 150, color: 'bg-green-500' },
    { id: '2', category: 'Entertainment', planned: 150, spent: 100, color: 'bg-blue-500' },
    { id: '3', category: 'Savings', planned: 300, spent: 300, color: 'bg-purple-500' },
    { id: '4', category: 'Clothes', planned: 100, spent: 75, color: 'bg-pink-500' },
    { id: '5', category: 'Transportation', planned: 80, spent: 90, color: 'bg-yellow-500' },
  ]);
  
  const [newCategory, setNewCategory] = useState('');
  const [newPlanned, setNewPlanned] = useState('');

  const totalPlanned = budgetItems.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remaining = income - totalSpent;

  const addBudgetItem = () => {
    if (newCategory && newPlanned) {
      const colors = ['bg-red-500', 'bg-orange-500', 'bg-cyan-500', 'bg-indigo-500'];
      const newItem: BudgetItem = {
        id: Date.now().toString(),
        category: newCategory,
        planned: parseFloat(newPlanned),
        spent: 0,
        color: colors[budgetItems.length % colors.length]
      };
      setBudgetItems([...budgetItems, newItem]);
      setNewCategory('');
      setNewPlanned('');
    }
  };

  const updateSpent = (id: string, newSpent: number) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, spent: newSpent } : item
    ));
  };

  const getBudgetStatus = (planned: number, spent: number) => {
    const percentage = (spent / planned) * 100;
    if (percentage <= 80) return { status: 'great', color: 'text-green-600' };
    if (percentage <= 100) return { status: 'good', color: 'text-yellow-600' };
    return { status: 'over', color: 'text-red-600' };
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Smart Budget Tracker
        </h1>
        <p className="text-lg text-gray-600">
          Take control of your money with our interactive budget tool
        </p>
      </div>

      {/* Budget Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-green-600">${income}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-medium">Planned Budget</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-blue-600">${totalPlanned}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-purple-600">${totalSpent}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Budget Item */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Budget Category</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g., Gaming, School supplies"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="planned">Planned Amount</Label>
              <Input
                id="planned"
                type="number"
                value={newPlanned}
                onChange={(e) => setNewPlanned(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addBudgetItem} className="w-full sm:w-auto">
                Add Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {budgetItems.map((item) => {
          const percentage = (item.spent / item.planned) * 100;
          const status = getBudgetStatus(item.planned, item.spent);
          
          return (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-white/40">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span>{item.category}</span>
                  </CardTitle>
                  <Badge variant={status.status === 'over' ? 'destructive' : 'default'}>
                    {Math.round(percentage)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent: ${item.spent}</span>
                    <span>Budget: ${item.planned}</span>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                  <div className={`text-sm ${status.color}`}>
                    {status.status === 'great' && 'Great job staying under budget!'}
                    {status.status === 'good' && 'Getting close to your limit'}
                    {status.status === 'over' && `Over budget by $${item.spent - item.planned}`}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`spent-${item.id}`} className="text-sm">Update spent:</Label>
                  <Input
                    id={`spent-${item.id}`}
                    type="number"
                    value={item.spent}
                    onChange={(e) => updateSpent(item.id, parseFloat(e.target.value) || 0)}
                    className="w-24"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Budget Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">💡 Budget Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2">
            <li>• Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
            <li>• Track every expense for a week to understand your spending habits</li>
            <li>• Always pay yourself first - set aside savings before spending</li>
            <li>• Review and adjust your budget monthly</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;
