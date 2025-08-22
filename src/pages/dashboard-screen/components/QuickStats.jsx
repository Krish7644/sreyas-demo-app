import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const QuickStats = ({ totalDays, currentStreak, achievements }) => {
  const completedAchievements = achievements?.filter(a => a.achieved) || [];
  const totalAchievements = achievements?.length || 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Stats
      </h3>
      
      <div className="space-y-4">
        {/* Total Days */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-body text-foreground">Total Days Active</p>
              <p className="text-xs text-muted-foreground font-caption">Since joining</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-heading font-bold text-foreground">{totalDays}</p>
            <p className="text-xs text-muted-foreground font-caption">days</p>
          </div>
        </div>

        {/* Current Streak */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm font-body text-foreground">Current Streak</p>
              <p className="text-xs text-muted-foreground font-caption">Daily practice</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-heading font-bold text-foreground">{currentStreak}</p>
            <p className="text-xs text-muted-foreground font-caption">days</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-body text-foreground">Achievements</p>
              <p className="text-xs text-muted-foreground font-caption">Unlocked badges</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-heading font-bold text-foreground">
              {completedAchievements.length}/{totalAchievements}
            </p>
            <p className="text-xs text-muted-foreground font-caption">badges</p>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      {achievements && achievements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-heading font-semibold text-foreground mb-3">
            Recent Achievements
          </p>
          <div className="grid grid-cols-3 gap-2">
            {achievements.slice(0, 6).map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg border transition-gentle",
                  achievement.achieved 
                    ? "border-success/20 bg-success/5" :"border-border bg-muted/20"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                  achievement.achieved ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon name={achievement.icon} size={16} />
                </div>
                <span className={cn(
                  "text-xs font-caption text-center leading-tight",
                  achievement.achieved ? "text-success" : "text-muted-foreground"
                )}>
                  {achievement.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickStats;