
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  eventsJoined: number;
  wasteCollected: string;
  location: string;
  avatar: string;
  userId: string;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [topVolunteers, setTopVolunteers] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [user]);

  const loadLeaderboard = async () => {
    try {
      // Get top 5 users by points with their profile info
      const { data, error } = await supabase
        .from('user_stats')
        .select(`
          points,
          cleanups_count,
          waste_collected,
          user_id,
          profiles!inner(full_name, location, avatar_url)
        `)
        .order('points', { ascending: false })
        .limit(5);

      if (error) throw error;

      const leaderboard: LeaderboardEntry[] = data?.map((entry, index) => ({
        rank: index + 1,
        name: (entry.profiles as any)?.full_name || 'Anonymous',
        points: entry.points,
        eventsJoined: entry.cleanups_count,
        wasteCollected: `${Number(entry.waste_collected).toFixed(0)} kg`,
        location: (entry.profiles as any)?.location || 'India',
        avatar: (entry.profiles as any)?.avatar_url || '👤',
        userId: entry.user_id
      })) || [];

      setTopVolunteers(leaderboard);

      // Calculate user's rank if logged in
      if (user) {
        const { count } = await supabase
          .from('user_stats')
          .select('*', { count: 'exact', head: true })
          .gt('points', (await supabase
            .from('user_stats')
            .select('points')
            .eq('user_id', user.id)
            .single()).data?.points || 0);
        
        setUserRank((count || 0) + 1);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 2: return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 3: return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300";
      default: return "bg-white border-gray-200";
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Trophy className="h-6 w-6" />
          </div>
          Top Eco Warriors
          <Badge className="bg-white/20 text-white border-white/30">This Month</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {topVolunteers.map((volunteer) => (
            <div
              key={volunteer.rank}
              className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${getRankBackground(volunteer.rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(volunteer.rank)}
                    <span className="font-bold text-2xl text-gray-600">#{volunteer.rank}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {volunteer.avatar.startsWith('http') ? (
                        <img src={volunteer.avatar} alt={volunteer.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <span>{volunteer.avatar}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#014F86] text-lg">{volunteer.name}</h4>
                      <p className="text-sm text-gray-600">{volunteer.location}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6F61] mb-1">
                    {volunteer.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">points</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center bg-white/50 p-2 rounded-lg">
                  <div className="font-semibold text-[#014F86]">{volunteer.eventsJoined}</div>
                  <div className="text-xs text-gray-600">Events Joined</div>
                </div>
                <div className="text-center bg-white/50 p-2 rounded-lg">
                  <div className="font-semibold text-[#014F86]">{volunteer.wasteCollected}</div>
                  <div className="text-xs text-gray-600">Waste Collected</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Think you can make it to the top? Join more events to climb the leaderboard!
          </p>
          {userRank && (
            <Badge className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2] text-[#014F86] border-0 px-4 py-2">
              🏆 Your current rank: #{userRank}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
