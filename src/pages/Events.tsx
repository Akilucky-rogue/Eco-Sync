
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
      name: "Mumbai Marine Drive Cleanup",
      date: "Dec 15, 2024",
      time: "6:00 AM - 9:00 AM",
      location: "Marine Drive, Mumbai, Maharashtra",
      description: "Join us for a comprehensive beach cleanup focusing on plastic waste removal and marine debris collection along Mumbai's iconic Marine Drive.",
      volunteers: 85,
      maxVolunteers: 120,
      pointsReward: 60,
      category: "Beach Cleanup",
      difficulty: "Beginner",
      wasteTarget: ["Plastic bottles", "Food wrappers", "Cigarette butts", "Polythene bags"],
      status: "upcoming"
    },
    {
      id: 2,
      name: "Goa Beach Restoration",
      date: "Dec 22, 2024",
      time: "7:00 AM - 10:00 AM",
      location: "Baga Beach, Goa",
      description: "Restore the natural beauty of Goa's beaches while protecting marine wildlife habitats and preserving coastal biodiversity.",
      volunteers: 67,
      maxVolunteers: 100,
      pointsReward: 80,
      category: "Coastal Restoration",
      difficulty: "Intermediate",
      wasteTarget: ["Glass bottles", "Metal cans", "Plastic debris", "Fishing nets"],
      status: "upcoming"
    },
    {
      id: 3,
      name: "Chennai Marina Beach Care",
      date: "Dec 29, 2024",
      time: "5:30 AM - 8:30 AM",
      location: "Marina Beach, Chennai, Tamil Nadu",
      description: "Early morning cleanup at one of India's longest beaches to protect sensitive coastal ecosystems and nesting areas.",
      volunteers: 52,
      maxVolunteers: 80,
      pointsReward: 75,
      category: "Marine Protection",
      difficulty: "Advanced",
      wasteTarget: ["Large debris", "Rope", "Medical waste", "Industrial waste"],
      status: "upcoming"
    },
    {
      id: 4,
      name: "Kochi Backwaters Conservation",
      date: "Jan 5, 2025",
      time: "6:30 AM - 9:30 AM",
      location: "Kochi Backwaters, Kerala",
      description: "Protect the unique backwater ecosystem while cleaning waterways and preserving mangrove habitats.",
      volunteers: 43,
      maxVolunteers: 70,
      pointsReward: 85,
      category: "Waterway Cleanup",
      difficulty: "Intermediate",
      wasteTarget: ["Plastic waste", "Coconut shells", "Paper waste", "Organic debris"],
      status: "upcoming"
    }
  ];

  const pastEvents = [
    {
      id: 5,
      name: "Juhu Beach Cleanup",
      date: "Dec 1, 2024",
      wasteCollected: "245 kg",
      volunteers: 95,
      pointsEarned: 70,
      status: "completed"
    },
    {
      id: 6,
      name: "Puri Beach Conservation",
      date: "Nov 24, 2024",
      wasteCollected: "189 kg",
      volunteers: 68,
      pointsEarned: 55,
      status: "completed"
    },
    {
      id: 7,
      name: "Visakhapatnam Coastal Care",
      date: "Nov 15, 2024",
      wasteCollected: "312 kg",
      volunteers: 128,
      pointsEarned: 90,
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
        <h1 className="text-2xl font-bold text-[#014F86] mb-2">Coastal Cleanup Events</h1>
        <p className="text-gray-600">Discover and join cleanup events across India's coastline to make a positive environmental impact</p>
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
