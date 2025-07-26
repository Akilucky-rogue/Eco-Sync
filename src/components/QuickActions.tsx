import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Camera, Users, MapPin, Bell } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  variant?: 'grid' | 'horizontal';
  className?: string;
}

const QuickActions = ({ 
  actions, 
  variant = 'grid',
  className = "" 
}: QuickActionsProps) => {
  const defaultActions: QuickAction[] = [
    {
      id: 'create-event',
      label: 'Create Event',
      icon: <Plus className="h-4 w-4" />,
      onClick: () => console.log('Create event'),
      variant: 'primary'
    },
    {
      id: 'join-cleanup',
      label: 'Join Cleanup',
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => console.log('Join cleanup')
    },
    {
      id: 'share-photo',
      label: 'Share Photo',
      icon: <Camera className="h-4 w-4" />,
      onClick: () => console.log('Share photo')
    },
    {
      id: 'find-team',
      label: 'Find Team',
      icon: <Users className="h-4 w-4" />,
      onClick: () => console.log('Find team')
    },
    {
      id: 'view-map',
      label: 'View Map',
      icon: <MapPin className="h-4 w-4" />,
      onClick: () => console.log('View map')
    },
    {
      id: 'notifications',
      label: 'Alerts',
      icon: <Bell className="h-4 w-4" />,
      onClick: () => console.log('View notifications')
    }
  ];

  const actionsToShow = actions || defaultActions;

  const getButtonVariant = (actionVariant?: string) => {
    switch (actionVariant) {
      case 'primary':
        return 'default';
      case 'secondary':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getButtonStyles = (actionVariant?: string) => {
    switch (actionVariant) {
      case 'primary':
        return 'bg-brand-primary hover:bg-brand-primary/90 text-white border-brand-primary';
      case 'secondary':
        return 'bg-brand-accent hover:bg-brand-accent/90 text-white border-brand-accent';
      default:
        return 'hover:bg-brand-primary/5 hover:border-brand-primary/30 hover:text-brand-primary';
    }
  };

  if (variant === 'horizontal') {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {actionsToShow.map((action) => (
              <Button
                key={action.id}
                variant={getButtonVariant(action.variant)}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
                className={`flex items-center gap-2 ${getButtonStyles(action.variant)}`}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
      {actionsToShow.map((action) => (
        <Card
          key={action.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
            action.disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${getButtonStyles(action.variant)} border`}
          onClick={action.disabled ? undefined : action.onClick}
        >
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 rounded-lg bg-background/50">
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;