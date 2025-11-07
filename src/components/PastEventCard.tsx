
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface PastEventCardProps {
  event: {
    id: number;
    name: string;
    date: string;
    wasteCollected: string;
    volunteers: number;
    pointsEarned: number;
    status: string;
    image: string;
  };
}

const PastEventCard = ({ event }: PastEventCardProps) => {
  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md border-2 border-gray-200">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a';
                }}
              />
            </div>
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
  );
};

export default PastEventCard;
