import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users, Clock, Award, CheckCircle, Star, Sparkles, Trophy } from "lucide-react";

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
      status: "upcoming",
      image: "🏖️"
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
      status: "upcoming",
      image: "🌊"
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
      status: "upcoming",
      image: "🐠"
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
      status: "upcoming",
      image: "🌴"
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
      status: "completed",
      image: "🏖️"
    },
    {
      id: 6,
      name: "Puri Beach Conservation",
      date: "Nov 24, 2024",
      wasteCollected: "189 kg",
      volunteers: 68,
      pointsEarned: 55,
      status: "completed",
      image: "🌅"
    },
    {
      id: 7,
      name: "Visakhapatnam Coastal Care",
      date: "Nov 15, 2024",
      wasteCollected: "312 kg",
      volunteers: 128,
      pointsEarned: 90,
      status: "completed",
      image: "⛵"
    }
  ];

  const handleJoinEvent = (eventId: number) => {
    setJoinedEvents(prev => [...prev, eventId]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Enhanced Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <Badge className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2] text-[#014F86] border-0 px-4 py-2 text-sm font-semibold">
            🌊 Coastal Conservation Events
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#014F86] mb-3 bg-gradient-to-r from-[#014F86] to-[#0066A3] bg-clip-text text-transparent">
          Coastal Cleanup Events
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover and join cleanup events across India's coastline to make a positive environmental impact
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
          <TabsTrigger 
            value="upcoming" 
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger 
            value="past"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Past Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {allEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-br from-[#C5E4CF] via-[#F6EFD2] to-[#E8F5E8] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{event.image}</div>
                    <div>
                      <CardTitle className="text-[#014F86] mb-3 text-xl">{event.name}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-white/50 border-[#014F86]/20 text-[#014F86] font-medium">
                          {event.category}
                        </Badge>
                        <Badge className={`${getDifficultyColor(event.difficulty)} border font-medium`}>
                          {event.difficulty}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] text-white border-0 shadow-md">
                          <Award className="h-3 w-3 mr-1" />
                          {event.pointsReward} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {joinedEvents.includes(event.id) ? (
                    <Button disabled className="bg-green-600 text-white shadow-lg">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Joined
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleJoinEvent(event.id)}
                      className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] hover:from-[#E55B50] hover:to-[#D14E41] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      size="lg"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Join Event
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium">{event.volunteers}/{event.maxVolunteers}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Volunteer Progress</span>
                    <span className="font-semibold">{Math.round((event.volunteers / event.maxVolunteers) * 100)}% Full</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#014F86] mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Target Waste Types:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.wasteTarget.map((waste, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gray-50 hover:bg-gray-100 transition-colors">
                        {waste}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastEvents.map((event) => (
            <Card key={event.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{event.image}</div>
                    <div>
                      <h3 className="font-bold text-[#014F86] text-xl mb-1">{event.name}</h3>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 font-semibold">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-blue-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-[#FF6F61] mb-1">{event.wasteCollected}</div>
                    <div className="text-sm text-gray-600 font-medium">Waste Collected</div>
                  </div>
                  <div className="text-center bg-green-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-[#FF6F61] mb-1">{event.volunteers}</div>
                    <div className="text-sm text-gray-600 font-medium">Volunteers</div>
                  </div>
                  <div className="text-center bg-yellow-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-[#FF6F61] mb-1">+{event.pointsEarned}</div>
                    <div className="text-sm text-gray-600 font-medium">Points Earned</div>
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
