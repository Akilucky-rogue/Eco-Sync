
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Award, Crown } from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'badge' | 'title' | 'privilege' | 'physical';
  icon: React.ReactNode;
  available: boolean;
  claimed?: boolean;
}

interface RewardSystemProps {
  userPoints: number;
  availableRewards: Reward[];
  nextLevelPoints: number;
  currentLevel: number;
}

const RewardSystem = ({ userPoints, availableRewards, nextLevelPoints, currentLevel }: RewardSystemProps) => {
  const levelProgress = (userPoints / nextLevelPoints) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'badge': return <Award className="h-4 w-4" />;
      case 'title': return <Crown className="h-4 w-4" />;
      case 'privilege': return <Star className="h-4 w-4" />;
      case 'physical': return <Gift className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'badge': return 'bg-blue-100 text-blue-800';
      case 'title': return 'bg-purple-100 text-purple-800';
      case 'privilege': return 'bg-green-100 text-green-800';
      case 'physical': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Points and Level Progress */}
      <Card className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#014F86]">
            <Star className="h-6 w-6" />
            Level {currentLevel} Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#014F86]">{userPoints}</span>
              <span className="text-lg text-gray-600">/ {nextLevelPoints} points</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <p className="text-sm text-gray-600 text-center">
              {nextLevelPoints - userPoints} points to Level {currentLevel + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#014F86]">
            <Gift className="h-6 w-6" />
            Reward Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`p-4 border rounded-lg transition-all duration-300 ${
                  reward.claimed 
                    ? 'bg-gray-50 border-gray-200' 
                    : userPoints >= reward.pointsCost 
                      ? 'bg-green-50 border-green-200 hover:shadow-md cursor-pointer' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FF6F61] text-white rounded-lg">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#014F86]">{reward.name}</h4>
                      <Badge className={`${getCategoryColor(reward.category)} border-0 text-xs`}>
                        {getCategoryIcon(reward.category)}
                        {reward.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#FF6F61]">{reward.pointsCost} pts</span>
                      {reward.claimed ? (
                        <Badge className="bg-green-100 text-green-800">Claimed</Badge>
                      ) : userPoints >= reward.pointsCost ? (
                        <Badge className="bg-[#FF6F61] text-white">Available</Badge>
                      ) : (
                        <Badge variant="outline">Need {reward.pointsCost - userPoints} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardSystem;
