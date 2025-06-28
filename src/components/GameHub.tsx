
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coins, PieChart, DollarSign } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  unlocked: boolean;
  completed: boolean;
}

const GameHub = () => {
  const [playerLevel, setPlayerLevel] = useState(2);
  const [totalPoints, setTotalPoints] = useState(150);
  const [gamesCompleted, setGamesCompleted] = useState(2);

  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'Budget Battle',
      description: 'Manage a monthly budget with surprise expenses. Can you make it to the end?',
      icon: PieChart,
      difficulty: 'Easy',
      points: 50,
      unlocked: true,
      completed: true
    },
    {
      id: '2',
      title: 'Investo',
      description: 'Learn investment basics by building a diversified portfolio.',
      icon: DollarSign,
      difficulty: 'Medium',
      points: 75,
      unlocked: true,
      completed: true
    },
    {
      id: '3',
      title: 'Crypto Quest',
      description: 'Navigate the world of cryptocurrency while managing risk.',
      icon: Coins,
      difficulty: 'Hard',
      points: 100,
      unlocked: true,
      completed: false
    },
    {
      id: '4',
      title: 'Credit Score Champion',
      description: 'Build and maintain an excellent credit score through smart decisions.',
      icon: DollarSign,
      difficulty: 'Medium',
      points: 75,
      unlocked: false,
      completed: false
    }
  ]);

  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  // Simple Budget Battle Game
  const [budgetGame, setBudgetGame] = useState({
    budget: 1000,
    expenses: 0,
    week: 1,
    events: [
      { week: 2, name: 'Car repair', cost: 200 },
      { week: 3, name: 'Friend\'s birthday gift', cost: 50 },
      { week: 4, name: 'Medical bill', cost: 150 }
    ]
  });

  const playGame = (gameId: string) => {
    setSelectedGame(gameId);
    setGameInProgress(true);
    
    if (gameId === '1') {
      // Reset Budget Battle
      setBudgetGame({
        budget: 1000,
        expenses: 0,
        week: 1,
        events: [
          { week: 2, name: 'Car repair', cost: 200 },
          { week: 3, name: 'Friend\'s birthday gift', cost: 50 },
          { week: 4, name: 'Medical bill', cost: 150 }
        ]
      });
    }
  };

  const handleBudgetGameAction = (action: 'spend' | 'save', amount: number) => {
    setBudgetGame(prev => {
      const newExpenses = action === 'spend' ? prev.expenses + amount : prev.expenses;
      const newWeek = prev.week + 1;
      
      // Check for events this week
      const weekEvent = prev.events.find(event => event.week === newWeek);
      const eventCost = weekEvent ? weekEvent.cost : 0;
      
      return {
        ...prev,
        expenses: newExpenses + eventCost,
        week: newWeek
      };
    });

    // Check if game is complete
    if (budgetGame.week >= 4) {
      const finalBalance = budgetGame.budget - budgetGame.expenses;
      if (finalBalance > 0) {
        // Player won!
        setTotalPoints(prev => prev + 50);
        setGames(prev => prev.map(game => 
          game.id === '1' ? { ...game, completed: true } : game
        ));
      }
      setGameInProgress(false);
      setSelectedGame(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Financial Game Hub
        </h1>
        <p className="text-lg text-gray-600">
          Learn money skills through fun, interactive games
        </p>
      </div>

      {/* Player Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Player Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-600">Level {playerLevel}</div>
            <Progress value={75} className="mt-2" />
            <div className="text-sm text-gray-600 mt-1">75/100 XP to Level 3</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Lifetime earnings</div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardHeader className="text-center">
            <CardTitle>Games Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600">{gamesCompleted}</div>
            <div className="text-sm text-gray-600">out of {games.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Game in Progress */}
      {gameInProgress && selectedGame === '1' && (
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-center text-xl">Budget Battle - Week {budgetGame.week}</CardTitle>
            <CardDescription className="text-center">
              Starting budget: ${budgetGame.budget} | Spent so far: ${budgetGame.expenses}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                Remaining: ${budgetGame.budget - budgetGame.expenses}
              </div>
              <Progress 
                value={((budgetGame.budget - budgetGame.expenses) / budgetGame.budget) * 100} 
                className="mt-2" 
              />
            </div>

            {/* Check for events */}
            {budgetGame.events.find(event => event.week === budgetGame.week + 1) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-red-800">Surprise Expense!</h3>
                <p className="text-red-700">
                  {budgetGame.events.find(event => event.week === budgetGame.week + 1)?.name}: 
                  -${budgetGame.events.find(event => event.week === budgetGame.week + 1)?.cost}
                </p>
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="font-medium">This week you want to:</p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => handleBudgetGameAction('spend', 100)}
                  variant="outline"
                  className="border-red-200 hover:bg-red-50"
                >
                  Buy new clothes ($100)
                </Button>
                <Button
                  onClick={() => handleBudgetGameAction('spend', 50)}
                  variant="outline"
                  className="border-yellow-200 hover:bg-yellow-50"
                >
                  Go to movies ($50)
                </Button>
                <Button
                  onClick={() => handleBudgetGameAction('save', 0)}
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                >
                  Save money (Free)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {games.map((game) => {
          const IconComponent = game.icon;
          
          return (
            <Card 
              key={game.id} 
              className={`bg-white/80 backdrop-blur-sm border-white/40 transition-all duration-300 hover:scale-105 ${
                !game.unlocked ? 'opacity-50' : ''
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                        <Badge variant="outline">{game.points} pts</Badge>
                      </div>
                    </div>
                  </div>
                  {game.completed && (
                    <Badge className="bg-green-500">Completed</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{game.description}</CardDescription>
                
                <Button
                  onClick={() => playGame(game.id)}
                  disabled={!game.unlocked || gameInProgress}
                  className="w-full"
                  variant={game.completed ? "outline" : "default"}
                >
                  {!game.unlocked ? 'Locked' : 
                   game.completed ? 'Play Again' : 
                   gameInProgress ? 'Game in Progress' : 'Play Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Gallery */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">🏆 Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl">🥇</div>
              <div className="text-sm font-medium">Budget Master</div>
              <div className="text-xs text-gray-600">Completed Budget Battle</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📈</div>
              <div className="text-sm font-medium">Investment Rookie</div>
              <div className="text-xs text-gray-600">Finished Investo tutorial</div>
            </div>
            <div className="text-center space-y-2 opacity-50">
              <div className="text-2xl">🚀</div>
              <div className="text-sm font-medium">Crypto Explorer</div>
              <div className="text-xs text-gray-600">Complete Crypto Quest</div>
            </div>
            <div className="text-center space-y-2 opacity-50">
              <div className="text-2xl">💳</div>
              <div className="text-sm font-medium">Credit Champion</div>
              <div className="text-xs text-gray-600">Perfect credit score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameHub;
