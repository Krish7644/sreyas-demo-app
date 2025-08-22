import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const CounsellorChat = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(2);

  const counsellorData = {
    name: 'Radhanath Swami',
    title: 'Spiritual Counsellor',
    avatar: '/assets/images/counsellor.jpg',
    lastSeen: '2 minutes ago',
    status: 'Available'
  };

  const handleStartChat = () => {
    console.log('Start chat with counsellor');
  };

  const handleViewProfile = () => {
    console.log('View counsellor profile');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Spiritual Guidance
        </h3>
        <div className="flex items-center space-x-1">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isOnline ? "bg-success" : "bg-muted-foreground"
          )} />
          <span className={cn(
            "text-xs font-caption",
            isOnline ? "text-success" : "text-muted-foreground"
          )}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Counsellor Profile */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success border-2 border-card" />
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="font-heading font-semibold text-foreground text-sm">
              {counsellorData.name}
            </h4>
            <p className="text-xs text-muted-foreground font-caption">
              {counsellorData.title}
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              {isOnline ? counsellorData.status : `Last seen ${counsellorData.lastSeen}`}
            </p>
          </div>
        </div>

        {/* Recent Message Preview */}
        {unreadMessages > 0 && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-caption text-primary">
                {unreadMessages} new message{unreadMessages > 1 ? 's' : ''}
              </span>
              <span className="text-xs font-caption text-muted-foreground">
                5 minutes ago
              </span>
            </div>
            <p className="text-sm font-body text-foreground">
              "How is your japa meditation progressing? Remember, quality over quantity in spiritual practice..."
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            variant="default" 
            size="sm"
            className="w-full"
            iconName="MessageCircle"
            onClick={handleStartChat}
          >
            Start Chat
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              iconName="Calendar"
              onClick={() => console.log('Schedule session')}
            >
              Schedule
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconName="User"
              onClick={handleViewProfile}
            >
              Profile
            </Button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-caption text-muted-foreground mb-3">
            Quick Questions
          </p>
          <div className="space-y-2">
            <button className="w-full text-left p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-gentle">
              <p className="text-xs font-body text-foreground">
                "How can I improve my japa meditation?"
              </p>
            </button>
            <button className="w-full text-left p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-gentle">
              <p className="text-xs font-body text-foreground">
                "What seva opportunities are available?"
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorChat;