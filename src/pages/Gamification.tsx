
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Flame, Gift, Award } from "lucide-react";
import AchievementBadge from "../components/AchievementBadge";
import StreakCounter from "../components/StreakCounter";
import RewardSystem from "../components/RewardSystem";

const Gamification = () => {
  const [userStats] = useState({
    points: 1247,
    level: 5,
    nextLevelPoints: 1500,
    currentStreak: 12,
    longestStreak: 18,
    lastActivity: "Dec 8, 2024"
  });

  const achievements = [
    {
      id: "first-cleanup",
      name: "First Steps",
      description: "Complete your first beach cleanup",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      rarity: 'common' as const,
      points: 25,
      dateEarned: "Nov 15, 2024"
    },
    {
      id: "team-builder",
      name: "Team Builder",
      description: "Help recruit 5 new volunteers",
      icon: <Trophy className="h-6 w-6" />,
      earned: true,
      rarity: 'rare' as const,
      points: 75,
      dateEarned: "Nov 28, 2024"
    },
    {
      id: "waste-warrior",
      name: "Waste Warrior",
      description: "Collect 100kg of waste",
      icon: <Award className="h-6 w-6" />,
      earned: false,
      progress: 45,
      maxProgress: 100,
      rarity: 'epic' as const,
      points: 150
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintain a 30-day cleanup streak",
      icon: <Flame className="h-6 w-6" />,
      earned: false,
      progress: 12,
      maxProgress: 30,
      rarity: 'legendary' as const,
      points: 300
    },
    {
      id: "early-bird",
      name: "Early Bird",
      description: "Join 10 early morning cleanups",
      icon: <Award className="h-6 w-6" />,
      earned: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'rare' as const,
      points: 100
    },
    {
      id: "community-leader",
      name: "Community Leader",
      description: "Organize 5 cleanup events",
      icon: <Trophy className="h-6 w-6" />,
      earned: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'epic' as const,
      points: 200
    }
  ];

  const rewards = [
    {
      id: "eco-hero-badge",
      name: "Eco Hero Badge",
      description: "Display your conservation commitment",
      pointsCost: 500,
      category: 'badge' as const,
      icon: <Award className="h-4 w-4" />,
      available: true,
      claimed: false
    },
    {
      id: "cleanup-captain",
      name: "Cleanup Captain",
      description: "Special title recognition",
      pointsCost: 750,
      category: 'title' as const,
      icon: <Trophy className="h-4 w-4" />,
      available: true,
      claimed: false
    },
    {
      id: "priority-access",
      name: "Priority Event Access",
      description: "Early registration for popular events",
      pointsCost: 1000,
      category: 'privilege' as const,
      icon: <Gift className="h-4 w-4" />,
      available: true,
      claimed: false
    },
    {
      id: "eco-tote",
      name: "EcoSync Tote Bag",
      description: "Sustainable canvas bag with logo",
      pointsCost: 1200,
      category: 'physical' as const,
      icon: <Gift className="h-4 w-4" />,
      available: true,
      claimed: true
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#014F86] mb-2">Gamification Hub</h1>
        <p className="text-gray-600">Track your achievements, streaks, and unlock rewards for your conservation efforts</p>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
          <TabsTrigger 
            value="achievements" 
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger 
            value="streaks"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white"
          >
            <Flame className="h-5 w-5 mr-2" />
            Streaks
          </TabsTrigger>
          <TabsTrigger 
            value="rewards"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C5E4CF] data-[state=active]:to-[#F6EFD2] data-[state=active]:text-[#014F86]"
          >
            <Gift className="h-5 w-5 mr-2" />
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} size="medium" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StreakCounter 
              currentStreak={userStats.currentStreak}
              longestStreak={userStats.longestStreak}
              lastActivity={userStats.lastActivity}
              streakType="daily"
            />
            <StreakCounter 
              currentStreak={3}
              longestStreak={5}
              lastActivity="This week"
              streakType="weekly"
            />
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <RewardSystem 
            userPoints={userStats.points}
            availableRewards={rewards}
            nextLevelPoints={userStats.nextLevelPoints}
            currentLevel={userStats.level}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gamification;
