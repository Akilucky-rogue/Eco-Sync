
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const events = [
    {
      id: 1,
      name: "Santa Monica Beach Cleanup",
      date: "December 15, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Santa Monica Pier, CA",
      volunteers: 45,
      maxVolunteers: 60,
      description: "Join us for a morning cleanup focusing on plastic waste removal and beach restoration.",
      targetWaste: ["Plastic bottles", "Food wrappers", "Cigarette butts"],
      status: "upcoming"
    },
    {
      id: 2,
      name: "Venice Beach Restoration",
      date: "December 22, 2024", 
      time: "8:00 AM - 11:00 AM",
      location: "Venice Beach Boardwalk, CA",
      volunteers: 32,
      maxVolunteers: 50,
      description: "Early morning cleanup with focus on sorting recyclables and marine debris.",
      targetWaste: ["Glass bottles", "Metal cans", "Fishing gear"],
      status: "upcoming"
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#014F86] mb-2">Beach Cleanup Events</h1>
        <p className="text-gray-600">Find and join environmental restoration activities near you</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="border-l-4 border-l-[#FF6F61]">
            <CardHeader>
              <CardTitle className="text-[#014F86]">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#FF6F61]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-[#FF6F61]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#FF6F61]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#FF6F61]" />
                    <span>{event.volunteers}/{event.maxVolunteers} volunteers</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div>
                    <h4 className="text-sm font-medium text-[#014F86] mb-1">Target Waste:</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.targetWaste.map((waste, index) => (
                        <span key={index} className="bg-[#C5E4CF] text-[#014F86] text-xs px-2 py-1 rounded">
                          {waste}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white flex-1">
                  Join Event
                </Button>
                <Button variant="outline" className="border-[#014F86] text-[#014F86]">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
