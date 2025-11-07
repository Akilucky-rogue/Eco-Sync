import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Award, Recycle, Calendar, MapPin, Plus, Camera, Bell, BarChart3, PieChart } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatCard from "@/components/StatCard";
import ActivityFeed from "@/components/ActivityFeed";
import QuickActions from "@/components/QuickActions";
import PhotoUploadDialog from "@/components/PhotoUploadDialog";
import NotificationSystem from "@/components/NotificationSystem";
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
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

      // Get recent activities from social posts with user profiles
      const { data: postsData, error: postsError } = await supabase
        .from('social_posts')
        .select(`
          *,
          profiles!inner(full_name, avatar_url)
        `)
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
        user: { 
          name: (post.profiles as any)?.full_name || 'Anonymous User',
          avatar: (post.profiles as any)?.avatar_url
        },
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

  // Monthly trend data (mock data - replace with real data from backend)
  const monthlyTrends = [
    { month: "Jul", waste: 45, volunteers: 28, events: 3 },
    { month: "Aug", waste: 62, volunteers: 35, events: 4 },
    { month: "Sep", waste: 85, volunteers: 42, events: 5 },
    { month: "Oct", waste: 120, volunteers: 58, events: 7 },
    { month: "Nov", waste: Math.round(stats.totalWasteCollected * 0.3), volunteers: Math.round(stats.totalVolunteers * 0.8), events: stats.eventsCompleted }
  ];

  // Waste breakdown for pie chart
  const wasteBreakdown = [
    { type: "Plastic", amount: Math.round(stats.totalWasteCollected * 0.5), percentage: 50, color: "#ef4444" },
    { type: "Organic", amount: Math.round(stats.totalWasteCollected * 0.2), percentage: 20, color: "#22c55e" },
    { type: "Paper", amount: Math.round(stats.totalWasteCollected * 0.15), percentage: 15, color: "#3b82f6" },
    { type: "Metal", amount: Math.round(stats.totalWasteCollected * 0.1), percentage: 10, color: "#eab308" },
    { type: "Glass", amount: Math.round(stats.totalWasteCollected * 0.05), percentage: 5, color: "#6b7280" }
  ];

  // Weekly comparison data
  const weeklyComparison = [
    { week: "Week 1", collected: 45, target: 50 },
    { week: "Week 2", collected: 62, target: 60 },
    { week: "Week 3", collected: 58, target: 65 },
    { week: "Week 4", collected: 75, target: 70 }
  ];

  // Chart colors
  const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#6b7280"];

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
        <QuickActions 
          variant="horizontal" 
          className="mb-6"
          actions={[
            {
              id: 'create-event',
              label: 'Create Event',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/events/manage'),
              variant: 'primary'
            },
            {
              id: 'join-cleanup',
              label: 'Join Cleanup',
              icon: <Calendar className="h-4 w-4" />,
              onClick: () => navigate('/events')
            },
            {
              id: 'share-photo',
              label: 'Share Photo',
              icon: <Camera className="h-4 w-4" />,
              onClick: () => setShowPhotoDialog(true)
            },
            {
              id: 'find-team',
              label: 'Find Team',
              icon: <Users className="h-4 w-4" />,
              onClick: () => navigate('/social')
            },
            {
              id: 'view-map',
              label: 'View Map',
              icon: <MapPin className="h-4 w-4" />,
              onClick: () => navigate('/map')
            },
            {
              id: 'notifications',
              label: 'Alerts',
              icon: <Bell className="h-4 w-4" />,
              onClick: () => setShowNotifications(true)
            }
          ]}
        />

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
            {/* Growth Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#014F86]">
                  <TrendingUp className="h-5 w-5" />
                  Community Growth Trends
                </CardTitle>
                <CardDescription>Monthly progress across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrends}>
                    <defs>
                      <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6F61" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF6F61" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#014F86" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#014F86" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="waste" 
                      stroke="#FF6F61" 
                      fillOpacity={1} 
                      fill="url(#colorWaste)" 
                      name="Waste (kg)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="volunteers" 
                      stroke="#014F86" 
                      fillOpacity={1} 
                      fill="url(#colorVolunteers)" 
                      name="Volunteers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#014F86]">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Performance
                  </CardTitle>
                  <CardDescription>Collected vs Target</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="week" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Bar dataKey="collected" fill="#22c55e" name="Collected (kg)" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="target" fill="#014F86" name="Target (kg)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#014F86]">
                    <Award className="h-5 w-5" />
                    Impact Summary
                  </CardTitle>
                  <CardDescription>Community achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Waste Collected</p>
                        <p className="text-2xl font-bold text-[#014F86]">{stats.totalWasteCollected}kg</p>
                      </div>
                      <Award className="h-12 w-12 text-[#FF6F61]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Coastline Restored</p>
                        <p className="text-2xl font-bold text-[#014F86]">{stats.coastlineRestored}km</p>
                      </div>
                      <MapPin className="h-12 w-12 text-[#22c55e]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Volunteers</p>
                        <p className="text-2xl font-bold text-[#014F86]">{stats.totalVolunteers}</p>
                      </div>
                      <Users className="h-12 w-12 text-[#3b82f6]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#014F86]">
                    <PieChart className="h-5 w-5" />
                    Waste Type Distribution
                  </CardTitle>
                  <CardDescription>Breakdown by material type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie
                        data={wasteBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type} ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {wasteBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        formatter={(value: number) => `${value}kg`}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#014F86]">
                    <Recycle className="h-5 w-5" />
                    Detailed Breakdown
                  </CardTitle>
                  <CardDescription>Material analysis with metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wasteBreakdown.map((waste, index) => (
                      <div key={waste.type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: COLORS[index] }}
                            ></div>
                            <span className="font-medium">{waste.type}</span>
                          </div>
                          <span className="text-sm text-gray-600">{waste.amount}kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={waste.percentage} className="flex-1" />
                          <span className="text-sm font-medium text-[#014F86]">{waste.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2] rounded-lg">
                    <p className="text-sm font-semibold text-[#014F86] mb-1">Environmental Impact</p>
                    <p className="text-xs text-gray-700">
                      By removing {stats.totalWasteCollected}kg of waste, our community has prevented approximately {Math.round(stats.totalWasteCollected * 0.3)}kg of plastic from entering the ocean.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparative Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#014F86]">
                  <BarChart3 className="h-5 w-5" />
                  Material Comparison
                </CardTitle>
                <CardDescription>Waste collected by type over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={wasteBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="type" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value: number) => `${value}kg`}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                      {wasteBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
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

        {/* Photo Upload Dialog */}
        <PhotoUploadDialog 
          open={showPhotoDialog}
          onOpenChange={setShowPhotoDialog}
        />

        {/* Notification System */}
        {showNotifications && (
          <NotificationSystem onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
