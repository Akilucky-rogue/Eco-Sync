
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, Calendar, FileText, BarChart3 } from "lucide-react";

const Admin = () => {
  const adminStats = {
    activeEvents: 3,
    totalVolunteers: 1247,
    pendingReports: 5,
    monthlyEvents: 12
  };

  const recentEvents = [
    { name: "Santa Monica Beach Cleanup", status: "active", volunteers: 45, date: "Dec 15" },
    { name: "Venice Beach Restoration", status: "scheduled", volunteers: 32, date: "Dec 22" },
    { name: "Malibu Coastal Care", status: "scheduled", volunteers: 28, date: "Dec 29" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#014F86]">Admin Panel</h1>
          <p className="text-gray-600">Manage events and track volunteer activities</p>
        </div>
        <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{adminStats.activeEvents}</div>
            <div className="text-xs text-gray-600">Active Events</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{adminStats.totalVolunteers}</div>
            <div className="text-xs text-gray-600">Total Volunteers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{adminStats.pendingReports}</div>
            <div className="text-xs text-gray-600">Pending Reports</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-[#FF6F61] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#014F86]">{adminStats.monthlyEvents}</div>
            <div className="text-xs text-gray-600">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#014F86] flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-[#014F86]">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.date} • {event.volunteers} volunteers</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-[#FF6F61] mx-auto mb-3" />
            <h3 className="font-medium text-[#014F86] mb-2">Generate Report</h3>
            <p className="text-sm text-gray-600">Create AI-powered impact summaries</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-[#FF6F61] mx-auto mb-3" />
            <h3 className="font-medium text-[#014F86] mb-2">Volunteer Management</h3>
            <p className="text-sm text-gray-600">View and manage volunteer profiles</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-[#FF6F61] mx-auto mb-3" />
            <h3 className="font-medium text-[#014F86] mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">Detailed impact and engagement metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
