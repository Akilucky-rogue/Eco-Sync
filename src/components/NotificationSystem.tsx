
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Calendar, MapPin, Users } from "lucide-react";

interface Notification {
  id: number;
  type: 'event' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationSystemProps {
  onClose?: () => void;
}

const NotificationSystem = ({ onClose }: NotificationSystemProps = {}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'event',
      title: 'New Event Alert',
      message: 'Mumbai Marine Drive Cleanup starting in 2 hours!',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You have earned the "Ocean Guardian" badge!',
      time: '1 day ago',
      isRead: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'Goa Beach Restoration event tomorrow at 7:00 AM',
      time: '2 days ago',
      isRead: true
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'achievement': return <Users className="h-4 w-4" />;
      case 'reminder': return <MapPin className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      {!onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#FF6F61] text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      )}

      {(showNotifications || onClose) && (
        <>
          {onClose && <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />}
          <Card className={`${
            onClose 
              ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md' 
              : 'absolute right-0 top-12 w-80 z-50'
          } max-h-96 overflow-y-auto shadow-xl border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#014F86]">Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onClose ? onClose() : setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      notification.isRead 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <span className="font-medium text-sm">{notification.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </>
      )}
    </div>
  );
};

export default NotificationSystem;
