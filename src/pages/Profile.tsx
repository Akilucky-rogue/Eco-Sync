
import { useState } from "react";
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

const Profile = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const userStats = {
    name: "Alex Chen",
    level: 5,
    points: 1247,
    nextLevelPoints: 1500,
    badges: ["Plastic Warrior", "Team Player", "Early Bird"],
    cleanupCount: 12,
    wasteCollected: 45.2,
    volunteersHelped: 8,
    quizzesTaken: 3,
    environmentalScore: 85
  };

  const recentCleanups = [
    { name: "Santa Monica Beach", date: "Dec 8, 2024", waste: "5.2 kg", points: 52 },
    { name: "Venice Beach", date: "Dec 1, 2024", waste: "3.8 kg", points: 38 },
    { name: "Malibu Coast", date: "Nov 24, 2024", waste: "7.1 kg", points: 71 }
  ];

  const teamMembers = [
    { name: "Sarah Kim", points: 892, role: "Organizer" },
    { name: "Mike Johnson", points: 756, role: "Collector" },
    { name: "Lisa Chen", points: 634, role: "Educator" }
  ];

  const achievements = [
    { name: "First Cleanup", description: "Completed your first beach cleanup", earned: true, date: "Nov 15, 2024" },
    { name: "Team Builder", description: "Helped recruit 5 new volunteers", earned: true, date: "Nov 28, 2024" },
    { name: "Waste Warrior", description: "Collected 50kg of waste", earned: false, progress: 45.2 },
    { name: "Quiz Master", description: "Score 90% or higher on environmental quiz", earned: false, progress: 85 }
  ];

  const levelProgress = (userStats.points / userStats.nextLevelPoints) * 100;

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
      {/* Enhanced Profile Header */}
      <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center gap-4">
            <UserAvatar 
              name={userStats.name}
              level={userStats.level}
              size="lg"
              className="ring-4 ring-white/20"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{userStats.name}</h1>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="opacity-90 mb-3">Level {userStats.level} Eco Warrior • Marine Conservation Champion</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>{userStats.points}/{userStats.nextLevelPoints} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2 bg-white/20" />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Environmental Score</div>
              <div className="text-3xl font-bold">{userStats.environmentalScore}%</div>
              <Badge className="bg-brand-green text-white mt-1">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
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

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Cleanups Joined"
          value={userStats.cleanupCount}
          icon={Calendar}
          variant="default"
        />
        <StatCard
          title="Waste Removed"
          value={userStats.wasteCollected}
          subtitle="kg"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Points Earned"
          value={userStats.points}
          icon={Award}
          trend={{ value: 15, label: "this week", direction: "up" }}
          variant="warning"
        />
        <StatCard
          title="Team Members"
          value={userStats.volunteersHelped}
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
          {/* Current Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#014F86]">
                <Award className="h-5 w-5" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userStats.badges.map((badge, index) => (
                  <Badge key={index} className="bg-[#C5E4CF] text-[#014F86] hover:bg-[#C5E4CF]/90">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
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
                      <Progress 
                        value={typeof achievement.progress === 'number' ? (achievement.progress / (achievement.name.includes('Quiz') ? 90 : 50)) * 100 : 0} 
                        className="h-2" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Recent Cleanups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCleanups.map((cleanup, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#014F86]">{cleanup.name}</h4>
                      <p className="text-sm text-gray-600">{cleanup.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[#FF6F61]">{cleanup.waste}</div>
                      <div className="text-sm text-gray-600">+{cleanup.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Team Ocean Guardians</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C5E4CF] rounded-full flex items-center justify-center">
                        <span className="font-bold text-[#014F86]">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#014F86]">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF6F61]">{member.points}</div>
                      <div className="text-xs text-gray-600">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-brand-primary">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>CO₂ Prevented</span>
                  <span className="font-bold">145 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Marine Life Saved</span>
                  <span className="font-bold">~200 animals</span>
                </div>
                <div className="flex justify-between">
                  <span>Microplastics Removed</span>
                  <span className="font-bold">12,000 pieces</span>
                </div>
                <div className="flex justify-between">
                  <span>Beach Area Cleaned</span>
                  <span className="font-bold">2.3 km²</span>
                </div>
              </CardContent>
            </Card>
            
            <ActivityFeed 
              activities={[
                {
                  id: '1',
                  type: 'cleanup',
                  user: { name: userStats.name },
                  content: 'Completed cleanup at Santa Monica Beach',
                  location: 'Santa Monica Beach',
                  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                  metadata: { points: 52 }
                },
                {
                  id: '2',
                  type: 'achievement',
                  user: { name: userStats.name },
                  content: 'Earned Team Player badge',
                  timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  metadata: { points: 100 }
                }
              ]}
              showHeader={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
