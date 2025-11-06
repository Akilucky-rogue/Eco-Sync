import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Award, Recycle, Calendar, MapPin } from "lucide-react";
import StatCard from "@/components/StatCard";
import ActivityFeed from "@/components/ActivityFeed";
import QuickActions from "@/components/QuickActions";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";
import ErrorMessage from "../components/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalWasteCollected: 0,
    totalVolunteers: 0,
    eventsCompleted: 0,
    coastlineRestored: 0
  });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get total waste collected
      const { data: cleanupData, error: cleanupError } = await supabase
        .from('cleanups')
        .select('waste_collected');

      if (cleanupError) throw cleanupError;

      const totalWaste = cleanupData?.reduce((sum, cleanup) => 
        sum + Number(cleanup.waste_collected), 0) || 0;

      // Get total volunteers (unique users)
      const { count: volunteersCount, error: volunteersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (volunteersError) throw volunteersError;

      // Get completed events count
      const { count: eventsCount, error: eventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      if (eventsError) throw eventsError;

      // Get recent activities from social posts
      const { data: postsData, error: postsError } = await supabase
        .from('social_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (postsError) throw postsError;

      setStats({
        totalWasteCollected: Math.round(totalWaste),
        totalVolunteers: volunteersCount || 0,
        eventsCompleted: eventsCount || 0,
        coastlineRestored: Math.round(totalWaste / 100) // Estimate: 100kg per km
      });

      // Transform posts into activity feed format
      setActivities(postsData?.map(post => ({
        id: post.id,
        type: post.type,
        user: { name: 'User' }, // Would need to join with profiles
        content: post.content,
        location: post.location,
        timestamp: new Date(post.created_at),
        metadata: typeof post.metadata === 'object' ? post.metadata : {}
      })) || []);

    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const wasteBreakdown = [
    { type: "Plastic", amount: Math.round(stats.totalWasteCollected * 0.5), percentage: 50, color: "bg-red-500" },
    { type: "Organic", amount: Math.round(stats.totalWasteCollected * 0.2), percentage: 20, color: "bg-green-500" },
    { type: "Paper", amount: Math.round(stats.totalWasteCollected * 0.15), percentage: 15, color: "bg-blue-500" },
    { type: "Metal", amount: Math.round(stats.totalWasteCollected * 0.1), percentage: 10, color: "bg-yellow-500" },
    { type: "Glass", amount: Math.round(stats.totalWasteCollected * 0.05), percentage: 5, color: "bg-gray-500" }
  ];

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          title="Failed to load dashboard"
          message={error}
          onRetry={loadDashboardData}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#014F86] mb-2">Impact Dashboard</h1>
          <p className="text-gray-600">Track our collective environmental impact across India's coastline and community growth</p>
        </div>

        {/* Quick Actions */}
        <QuickActions variant="horizontal" className="mb-6" />

        {/* Enhanced Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Waste Collected"
            value={stats.totalWasteCollected}
            subtitle="kg"
            icon={Recycle}
            trend={{ value: 12, label: "vs last month", direction: "up" }}
            variant="success"
          />
          <StatCard
            title="Active Volunteers"
            value={stats.totalVolunteers}
            icon={Users}
            trend={{ value: 8, label: "this week", direction: "up" }}
            variant="default"
          />
          <StatCard
            title="Events Completed"
            value={stats.eventsCompleted}
            icon={Calendar}
            trend={{ value: 15, label: "this month", direction: "up" }}
            variant="warning"
          />
          <StatCard
            title="Coastline Restored"
            value={stats.coastlineRestored}
            subtitle="km"
            icon={MapPin}
            trend={{ value: 5, label: "this quarter", direction: "up" }}
            variant="success"
          />
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="breakdown">Waste Data</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#014F86]">
                  <TrendingUp className="h-5 w-5" />
                  Community Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center py-8">
                  <Award className="h-16 w-16 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-primary">
                    {stats.totalWasteCollected}kg Total Waste Collected
                  </h3>
                  <p className="text-gray-600">
                    Our community has made a significant impact on coastal conservation!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#014F86]">Waste Type Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteBreakdown.map((waste) => (
                    <div key={waste.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{waste.type}</span>
                        <span className="text-sm text-gray-600">{waste.amount}kg ({waste.percentage}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${waste.color}`}
                            style={{ width: `${waste.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{waste.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {activities.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No recent activity</h3>
                  <p className="text-gray-500">Start participating to see activity here!</p>
                </CardContent>
              </Card>
            ) : (
              <ActivityFeed 
                activities={activities}
                limit={10}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
