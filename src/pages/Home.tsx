
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Waves, TreePine, Fish } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "Santa Monica Beach Cleanup",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Santa Monica Pier",
      volunteers: 45,
      maxVolunteers: 60,
      priority: "High",
      category: "Beach"
    },
    {
      id: 2,
      name: "Venice Beach Restoration",
      date: "Dec 22, 2024",
      time: "8:00 AM",
      location: "Venice Beach Boardwalk",
      volunteers: 32,
      maxVolunteers: 50,
      priority: "Medium",
      category: "Coastal"
    },
    {
      id: 3,
      name: "Malibu Coastal Care",
      date: "Dec 29, 2024",
      time: "7:30 AM",
      location: "Malibu State Beach",
      volunteers: 28,
      maxVolunteers: 40,
      priority: "Low",
      category: "Marine"
    }
  ];

  const impactStats = [
    { icon: Waves, label: "Coastline Cleaned", value: "12.5 km", color: "text-blue-600" },
    { icon: TreePine, label: "Trees Saved", value: "2,340", color: "text-green-600" },
    { icon: Fish, label: "Marine Life Protected", value: "15k+", color: "text-teal-600" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#014F86] to-[#C5E4CF] text-white p-6 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome to EcoSync</h1>
          <p className="text-lg opacity-90 mb-4">Join our community in protecting marine ecosystems through collaborative cleanup efforts</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/events">
              <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                View All Events
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Take Environmental Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-4">
          {impactStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-lg font-bold text-[#014F86]">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#014F86]">
              <MapPin className="h-5 w-5" />
              Cleanup Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
              
              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/3">
                <div className="w-6 h-6 bg-[#FF6F61] rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-center mt-1 font-medium">Santa Monica</div>
              </div>
              
              <div className="absolute top-1/2 left-1/4">
                <div className="w-6 h-6 bg-[#FF6F61] rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-center mt-1 font-medium">Venice</div>
              </div>
              
              <div className="absolute top-1/3 right-1/4">
                <div className="w-6 h-6 bg-[#FF6F61] rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-xs text-center mt-1 font-medium">Malibu</div>
              </div>
              
              <div className="text-center">
                <p className="text-[#014F86] font-medium">Interactive Map</p>
                <p className="text-sm text-gray-600">Click on pins to view cleanup details</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#014F86]">Upcoming Cleanups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-[#014F86]">{event.name}</h4>
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date} at {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.volunteers}/{event.maxVolunteers}
                      </span>
                    </div>
                  </div>
                  <Link to={`/events`}>
                    <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white">
                      Join Cleanup
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
