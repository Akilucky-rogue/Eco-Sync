
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  checkedIn?: boolean;
  points: number;
}

interface EventCheckInProps {
  event: Event;
  onCheckIn?: (eventId: string) => void;
}

const EventCheckIn = ({ event, onCheckIn }: EventCheckInProps) => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(event.checkedIn || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    console.log("Checking in to event:", event.id);
    
    // Simulate API call
    setTimeout(() => {
      setIsCheckedIn(true);
      setIsLoading(false);
      
      toast({
        title: "Check-in Successful!",
        description: `You've earned ${event.points} points for attending ${event.title}`,
      });
      
      onCheckIn?.(event.id);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canCheckIn = event.status === 'ongoing' && !isCheckedIn;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-[#014F86]">{event.title}</CardTitle>
          <Badge className={`${getStatusColor(event.status)} border-0`}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Earn {event.points} points
          </div>
        </div>

        {isCheckedIn ? (
          <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Successfully Checked In!</p>
              <p className="text-green-600 text-sm">+{event.points} points earned</p>
            </div>
          </div>
        ) : canCheckIn ? (
          <div className="space-y-4">
            <div className="flex justify-center p-6 bg-gray-50 rounded-lg">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
            <Button 
              onClick={handleCheckIn}
              disabled={isLoading}
              className="w-full bg-[#FF6F61] hover:bg-[#FF6F61]/90"
            >
              {isLoading ? "Checking In..." : "Check In to Event"}
            </Button>
            <p className="text-xs text-center text-gray-500">
              Scan the QR code at the event location or tap the button above
            </p>
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">
              {event.status === 'upcoming' ? 'Check-in will be available when the event starts' : 'Event has ended'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCheckIn;
