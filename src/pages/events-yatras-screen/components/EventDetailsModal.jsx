import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { cn } from '../../../utils/cn';

const EventDetailsModal = ({ event, onClose, onRSVP, userRole }) => {
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
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  };

  const getAvailabilityStatus = () => {
    const available = event.capacity - event.enrolled;
    if (available > 10) return { text: 'Available', color: 'text-success', icon: 'Check' };
    if (available > 0) return { text: `${available} spots left`, color: 'text-warning', icon: 'AlertTriangle' };
    return { text: 'Full', color: 'text-destructive', icon: 'X' };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card rounded-lg border border-border shadow-floating overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {event.image && (
            <div className="h-64 lg:h-80 relative">
              <Image 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-gentle"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="absolute bottom-6 left-6 text-white">
                <div className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3",
                  categoryInfo.bg,
                  categoryInfo.color
                )}>
                  {categoryInfo.label}
                </div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  {event.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!event.image && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <div className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2",
                  categoryInfo.bg,
                  categoryInfo.color
                )}>
                  {categoryInfo.label}
                </div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  {event.title}
                </h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">
                About This Event
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Event Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(event.time)} ({formatDuration(event.duration)})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="User" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Organizer</p>
                    <p className="text-sm text-muted-foreground">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {event.requirements?.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Requirements & Guidelines
                </h2>
                <ul className="space-y-2">
                  {event.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Yatra Itinerary */}
            {event.category === 'yatra' && event.itinerary && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Itinerary
                </h2>
                <ul className="space-y-2">
                  {event.itinerary.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Section */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Registration
              </h3>
              
              {/* Availability Status */}
              <div className="flex items-center space-x-2 mb-4">
                <Icon name={availabilityStatus.icon} size={16} className={availabilityStatus.color} />
                <span className={cn("text-sm font-medium", availabilityStatus.color)}>
                  {availabilityStatus.text}
                </span>
              </div>

              {/* Capacity Info */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Enrolled</span>
                  <span className="font-medium text-foreground">
                    {event.enrolled}/{event.capacity}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                  />
                </div>
                {event.waitingList > 0 && (
                  <p className="text-xs text-warning mt-2">
                    {event.waitingList} people on waitlist
                  </p>
                )}
              </div>

              {/* Cost */}
              {event.cost && (
                <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Cost</span>
                    <span className="text-lg font-bold text-accent">{event.cost}</span>
                  </div>
                </div>
              )}

              {/* RSVP Status */}
              {rsvpStatus && (
                <div className="mb-4 p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name={rsvpStatus.icon} size={16} className={rsvpStatus.color} />
                    <span className={cn("text-sm font-medium", rsvpStatus.color)}>
                      Your Status: {rsvpStatus.text}
                    </span>
                  </div>
                </div>
              )}

              {/* RSVP Actions */}
              {event.rsvpRequired && (
                <div className="space-y-3">
                  {!event.userRSVP && (
                    <>
                      {event.enrolled < event.capacity ? (
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => onRSVP(event.id, 'confirm')}
                          iconName="Check"
                        >
                          Confirm RSVP
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => onRSVP(event.id, 'waitlist')}
                          iconName="Clock"
                        >
                          Join Waitlist
                        </Button>
                      )}
                    </>
                  )}
                  
                  {event.userRSVP && (
                    <Button
                      className="w-full text-destructive hover:bg-destructive/10"
                      variant="outline"
                      onClick={() => onRSVP(event.id, 'cancel')}
                      iconName="X"
                    >
                      Cancel Registration
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  iconName="Calendar"
                >
                  Add to Calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  iconName="Share"
                >
                  Share Event
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  iconName="Bell"
                >
                  Set Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;