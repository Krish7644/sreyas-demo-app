import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { cn } from '../../../utils/cn';

const YatraPlanner = ({ yatras, onEventClick, onRSVP }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    const days = Math.floor(minutes / 1440);
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const getRSVPStatus = (userRSVP) => {
    if (userRSVP === 'confirmed') return { text: 'Confirmed', color: 'text-success', icon: 'Check' };
    if (userRSVP === 'waitlist') return { text: 'Waitlisted', color: 'text-warning', icon: 'Clock' };
    return null;
  };

  const getAvailabilityStatus = (enrolled, capacity) => {
    const available = capacity - enrolled;
    if (available > 5) return { text: 'Available', color: 'text-success' };
    if (available > 0) return { text: `${available} spots left`, color: 'text-warning' };
    return { text: 'Full', color: 'text-destructive' };
  };

  if (yatras.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center shadow-soft">
        <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Yatras Available
        </h3>
        <p className="text-muted-foreground font-body">
          Check back later for upcoming spiritual pilgrimages and sacred journeys.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Sacred Yatras & Pilgrimages
            </h2>
            <p className="text-sm text-muted-foreground">
              Spiritual journeys to holy places and sacred destinations
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {yatras.map(yatra => {
          const rsvpStatus = getRSVPStatus(yatra.userRSVP);
          const availabilityStatus = getAvailabilityStatus(yatra.enrolled, yatra.capacity);

          return (
            <div 
              key={yatra.id}
              className="bg-card rounded-lg border border-border shadow-soft hover:shadow-raised transition-gentle overflow-hidden"
            >
              {/* Yatra Image */}
              <div className="relative h-48">
                <Image 
                  src={yatra.image} 
                  alt={yatra.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Duration Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-warning text-warning-foreground rounded text-xs font-semibold">
                  {formatDuration(yatra.duration)}
                </div>
                
                {/* Cost Badge */}
                {yatra.cost && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white rounded text-sm font-semibold">
                    {yatra.cost}
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-heading font-bold text-white mb-1">
                    {yatra.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-white/90 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(yatra.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{yatra.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yatra Details */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {yatra.description}
                </p>

                {/* Itinerary Preview */}
                {yatra.itinerary && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Highlights:
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {yatra.itinerary.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="ChevronRight" size={12} className="text-warning mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {yatra.itinerary.length > 2 && (
                        <li className="text-primary cursor-pointer text-xs">
                          +{yatra.itinerary.length - 2} more activities
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Availability & RSVP */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {yatra.enrolled}/{yatra.capacity}
                      </span>
                    </div>
                    <span className={availabilityStatus.color}>
                      {availabilityStatus.text}
                    </span>
                  </div>
                  
                  {rsvpStatus && (
                    <div className="flex items-center space-x-1">
                      <Icon name={rsvpStatus.icon} size={14} className={rsvpStatus.color} />
                      <span className={cn("text-xs font-medium", rsvpStatus.color)}>
                        {rsvpStatus.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onEventClick(yatra)}
                    iconName="Eye"
                  >
                    View Details
                  </Button>
                  
                  {yatra.rsvpRequired && (
                    <>
                      {!yatra.userRSVP && (
                        <>
                          {yatra.enrolled < yatra.capacity ? (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRSVP(yatra.id, 'confirm');
                              }}
                              className="bg-warning hover:bg-warning/90 text-warning-foreground"
                            >
                              Book Now
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRSVP(yatra.id, 'waitlist');
                              }}
                            >
                              Waitlist
                            </Button>
                          )}
                        </>
                      )}
                      
                      {yatra.userRSVP && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRSVP(yatra.id, 'cancel');
                          }}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          Cancel
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Organizer Info */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="User" size={12} />
                    <span>Organized by {yatra.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Planning Tips */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Yatra Planning Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Book early as yatras have limited capacity</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Ensure valid travel documents for destination</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Prepare spiritually through increased chanting and reading</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Pack appropriate clothing for the destination climate</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YatraPlanner;