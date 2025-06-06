
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy } from "lucide-react";
import EventCard from "../components/EventCard";
import PastEventCard from "../components/PastEventCard";
import EventsHeader from "../components/EventsHeader";

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

  return (
    <div className="container mx-auto p-4">
      <EventsHeader />

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
            <EventCard
              key={event.id}
              event={event}
              isJoined={joinedEvents.includes(event.id)}
              onJoin={handleJoinEvent}
            />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastEvents.map((event) => (
            <PastEventCard key={event.id} event={event} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
