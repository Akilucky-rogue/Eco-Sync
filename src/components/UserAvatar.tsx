import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Shield } from "lucide-react";

interface UserAvatarProps {
  name: string;
  image?: string;
  level?: number;
  role?: 'admin' | 'moderator' | 'volunteer' | 'leader';
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}

const UserAvatar = ({ 
  name, 
  image, 
  level, 
  role = 'volunteer', 
  size = 'md', 
  showBadge = false,
  className = "" 
}: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <Crown className="h-3 w-3" />;
      case 'moderator':
        return <Shield className="h-3 w-3" />;
      case 'leader':
        return <Star className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'moderator':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'leader':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar className={`${sizeClasses[size]} ring-2 ring-brand-primary/20`}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className={`bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-semibold ${textSizeClasses[size]}`}>
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {level && (
        <Badge 
          variant="secondary" 
          className="absolute -bottom-1 -right-1 h-5 px-1.5 text-xs font-bold bg-brand-accent text-white border-2 border-background"
        >
          {level}
        </Badge>
      )}
      
      {showBadge && role !== 'volunteer' && (
        <div className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${getRoleColor()}`}>
          {getRoleIcon()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;