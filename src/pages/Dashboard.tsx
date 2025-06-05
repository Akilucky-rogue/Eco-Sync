
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

const Dashboard = () => {
  const impactStats = {
    totalWaste: 8547,
    totalVolunteers: 1247,
    eventsCompleted: 45,
    beachesRestored: 12
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#014F86] mb-2">Impact Dashboard</h1>
        <p className="text-gray-600">Real-time environmental impact tracking</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#FF6F61]">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{impactStats.totalWaste.toLocaleString()}</div>
            <div className="text-xs text-gray-600">kg Waste Removed</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#C5E4CF]">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-[#014F86] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{impactStats.totalVolunteers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Active Volunteers</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#FF6F61]">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{impactStats.eventsCompleted}</div>
            <div className="text-xs text-gray-600">Events Completed</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#C5E4CF]">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-[#014F86] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{impactStats.beachesRestored}</div>
            <div className="text-xs text-gray-600">Beaches Restored</div>
          </CardContent>
        </Card>
      </div>

      {/* Waste Breakdown Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#014F86]">Waste Collection by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-b from-[#C5E4CF]/20 to-[#F6EFD2]/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-[#014F86]">
              <BarChart3 className="h-16 w-16 mx-auto mb-4" />
              <p className="font-medium">Interactive Charts Coming Soon</p>
              <p className="text-sm opacity-70">Waste breakdown analytics will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Volunteers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#014F86]">Top Volunteers This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Sarah Martinez", points: 892, waste: "12.3 kg" },
              { name: "Mike Johnson", points: 756, waste: "9.8 kg" },
              { name: "Lisa Chen", points: 634, waste: "8.1 kg" }
            ].map((volunteer, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF6F61] text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-[#014F86]">{volunteer.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-[#FF6F61]">{volunteer.points} pts</div>
                  <div className="text-sm text-gray-600">{volunteer.waste}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Report Section */}
      <Card className="bg-gradient-to-r from-[#F6EFD2] to-[#C5E4CF]">
        <CardHeader>
          <CardTitle className="text-[#014F86]">
            Latest AI Impact Report
            <span className="text-xs ml-2 bg-[#014F86] text-white px-2 py-1 rounded">Powered by KakushIN LLM</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-700 italic">
              "This month, EcoSync volunteers achieved remarkable progress with 45 cleanup events across 12 coastal locations. 
              A total of 8,547 kg of waste was removed, including 5,200 kg of plastic debris, 2,100 kg of glass materials, 
              and 1,247 kg of metal waste. The collective effort of 1,247 active volunteers prevented thousands of harmful 
              items from entering marine ecosystems, directly contributing to ocean health restoration."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
