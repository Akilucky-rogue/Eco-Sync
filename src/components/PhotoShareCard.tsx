
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

interface PhotoShare {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  image: string;
  caption: string;
  location: string;
  eventName: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
}

interface PhotoShareCardProps {
  photo: PhotoShare;
  onLike?: (photoId: string) => void;
  onComment?: (photoId: string) => void;
  onShare?: (photoId: string) => void;
}

const PhotoShareCard = ({ photo, onLike, onComment, onShare }: PhotoShareCardProps) => {
  const [isLiked, setIsLiked] = useState(photo.isLiked || false);
  const [likeCount, setLikeCount] = useState(photo.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(photo.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={photo.user.avatar} />
            <AvatarFallback>{photo.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-[#014F86]">{photo.user.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3" />
              {photo.timestamp}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <div className="relative">
        <img 
          src={photo.image} 
          alt={photo.caption}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-[#FF6F61] text-white">{photo.eventName}</Badge>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {photo.location}
          </div>
          
          <p className="text-sm text-gray-800">{photo.caption}</p>
          
          <div className="flex flex-wrap gap-1">
            {photo.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`h-8 px-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment?.(photo.id)}
                className="h-8 px-2 text-gray-600"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {photo.comments}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(photo.id)}
              className="h-8 px-2 text-gray-600"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoShareCard;
