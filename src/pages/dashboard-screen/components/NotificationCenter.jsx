import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const NotificationCenter = ({ notifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'service_reminder':
        return { name: 'Bell', color: 'text-primary' };
      case 'achievement':
        return { name: 'Trophy', color: 'text-success' };
      case 'message':
        return { name: 'MessageCircle', color: 'text-secondary' };
      case 'update':
        return { name: 'Info', color: 'text-warning' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const markAsRead = (id) => {
    console.log('Mark notification as read:', id);
  };

  const clearAll = () => {
    console.log('Clear all notifications');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Less' : 'More'}
        </Button>
      </div>

      <div className="space-y-3">
        {notifications?.slice(0, isExpanded ? notifications.length : 3).map((notification) => {
          const icon = getNotificationIcon(notification.type);
          
          return (
            <div 
              key={notification.id}
              className={cn(
                "flex items-start space-x-3 p-3 rounded-lg border transition-gentle",
                notification.read 
                  ? "border-border bg-muted/20" :"border-primary/20 bg-primary/5"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                notification.read ? "bg-muted" : "bg-primary/10"
              )}>
                <Icon name={icon.name} size={16} className={icon.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-body leading-tight",
                  notification.read ? "text-muted-foreground" : "text-foreground"
                )}>
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground font-caption mt-1">
                  {notification.time}
                </p>
              </div>
              
              {!notification.read && (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="flex-shrink-0 text-primary hover:text-primary/80 transition-gentle"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {notifications?.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-body">No new notifications</p>
          <p className="text-xs font-caption">You're all caught up!</p>
        </div>
      )}

      {notifications?.length > 3 && !isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-caption text-center">
            {notifications.length - 3} more notifications
          </p>
        </div>
      )}

      {notifications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={clearAll}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;