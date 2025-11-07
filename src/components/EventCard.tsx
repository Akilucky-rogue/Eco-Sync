
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Clock, Award, CheckCircle, Star } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    volunteers: number;
    maxVolunteers: number;
    pointsReward: number;
    category: string;
    difficulty: string;
    wasteTarget: string[];
    status: string;
    image: string;
  };
  isJoined: boolean;
  onJoin: (eventId: string) => void;
}

const EventCard = ({ event, isJoined, onJoin }: EventCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      <CardHeader className="bg-gradient-to-br from-[#C5E4CF] via-[#F6EFD2] to-[#E8F5E8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md border-2 border-white/50">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519046904884-53103b34b206';
                }}
              />
            </div>
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
          {isJoined ? (
            <Button disabled className="bg-green-600 text-white shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Joined
            </Button>
          ) : (
            <Button 
              onClick={() => onJoin(event.id)}
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
  );
};

export default EventCard;
