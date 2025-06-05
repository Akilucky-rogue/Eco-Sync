
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Award, Recycle, Calendar, MapPin } from "lucide-react";

const Dashboard = () => {
  const overallStats = {
    totalWasteCollected: 2847,
    totalVolunteers: 1247,
    eventsCompleted: 45,
    coastlineRestored: 12.5
  };

  const monthlyData = [
    { month: "Aug", waste: 320, volunteers: 89, events: 8 },
    { month: "Sep", waste: 450, volunteers: 156, events: 12 },
    { month: "Oct", waste: 380, volunteers: 134, events: 10 },
    { month: "Nov", waste: 520, volunteers: 189, events: 15 },
    { month: "Dec", waste: 1177, volunteers: 679, events: 0 } // Current month (partial)
  ];

  const wasteBreakdown = [
    { type: "Plastic", amount: 1420, percentage: 50, color: "bg-red-500" },
    { type: "Glass", amount: 569, percentage: 20, color: "bg-green-500" },
    { type: "Metal", amount: 427, percentage: 15, color: "bg-blue-500" },
    { type: "Organic", amount: 285, percentage: 10, color: "bg-yellow-500" },
    { type: "Other", amount: 146, percentage: 5, color: "bg-gray-500" }
  ];

  const topLocations = [
    { name: "Santa Monica Beach", cleanups: 12, waste: "456 kg", impact: "High" },
    { name: "Venice Beach", cleanups: 8, waste: "324 kg", impact: "Medium" },
    { name: "Malibu Coast", cleanups: 6, waste: "289 kg", impact: "High" },
    { name: "Manhattan Beach", cleanups: 5, waste: "198 kg", impact: "Medium" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#014F86] mb-2">Impact Dashboard</h1>
        <p className="text-gray-600">Track our collective environmental impact and community growth</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Recycle className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{overallStats.totalWasteCollected}</div>
            <div className="text-xs text-gray-600">kg Waste Collected</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{overallStats.totalVolunteers}</div>
            <div className="text-xs text-gray-600">Active Volunteers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{overallStats.eventsCompleted}</div>
            <div className="text-xs text-gray-600">Events Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{overallStats.coastlineRestored}</div>
            <div className="text-xs text-gray-600">km Coastline Restored</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="breakdown">Waste Breakdown</TabsTrigger>
          <TabsTrigger value="locations">Top Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#014F86]">
                <TrendingUp className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyData.map((month) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#014F86]">{month.month} 2024</span>
                      <div className="text-right text-sm">
                        <div>{month.waste}kg waste • {month.volunteers} volunteers • {month.events} events</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Waste</div>
                        <Progress value={(month.waste / 600) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Volunteers</div>
                        <Progress value={(month.volunteers / 200) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Events</div>
                        <Progress value={(month.events / 15) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
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

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#014F86]">Top Cleanup Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <div key={location.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF6F61] text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#014F86]">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.cleanups} cleanups • {location.waste}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(location.impact)}`}>
                      {location.impact} Impact
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

export default Dashboard;
