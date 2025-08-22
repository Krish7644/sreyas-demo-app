import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const SadhanaCard = ({ 
  title, 
  current, 
  target, 
  unit, 
  icon, 
  color = 'primary', 
  onClick 
}) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isCompleted = current >= target;
  
  const colorClasses = {
    primary: 'text-primary border-primary/20 bg-primary/5',
    secondary: 'text-secondary border-secondary/20 bg-secondary/5',
    success: 'text-success border-success/20 bg-success/5',
    warning: 'text-warning border-warning/20 bg-warning/5'
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card rounded-lg border border-border p-6 shadow-soft cursor-pointer transition-gentle hover-lift",
        "hover:shadow-raised"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center border-2",
            colorClasses[color]
          )}>
            <Icon name={icon} size={20} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              Daily Goal
            </p>
          </div>
        </div>
        {isCompleted && (
          <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
            <Icon name="Check" size={14} className="text-success-foreground" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-heading font-bold text-foreground">
              {current}
            </span>
            <span className="text-muted-foreground font-body text-sm ml-1">
              / {target} {unit}
            </span>
          </div>
          <span className={cn(
            "text-sm font-medium",
            isCompleted ? "text-success" : "text-muted-foreground"
          )}>
            {percentage.toFixed(0)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              color === 'primary' && "bg-primary",
              color === 'secondary' && "bg-secondary",
              color === 'success' && "bg-success",
              color === 'warning' && "bg-warning"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Streak or Status */}
        {current > 0 && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Flame" size={12} className="text-warning" />
            <span>In progress today</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SadhanaCard;