import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, Users, Award, Camera, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: 'cleanup' | 'achievement' | 'photo' | 'team_join' | 'comment';
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  location?: string;
  timestamp: Date;
  metadata?: {
    points?: number;
    participants?: number;
    likes?: number;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
  showHeader?: boolean;
}

const ActivityFeed = ({ activities, limit = 10, showHeader = true }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'cleanup':
        return <MapPin className="h-4 w-4 text-brand-green" />;
      case 'achievement':
        return <Award className="h-4 w-4 text-brand-accent" />;
      case 'photo':
        return <Camera className="h-4 w-4 text-brand-primary" />;
      case 'team_join':
        return <Users className="h-4 w-4 text-brand-secondary" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'cleanup':
        return 'bg-brand-green/10 border-brand-green/20';
      case 'achievement':
        return 'bg-brand-accent/10 border-brand-accent/20';
      case 'photo':
        return 'bg-brand-primary/10 border-brand-primary/20';
      case 'team_join':
        return 'bg-brand-secondary/10 border-brand-secondary/20';
      default:
        return 'bg-muted/10 border-muted/20';
    }
  };

  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <Card className="w-full">
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-primary">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={showHeader ? "pt-0" : "pt-6"}>
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border ${getActivityColor(activity.type)} hover:shadow-sm transition-shadow`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="bg-brand-primary text-white text-xs">
                  {activity.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getActivityIcon(activity.type)}
                  <span className="font-medium text-sm text-foreground">
                    {activity.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.content}
                </p>
                
                <div className="flex items-center space-x-3 text-xs">
                  {activity.location && (
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                  
                  {activity.metadata?.points && (
                    <Badge variant="secondary" className="text-xs">
                      +{activity.metadata.points} pts
                    </Badge>
                  )}
                  
                  {activity.metadata?.participants && (
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{activity.metadata.participants} people</span>
                    </div>
                  )}
                  
                  {activity.metadata?.likes && (
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <span>❤️ {activity.metadata.likes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {displayedActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;