import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { cn } from '../../../utils/cn';

const EventCard = ({ event, onClick, onRSVP }) => {
  const getCategoryInfo = (category) => {
    const categories = {
      daily_program: { label: 'Daily Program', color: 'text-secondary', bg: 'bg-secondary/10' },
      festival: { label: 'Festival', color: 'text-accent', bg: 'bg-accent/10' },
      workshop: { label: 'Workshop', color: 'text-success', bg: 'bg-success/10' },
      yatra: { label: 'Yatra', color: 'text-warning', bg: 'bg-warning/10' }
    };
    return categories[category] || { label: 'Event', color: 'text-primary', bg: 'bg-primary/10' };
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAvailabilityStatus = () => {
    const available = event.capacity - event.enrolled;
    if (available > 10) return { text: 'Available', color: 'text-success' };
    if (available > 0) return { text: `${available} spots left`, color: 'text-warning' };
    return { text: 'Full', color: 'text-destructive' };
  };

  const getRSVPStatus = () => {
    if (event.userRSVP === 'confirmed') return { text: 'Confirmed', color: 'text-success', icon: 'Check' };
    if (event.userRSVP === 'waitlist') return { text: 'Waitlisted', color: 'text-warning', icon: 'Clock' };
    return null;
  };

  const categoryInfo = getCategoryInfo(event.category);
  const availabilityStatus = getAvailabilityStatus();
  const rsvpStatus = getRSVPStatus();

  return (
    <div 
      className="bg-card rounded-lg border border-border shadow-soft hover:shadow-raised transition-gentle cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Event Image */}
        <div className="lg:w-48 h-48 lg:h-auto relative">
          <Image 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
          />
          <div className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium",
            categoryInfo.color,
            categoryInfo.bg
          )}>
            {categoryInfo.label}
          </div>
          {event.cost && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white rounded text-xs font-semibold">
              {event.cost}
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="flex-1 mb-4 lg:mb-0">
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-3 line-clamp-2">
                {event.description}
              </p>
              
              {/* Event Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={14} />
                  <span>{event.organizer}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {event.enrolled}/{event.capacity} enrolled
                  </span>
                  <span className={availabilityStatus.color}>
                    • {availabilityStatus.text}
                  </span>
                </div>
                {event.waitingList > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-warning" />
                    <span className="text-warning text-xs">
                      {event.waitingList} on waitlist
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* RSVP Section */}
            <div className="flex flex-col items-end space-y-3">
              {rsvpStatus ? (
                <div className="flex items-center space-x-2">
                  <Icon name={rsvpStatus.icon} size={16} className={rsvpStatus.color} />
                  <span className={cn("text-sm font-medium", rsvpStatus.color)}>
                    {rsvpStatus.text}
                  </span>
                </div>
              ) : null}
              
              <div className="flex space-x-2">
                {event.rsvpRequired && (
                  <>
                    {!event.userRSVP && (
                      <>
                        {event.enrolled < event.capacity ? (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRSVP(event.id, 'confirm');
                            }}
                            className="bg-primary hover:bg-primary/90"
                          >
                            RSVP
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRSVP(event.id, 'waitlist');
                            }}
                          >
                            Join Waitlist
                          </Button>
                        )}
                      </>
                    )}
                    
                    {event.userRSVP && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRSVP(event.id, 'cancel');
                        }}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        Cancel
                      </Button>
                    )}
                  </>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  iconName="ExternalLink"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {event.requirements?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">Requirements:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {event.requirements.slice(0, 2).map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
                {event.requirements.length > 2 && (
                  <li className="text-primary cursor-pointer">
                    +{event.requirements.length - 2} more requirements
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;