
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

interface StatusUpdate {
  id: string;
  type: 'info' | 'warning' | 'success' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  eventId: string;
}

interface EventStatusUpdatesProps {
  eventId: string;
  eventTitle: string;
}

const EventStatusUpdates = ({ eventId, eventTitle }: EventStatusUpdatesProps) => {
  const [updates, setUpdates] = useState<StatusUpdate[]>([]);

  // Mock real-time updates
  useEffect(() => {
    const mockUpdates: StatusUpdate[] = [
      {
        id: "1",
        type: "info",
        title: "Event Starting Soon",
        message: "The cleanup event will begin in 30 minutes. Please arrive at the meeting point.",
        timestamp: "2024-12-10T09:30:00Z",
        eventId
      },
      {
        id: "2",
        type: "warning",
        title: "Weather Update",
        message: "Light rain expected around 2 PM. We have umbrellas and raincoats available.",
        timestamp: "2024-12-10T08:45:00Z",
        eventId
      },
      {
        id: "3",
        type: "success",
        title: "Great Progress!",
        message: "We've already collected 25kg of plastic waste! Keep up the excellent work!",
        timestamp: "2024-12-10T11:15:00Z",
        eventId
      }
    ];

    setUpdates(mockUpdates);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newUpdate: StatusUpdate = {
        id: Date.now().toString(),
        type: "info",
        title: "Live Update",
        message: "Another volunteer has joined the cleanup! Total participants: " + Math.floor(Math.random() * 50 + 20),
        timestamp: new Date().toISOString(),
        eventId
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [eventId]);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'reminder': return <Clock className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getUpdateVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'success': return 'default';
      default: return 'default';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-[#014F86]">
          <Bell className="h-5 w-5" />
          Live Updates - {eventTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {updates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No updates available</p>
        ) : (
          updates.map((update) => (
            <Alert key={update.id} variant={getUpdateVariant(update.type)} className="border-l-4">
              <div className="flex items-start gap-3">
                {getUpdateIcon(update.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{update.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {formatTime(update.timestamp)}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm">
                    {update.message}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EventStatusUpdates;
