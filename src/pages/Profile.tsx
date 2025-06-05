
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, TrendingUp, Users, Brain, Star } from "lucide-react";
import EnvironmentalQuiz from "@/components/EnvironmentalQuiz";

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
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[#014F86] to-[#FF6F61] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">AC</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userStats.name}</h1>
              <p className="opacity-90">Level {userStats.level} Eco Warrior</p>
              <div className="mt-2">
                <Progress value={levelProgress} className="h-2 bg-white/20" />
                <p className="text-sm mt-1 opacity-80">
                  {userStats.points}/{userStats.nextLevelPoints} points to next level
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Environmental Score</div>
              <div className="text-2xl font-bold">{userStats.environmentalScore}%</div>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{userStats.cleanupCount}</div>
            <div className="text-xs text-gray-600">Cleanups</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{userStats.wasteCollected}kg</div>
            <div className="text-xs text-gray-600">Waste Removed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{userStats.points}</div>
            <div className="text-xs text-gray-600">Points</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{userStats.volunteersHelped}</div>
            <div className="text-xs text-gray-600">Team Members</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="team">My Team</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Profile;
