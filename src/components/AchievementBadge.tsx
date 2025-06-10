
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Calendar, Users } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  dateEarned?: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
}

const AchievementBadge = ({ achievement, size = 'medium' }: AchievementBadgeProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small': return 'w-16 h-16 text-xs';
      case 'medium': return 'w-20 h-20 text-sm';
      case 'large': return 'w-24 h-24 text-base';
      default: return 'w-20 h-20 text-sm';
    }
  };

  return (
    <Card className={`relative overflow-hidden ${achievement.earned ? 'shadow-lg' : 'opacity-60'}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className={`${getSizeClasses(size)} rounded-full bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center text-white shadow-lg`}>
            {achievement.icon}
          </div>
          <div>
            <h4 className="font-semibold text-[#014F86]">{achievement.name}</h4>
            <p className="text-xs text-gray-600">{achievement.description}</p>
            {achievement.earned && achievement.dateEarned && (
              <p className="text-xs text-green-600 font-medium">Earned {achievement.dateEarned}</p>
            )}
            {!achievement.earned && achievement.progress !== undefined && achievement.maxProgress && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{achievement.progress}/{achievement.maxProgress}</p>
              </div>
            )}
          </div>
          <Badge className={`text-xs bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-0`}>
            +{achievement.points} pts
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
