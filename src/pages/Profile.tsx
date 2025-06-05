
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, TrendingUp, Users } from "lucide-react";

const Profile = () => {
  const userStats = {
    name: "Alex Chen",
    level: 5,
    points: 1247,
    nextLevelPoints: 1500,
    badges: ["Plastic Warrior", "Team Player", "Early Bird"],
    cleanupCount: 12,
    wasteCollected: 45.2,
    volunteersHelped: 8
  };

  const recentCleanups = [
    { name: "Santa Monica Beach", date: "Dec 8, 2024", waste: "5.2 kg", points: 52 },
    { name: "Venice Beach", date: "Dec 1, 2024", waste: "3.8 kg", points: 38 },
    { name: "Malibu Coast", date: "Nov 24, 2024", waste: "7.1 kg", points: 71 }
  ];

  const levelProgress = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[#014F86] to-[#FF6F61] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">AC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userStats.name}</h1>
              <p className="opacity-90">Level {userStats.level} Eco Warrior</p>
              <div className="mt-2">
                <Progress value={levelProgress} className="h-2 bg-white/20" />
                <p className="text-sm mt-1 opacity-80">
                  {userStats.points}/{userStats.nextLevelPoints} points to next level
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#014F86]">
            <Award className="h-5 w-5" />
            Achievement Badges
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

      {/* Recent Activity */}
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
    </div>
  );
};

export default Profile;
