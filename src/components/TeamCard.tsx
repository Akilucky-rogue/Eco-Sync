
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MapPin, Calendar, Crown } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'leader' | 'member';
  joinedAt: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  location: string;
  nextEvent?: string;
  isPublic: boolean;
  maxMembers: number;
}

interface TeamCardProps {
  team: Team;
  onJoin?: (teamId: string) => void;
  onView?: (teamId: string) => void;
  isUserMember?: boolean;
}

const TeamCard = ({ team, onJoin, onView, isUserMember = false }: TeamCardProps) => {
  const leader = team.members.find(member => member.role === 'leader');
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-[#014F86] text-lg">{team.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{team.description}</p>
          </div>
          <Badge variant={team.isPublic ? "default" : "secondary"} className="text-xs">
            {team.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          {team.location}
        </div>
        
        {team.nextEvent && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            Next event: {team.nextEvent}
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Team Members</span>
            <span className="text-xs text-gray-500">{team.members.length}/{team.maxMembers}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {team.members.slice(0, 4).map((member) => (
                <div key={member.id} className="relative">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {member.role === 'leader' && (
                    <Crown className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
                  )}
                </div>
              ))}
            </div>
            {team.members.length > 4 && (
              <span className="text-xs text-gray-500">+{team.members.length - 4} more</span>
            )}
          </div>
          
          {leader && (
            <p className="text-xs text-gray-600">
              Led by <span className="font-medium">{leader.name}</span>
            </p>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          {isUserMember ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView?.(team.id)}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              View Team
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => onJoin?.(team.id)}
              disabled={team.members.length >= team.maxMembers}
              className="flex-1 bg-[#FF6F61] hover:bg-[#FF6F61]/90"
            >
              <Users className="h-4 w-4 mr-2" />
              {team.members.length >= team.maxMembers ? "Full" : "Join Team"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
