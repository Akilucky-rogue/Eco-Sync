
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Star } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActivity: string;
  streakType: 'daily' | 'weekly' | 'monthly';
}

const StreakCounter = ({ currentStreak, longestStreak, lastActivity, streakType }: StreakCounterProps) => {
  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Legendary', color: 'from-yellow-400 to-orange-500' };
    if (streak >= 21) return { level: 'Epic', color: 'from-purple-400 to-purple-600' };
    if (streak >= 14) return { level: 'Advanced', color: 'from-blue-400 to-blue-600' };
    if (streak >= 7) return { level: 'Intermediate', color: 'from-green-400 to-green-600' };
    return { level: 'Beginner', color: 'from-gray-400 to-gray-600' };
  };

  const streakLevel = getStreakLevel(currentStreak);

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-[#014F86]">
          <Flame className="h-5 w-5 text-orange-500" />
          {streakType.charAt(0).toUpperCase() + streakType.slice(1)} Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-600">{longestStreak}</div>
              <div className="text-sm text-gray-600">Best</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <Badge className={`bg-gradient-to-r ${streakLevel.color} text-white border-0`}>
              <Star className="h-3 w-3 mr-1" />
              {streakLevel.level} Eco Warrior
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            Last activity: {lastActivity}
          </div>

          {currentStreak > 0 && (
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="text-sm text-orange-800 text-center">
                🔥 Keep it up! You're on fire with your conservation efforts!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
