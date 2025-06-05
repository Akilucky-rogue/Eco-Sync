
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users, Clock, Award, CheckCircle } from "lucide-react";

const Events = () => {
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const allEvents = [
    {
      id: 1,
      name: "Santa Monica Beach Cleanup",
      date: "Dec 15, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Santa Monica Pier, CA",
      description: "Join us for a comprehensive beach cleanup focusing on plastic waste removal and marine debris collection.",
      volunteers: 45,
      maxVolunteers: 60,
      pointsReward: 50,
      category: "Beach Cleanup",
      difficulty: "Beginner",
      wasteTarget: ["Plastic bottles", "Food wrappers", "Cigarette butts"],
      status: "upcoming"
    },
    {
      id: 2,
      name: "Venice Beach Restoration",
      date: "Dec 22, 2024",
      time: "8:00 AM - 11:00 AM",
      location: "Venice Beach Boardwalk, CA",
      description: "Restore the natural beauty of Venice Beach while protecting marine wildlife habitats.",
      volunteers: 32,
      maxVolunteers: 50,
      pointsReward: 75,
      category: "Coastal Restoration",
      difficulty: "Intermediate",
      wasteTarget: ["Glass bottles", "Metal cans", "Plastic debris"],
      status: "upcoming"
    },
    {
      id: 3,
      name: "Malibu Coastal Care",
      date: "Dec 29, 2024",
      time: "7:30 AM - 10:30 AM",
      location: "Malibu State Beach, CA",
      description: "Early morning cleanup to protect sensitive coastal ecosystems and nesting areas.",
      volunteers: 28,
      maxVolunteers: 40,
      pointsReward: 60,
      category: "Marine Protection",
      difficulty: "Advanced",
      wasteTarget: ["Fishing nets", "Rope", "Large debris"],
      status: "upcoming"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      name: "Manhattan Beach Cleanup",
      date: "Dec 1, 2024",
      wasteCollected: "125 kg",
      volunteers: 35,
      pointsEarned: 65,
      status: "completed"
    },
    {
      id: 5,
      name: "Hermosa Beach Care",
      date: "Nov 24, 2024",
      wasteCollected: "89 kg",
      volunteers: 28,
      pointsEarned: 45,
      status: "completed"
    }
  ];

  const handleJoinEvent = (eventId: number) => {
    setJoinedEvents(prev => [...prev, eventId]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#014F86] mb-2">Beach Cleanup Events</h1>
        <p className="text-gray-600">Discover and join cleanup events to make a positive environmental impact</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {allEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-[#014F86] mb-2">{event.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge className={getDifficultyColor(event.difficulty)}>
                        {event.difficulty}
                      </Badge>
                      <Badge className="bg-[#FF6F61] text-white">
                        <Award className="h-3 w-3 mr-1" />
                        {event.pointsReward} pts
                      </Badge>
                    </div>
                  </div>
                  {joinedEvents.includes(event.id) ? (
                    <Button disabled className="bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Joined
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleJoinEvent(event.id)}
                      className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white"
                    >
                      Join Event
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FF6F61]" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FF6F61]" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#FF6F61]" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#FF6F61]" />
                    <span className="text-sm">{event.volunteers}/{event.maxVolunteers}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#014F86] mb-2">Target Waste Types:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.wasteTarget.map((waste, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {waste}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-[#014F86]">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#FF6F61]">{event.wasteCollected}</div>
                    <div className="text-xs text-gray-600">Waste Collected</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#FF6F61]">{event.volunteers}</div>
                    <div className="text-xs text-gray-600">Volunteers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#FF6F61]">+{event.pointsEarned}</div>
                    <div className="text-xs text-gray-600">Points Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
