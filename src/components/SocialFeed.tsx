
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Camera, Trophy } from "lucide-react";
import TeamCard from "./TeamCard";
import PhotoShareCard from "./PhotoShareCard";

const SocialFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for teams
  const teams = [
    {
      id: "1",
      name: "Mumbai Beach Warriors",
      description: "Dedicated to cleaning Mumbai's coastline every weekend",
      members: [
        { id: "1", name: "Ravi Kumar", role: 'leader' as const, joinedAt: "2024-01-15" },
        { id: "2", name: "Priya Singh", role: 'member' as const, joinedAt: "2024-02-01" },
        { id: "3", name: "Amit Shah", role: 'member' as const, joinedAt: "2024-02-15" },
        { id: "4", name: "Neha Patel", role: 'member' as const, joinedAt: "2024-03-01" }
      ],
      location: "Mumbai, Maharashtra",
      nextEvent: "Dec 15, 2024",
      isPublic: true,
      maxMembers: 20
    },
    {
      id: "2",
      name: "Goa Eco Guardians",
      description: "Protecting Goa's pristine beaches and marine life",
      members: [
        { id: "5", name: "Maria D'Souza", role: 'leader' as const, joinedAt: "2024-01-10" },
        { id: "6", name: "João Silva", role: 'member' as const, joinedAt: "2024-01-20" },
        { id: "7", name: "Sunita Rao", role: 'member' as const, joinedAt: "2024-02-05" }
      ],
      location: "Goa",
      nextEvent: "Dec 12, 2024",
      isPublic: true,
      maxMembers: 15
    }
  ];

  // Mock data for photos
  const photos = [
    {
      id: "1",
      user: { name: "Ravi Kumar", avatar: "" },
      image: "/placeholder.svg",
      caption: "Amazing cleanup at Juhu Beach today! Collected 50kg of plastic waste with the team. 🌊♻️",
      location: "Juhu Beach, Mumbai",
      eventName: "Weekend Cleanup",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      tags: ["BeachCleanup", "Mumbai", "Teamwork"],
      isLiked: false
    },
    {
      id: "2",
      user: { name: "Priya Singh", avatar: "" },
      image: "/placeholder.svg",
      caption: "Before and after shots from our mangrove restoration project. Nature is healing! 🌱",
      location: "Mangrove Park, Navi Mumbai",
      eventName: "Mangrove Restoration",
      timestamp: "1 day ago",
      likes: 36,
      comments: 12,
      tags: ["Mangroves", "Restoration", "Conservation"],
      isLiked: true
    }
  ];

  const handleJoinTeam = (teamId: string) => {
    console.log("Joining team:", teamId);
    // Implementation for joining team
  };

  const handleViewTeam = (teamId: string) => {
    console.log("Viewing team:", teamId);
    // Implementation for viewing team details
  };

  const handleLikePhoto = (photoId: string) => {
    console.log("Liking photo:", photoId);
    // Implementation for liking photo
  };

  const handleCommentPhoto = (photoId: string) => {
    console.log("Commenting on photo:", photoId);
    // Implementation for commenting on photo
  };

  const handleSharePhoto = (photoId: string) => {
    console.log("Sharing photo:", photoId);
    // Implementation for sharing photo
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search teams, people, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90">
          <Camera className="h-4 w-4 mr-2" />
          Share Photo
        </Button>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
          <TabsTrigger 
            value="teams" 
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white"
          >
            <Users className="h-5 w-5 mr-2" />
            Teams
          </TabsTrigger>
          <TabsTrigger 
            value="photos"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white"
          >
            <Camera className="h-5 w-5 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger 
            value="achievements"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C5E4CF] data-[state=active]:to-[#F6EFD2] data-[state=active]:text-[#014F86]"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Highlights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onJoin={handleJoinTeam}
                onView={handleViewTeam}
                isUserMember={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <PhotoShareCard
                key={photo.id}
                photo={photo}
                onLike={handleLikePhoto}
                onComment={handleCommentPhoto}
                onShare={handleSharePhoto}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-[#FF6F61] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Community Highlights</h3>
            <p className="text-gray-600">Recent achievements and milestones from our community will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialFeed;
