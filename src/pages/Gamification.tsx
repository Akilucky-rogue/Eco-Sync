import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Flame, Gift, Award } from "lucide-react";
import AchievementBadge from "../components/AchievementBadge";
import StreakCounter from "../components/StreakCounter";
import RewardSystem from "../components/RewardSystem";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";
import ErrorMessage from "../components/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Gamification = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Load user stats
      const { data: stats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError) throw statsError;
      setUserStats(stats);

      // Load achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (achievementsError) throw achievementsError;
      setAchievements(achievementsData || []);

      // Load rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .eq('available', true)
        .order('points_cost', { ascending: true });

      if (rewardsError) throw rewardsError;

      // Load claimed rewards
      const { data: claimedData, error: claimedError } = await supabase
        .from('user_rewards')
        .select('reward_id')
        .eq('user_id', user.id);

      if (claimedError) throw claimedError;

      setClaimedRewards(claimedData?.map(r => r.reward_id) || []);
      setRewards(rewardsData?.map(r => ({
        ...r,
        claimed: claimedData?.some(c => c.reward_id === r.id) || false
      })) || []);
    } catch (error: any) {
      console.error('Error loading gamification data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate streak from cleanups
  const calculateStreak = () => {
    // This would need to be calculated based on cleanup dates
    // For now returning mock data
    return {
      currentStreak: 12,
      longestStreak: 18,
      lastActivity: new Date().toLocaleDateString()
    };
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading gamification..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          title="Failed to load gamification data"
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          title="Stats not found"
          message="Unable to load your stats. Please try again."
          onRetry={loadData}
        />
      </div>
    );
  }

  const streakData = calculateStreak();

  return (
    <ErrorBoundary>
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
            {achievements.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No achievements yet</h3>
                <p className="text-gray-500">Start participating in cleanup events to earn achievements!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <AchievementBadge 
                    key={achievement.id} 
                    achievement={{
                      id: achievement.id,
                      name: achievement.name,
                      description: achievement.description,
                      icon: <Award className="h-6 w-6" />,
                      earned: achievement.earned,
                      progress: achievement.progress,
                      maxProgress: 100,
                      rarity: 'common' as const,
                      points: 50,
                      dateEarned: achievement.earned_at
                    }} 
                    size="medium" 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="streaks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StreakCounter 
                currentStreak={streakData.currentStreak}
                longestStreak={streakData.longestStreak}
                lastActivity={streakData.lastActivity}
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
            {rewards.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No rewards available</h3>
                <p className="text-gray-500">Check back later for new rewards!</p>
              </div>
            ) : (
              <RewardSystem 
                userPoints={userStats.points}
                availableRewards={rewards}
                nextLevelPoints={userStats.next_level_points}
                currentLevel={userStats.level}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default Gamification;
