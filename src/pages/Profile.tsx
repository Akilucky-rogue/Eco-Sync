import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, TrendingUp, Users, Brain, Star, Edit, Settings } from "lucide-react";
import EnvironmentalQuiz from "@/components/EnvironmentalQuiz";
import UserAvatar from "@/components/UserAvatar";
import StatCard from "@/components/StatCard";
import ActivityFeed from "@/components/ActivityFeed";
import EditProfileDialog from "@/components/EditProfileDialog";
import PageLoader from "@/components/PageLoader";
import ErrorMessage from "@/components/ErrorMessage";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [cleanups, setCleanups] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError) throw statsError;
      setStats(statsData);

      // Fetch badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (badgesError) throw badgesError;
      setBadges(badgesData || []);

      // Fetch achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (achievementsError) throw achievementsError;
      setAchievements(achievementsData || []);

      // Fetch cleanups
      const { data: cleanupsData, error: cleanupsError } = await supabase
        .from('cleanups')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(5);

      if (cleanupsError) throw cleanupsError;
      setCleanups(cleanupsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading your profile..." />
      </div>
    );
  }

  if (!profile || !stats) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          title="Profile not found"
          message="Unable to load your profile data. Please try again."
          onRetry={loadProfileData}
        />
      </div>
    );
  }

  const levelProgress = (stats.points / stats.next_level_points) * 100;

  if (showQuiz) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowQuiz(false)}
            className="mb-4"
          >
            ← Back to Profile
          </Button>
        </div>
        <EnvironmentalQuiz />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center gap-4">
            <UserAvatar 
              name={profile.full_name}
              image={profile.avatar_url}
              level={stats.level}
              size="lg"
              className="ring-4 ring-white/20"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="opacity-90 mb-3">
                Level {stats.level} Eco Warrior • {profile.location || 'India'}
              </p>
              {profile.bio && (
                <p className="opacity-80 text-sm mb-3">{profile.bio}</p>
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {stats.level + 1}</span>
                  <span>{stats.points}/{stats.next_level_points} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2 bg-white/20" />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Environmental Score</div>
              <div className="text-3xl font-bold">{stats.environmental_score}%</div>
              <Badge className="bg-brand-green text-white mt-1">
                {stats.environmental_score >= 80 ? 'Excellent' : stats.environmental_score >= 60 ? 'Good' : 'Growing'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => setShowQuiz(true)}
          className="h-20 bg-[#C5E4CF] hover:bg-[#C5E4CF]/90 text-[#014F86] flex flex-col gap-2"
        >
          <Brain className="h-6 w-6" />
          Take Environmental Quiz
        </Button>
        <Button 
          variant="outline"
          className="h-20 flex flex-col gap-2"
        >
          <Star className="h-6 w-6" />
          View Team Rankings
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Cleanups Joined"
          value={stats.cleanups_count}
          icon={Calendar}
          variant="default"
        />
        <StatCard
          title="Waste Removed"
          value={stats.waste_collected}
          subtitle="kg"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Points Earned"
          value={stats.points}
          icon={Award}
          variant="warning"
        />
        <StatCard
          title="Team Members"
          value={stats.volunteers_helped}
          icon={Users}
          variant="default"
        />
      </div>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="team">My Team</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#014F86]">
                <Award className="h-5 w-5" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              {badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <Badge key={badge.id} className="bg-[#C5E4CF] text-[#014F86] hover:bg-[#C5E4CF]/90">
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No badges earned yet. Keep participating!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-[#014F86]">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned ? (
                          <Badge className="bg-green-100 text-green-800">Earned</Badge>
                        ) : (
                          <span className="text-sm text-gray-500">In Progress</span>
                        )}
                      </div>
                      {!achievement.earned && achievement.progress && (
                        <Progress value={(achievement.progress / 100) * 100} className="h-2" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No achievements yet. Start your journey!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Recent Cleanups</CardTitle>
            </CardHeader>
            <CardContent>
              {cleanups.length > 0 ? (
                <div className="space-y-3">
                  {cleanups.map((cleanup) => (
                    <div key={cleanup.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-[#014F86]">{cleanup.name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(cleanup.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-[#FF6F61]">{cleanup.waste_collected} kg</div>
                        <div className="text-sm text-gray-600">+{cleanup.points_earned} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No cleanup history yet. Join an event to get started!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">My Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Team feature coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-primary">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>CO₂ Prevented</span>
                <span className="font-bold">{(stats.waste_collected * 3.2).toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Cleanups Completed</span>
                <span className="font-bold">{stats.cleanups_count}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Waste Collected</span>
                <span className="font-bold">{stats.waste_collected} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Quizzes Taken</span>
                <span className="font-bold">{stats.quizzes_taken}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {profile && (
        <EditProfileDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          profile={profile}
          onProfileUpdated={loadProfileData}
        />
      )}
    </div>
  );
};

export default Profile;
