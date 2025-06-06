
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
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
  );
};

export default UpcomingEvents;
