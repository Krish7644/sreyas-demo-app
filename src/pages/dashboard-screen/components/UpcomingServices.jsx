import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const UpcomingServices = ({ services, onRSVP }) => {
  const formatTime = (timeString) => {
    const [time, meridian] = timeString.split(' ');
    return { time, meridian };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Upcoming Services
        </h3>
        <Button variant="ghost" size="sm" iconName="ArrowRight">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {services?.map((service) => {
          const { time, meridian } = formatTime(service.time);
          const isUrgent = service.countdown && service.countdown.includes('h') && 
                          parseInt(service.countdown.split('h')[0]) < 2;

          return (
            <div 
              key={service.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-gentle",
                isUrgent ? "border-warning/20 bg-warning/5" : "border-border bg-muted/30"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-heading font-bold text-foreground">
                    {time}
                  </div>
                  <div className="text-xs text-muted-foreground font-caption">
                    {meridian}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      {service.name}
                    </h4>
                    {service.rsvpRequired && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        RSVP Required
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{service.countdown}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{service.participants} attending</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isUrgent && (
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                )}
                {service.rsvpRequired ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onRSVP?.(service.id)}
                  >
                    RSVP
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    iconName="Bell"
                    onClick={() => console.log('Set reminder for', service.id)}
                  >
                    Remind
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {services?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-body">No upcoming services today</p>
          <p className="text-xs font-caption">Check back tomorrow for new activities</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingServices;