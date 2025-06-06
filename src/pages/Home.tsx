import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Waves, TreePine, Fish, Star, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import WeatherWidget from "../components/WeatherWidget";
import VolunteerTestimonials from "../components/VolunteerTestimonials";

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "Mumbai Marine Drive Cleanup",
      date: "Dec 15, 2024",
      time: "6:00 AM",
      location: "Marine Drive, Mumbai",
      volunteers: 85,
      maxVolunteers: 120,
      priority: "High",
      category: "Beach",
      image: "🏖️"
    },
    {
      id: 2,
      name: "Goa Beach Restoration",
      date: "Dec 22, 2024",
      time: "7:00 AM",
      location: "Baga Beach, Goa",
      volunteers: 67,
      maxVolunteers: 100,
      priority: "Medium",
      category: "Coastal",
      image: "🌊"
    },
    {
      id: 3,
      name: "Chennai Marina Beach Care",
      date: "Dec 29, 2024",
      time: "5:30 AM",
      location: "Marina Beach, Chennai",
      volunteers: 52,
      maxVolunteers: 80,
      priority: "Low",
      category: "Marine",
      image: "🐠"
    }
  ];

  const impactStats = [
    { icon: Waves, label: "Coastline Cleaned", value: "28.5 km", color: "text-blue-600", bgColor: "bg-blue-50", iconBg: "bg-blue-100" },
    { icon: TreePine, label: "Mangroves Restored", value: "4,230", color: "text-green-600", bgColor: "bg-green-50", iconBg: "bg-green-100" },
    { icon: Fish, label: "Marine Life Protected", value: "35k+", color: "text-teal-600", bgColor: "bg-teal-50", iconBg: "bg-teal-100" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-[#014F86] via-[#0066A3] to-[#C5E4CF] text-white p-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🌊 Marine Conservation Platform
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Welcome to EcoSync India
          </h1>
          <p className="text-xl opacity-90 mb-6 max-w-2xl">
            Join our community in protecting India's marine ecosystems and coastal heritage through collaborative cleanup efforts
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/events">
              <Button size="lg" className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Calendar className="h-5 w-5 mr-2" />
                Explore Events
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg">
                <Star className="h-5 w-5 mr-2" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-8">
        {/* Enhanced Impact Stats */}
        <div className="grid grid-cols-3 gap-6">
          {impactStats.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${stat.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New: Weather Widget and Leaderboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeatherWidget />
          <Leaderboard />
        </div>

        {/* Enhanced Interactive Map */}
        <Card className="overflow-hidden shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              Coastal Cleanup Locations
              <Badge className="bg-white/20 text-white border-white/30">Live Updates</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 bg-gradient-to-br from-blue-50 via-blue-100 to-teal-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
              
              {/* Enhanced Map Pins */}
              <div className="absolute top-1/4 left-1/3 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-semibold text-[#014F86]">Mumbai</div>
                    <div className="text-sm text-gray-600">4 Active Events</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Mumbai</div>
              </div>
              
              <div className="absolute top-1/2 left-1/4 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-semibold text-[#014F86]">Goa</div>
                    <div className="text-sm text-gray-600">3 Active Events</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Goa</div>
              </div>
              
              <div className="absolute top-1/3 right-1/4 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-semibold text-[#014F86]">Chennai</div>
                    <div className="text-sm text-gray-600">2 Active Events</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Chennai</div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/2 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-semibold text-[#014F86]">Kochi</div>
                    <div className="text-sm text-gray-600">1 Active Event</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Kochi</div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <Award className="h-6 w-6 text-[#FF6F61]" />
                    <p className="text-[#014F86] font-bold text-lg">Interactive Map</p>
                  </div>
                  <p className="text-sm text-gray-600">Click on pins to view cleanup details</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Events */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
            <CardTitle className="text-[#014F86] flex items-center gap-3 text-xl">
              <div className="p-2 bg-[#014F86]/10 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              Upcoming Cleanups
              <Badge className="bg-[#FF6F61] text-white">Hot Events</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF6F61] to-[#E55B50]"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{event.image}</div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-[#014F86] text-lg group-hover:text-[#0066A3] transition-colors">{event.name}</h4>
                            <Badge className={`${getPriorityColor(event.priority)} border font-medium`}>
                              {event.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              {event.date} at {event.time}
                            </span>
                            <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                              <MapPin className="h-4 w-4 text-green-600" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                              <Users className="h-4 w-4 text-purple-600" />
                              {event.volunteers}/{event.maxVolunteers}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/events`}>
                        <Button className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] hover:from-[#E55B50] hover:to-[#D14E41] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <Award className="h-4 w-4 mr-2" />
                          Join Cleanup
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Volunteer Progress</span>
                        <span>{Math.round((event.volunteers / event.maxVolunteers) * 100)}% Full</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New: Volunteer Testimonials */}
        <VolunteerTestimonials />
      </div>
    </div>
  );
};

export default Home;
