import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ServiceCard = ({ 
  title, 
  status, 
  time, 
  description,
  onClick 
}) => {
  const isCompleted = status === 'completed';
  const isPending = status === 'pending';
  const isUpcoming = status === 'upcoming';

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'upcoming':
        return { name: 'Calendar', color: 'text-primary' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Scheduled';
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card rounded-lg border border-border p-6 shadow-soft cursor-pointer transition-gentle hover-lift",
        "hover:shadow-raised",
        isCompleted && "border-success/20 bg-success/5"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center border-2",
            isCompleted ? "border-success/20 bg-success/10" : "border-primary/20 bg-primary/5"
          )}>
            <Icon 
              name="Sun" 
              size={20} 
              className={isCompleted ? "text-success" : "text-primary"}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              {time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name={statusIcon.name} size={16} className={statusIcon.color} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            isCompleted && "bg-success/10 text-success",
            isPending && "bg-warning/10 text-warning",
            isUpcoming && "bg-primary/10 text-primary"
          )}>
            {getStatusText()}
          </span>
          {isCompleted && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <Icon name="Sparkles" size={12} />
              <span>Blessed!</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-xs text-muted-foreground font-body">
            {description}
          </p>
        )}

        {!isCompleted && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span>Temple Main Hall</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;