import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onNotificationAction, onClose }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All', icon: 'Bell' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' },
    { id: 'services', label: 'Services', icon: 'Users' },
    { id: 'spiritual', label: 'Spiritual', icon: 'Heart' }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = (now - notificationTime) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'messages': return 'MessageCircle';
      case 'services': return 'Users';
      case 'spiritual': return 'Heart';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'messages': return 'text-primary';
      case 'services': return 'text-secondary';
      case 'spiritual': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed right-4 top-20 w-80 max-w-[90vw] bg-card border border-border rounded-lg shadow-floating z-50 max-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`
                flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-gentle
                ${filter === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={option.icon} size={12} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mb-3" />
            <h4 className="font-heading font-semibold text-foreground mb-2">No notifications</h4>
            <p className="text-sm font-body text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  p-3 rounded-lg mb-2 transition-gentle hover:bg-muted/50 cursor-pointer
                  ${notification.isRead ? 'opacity-75' : 'bg-primary/5 border border-primary/20'}
                `}
                onClick={() => onNotificationAction(notification, 'read')}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${notification.isRead ? 'bg-muted' : 'bg-primary/10'}
                  `}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={16} 
                      className={notification.isRead ? 'text-muted-foreground' : getNotificationColor(notification.type)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-body font-medium text-sm text-foreground mb-1">
                      {notification.title}
                    </h5>
                    <p className="text-xs font-body text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-caption text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onNotificationAction(null, 'markAllRead')}
          >
            Mark All Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onNotificationAction(null, 'clearAll')}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;