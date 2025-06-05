
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Calendar, Award } from "lucide-react";

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "Santa Monica Beach Cleanup",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      volunteers: 45,
      location: "Santa Monica Pier"
    },
    {
      id: 2,
      name: "Venice Beach Restoration",
      date: "Dec 22, 2024", 
      time: "8:00 AM",
      volunteers: 32,
      location: "Venice Beach Boardwalk"
    },
    {
      id: 3,
      name: "Malibu Coastal Care",
      date: "Dec 29, 2024",
      time: "10:00 AM", 
      volunteers: 28,
      location: "Malibu State Beach"
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#014F86] to-[#FF6F61] text-white rounded-lg p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Clean Oceans, Bright Future</h2>
        <p className="text-lg opacity-90">Join beach cleanups, earn rewards, and make a real impact</p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm opacity-80">Volunteers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">8.5k kg</div>
            <div className="text-sm opacity-80">Waste Removed</div>
          </div>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#014F86]" />
            Cleanup Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#C5E4CF] h-48 rounded-lg flex items-center justify-center">
            <div className="text-center text-[#014F86]">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm opacity-70">Beach cleanup locations will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#FF6F61]" />
            Upcoming Cleanups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#014F86]">{event.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{event.date} • {event.time}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.volunteers} joined
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
                <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white">
                  Join
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-20 bg-[#C5E4CF] text-[#014F86] hover:bg-[#C5E4CF]/90 flex flex-col gap-2">
          <Award className="h-6 w-6" />
          Take Quiz
        </Button>
        <Button className="h-20 bg-[#F6EFD2] text-[#014F86] hover:bg-[#F6EFD2]/90 flex flex-col gap-2">
          <Users className="h-6 w-6" />
          Find Team
        </Button>
      </div>
    </div>
  );
};

export default Home;
