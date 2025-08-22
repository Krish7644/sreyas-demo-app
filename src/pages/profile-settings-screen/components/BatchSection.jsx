import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const BatchSection = ({ batchData, onUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getLevelBadge = (level) => {
    const levels = {
      beginner: { color: 'bg-secondary/10 text-secondary', label: 'Beginner' },
      intermediate: { color: 'bg-warning/10 text-warning', label: 'Intermediate' },
      advanced: { color: 'bg-success/10 text-success', label: 'Advanced' }
    };
    return levels[level] || levels.beginner;
  };

  const currentBatch = batchData?.current;
  const achievements = batchData?.achievements || [];
  const requirements = batchData?.requirements || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Educational Progress
        </h2>
        <p className="text-sm text-muted-foreground">
          Track your spiritual education journey and achievements
        </p>
      </div>

      {/* Current Batch */}
      {currentBatch && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Current Batch
              </h3>
              <div className="flex items-center space-x-3">
                <h4 className="text-xl font-bold text-foreground">
                  {currentBatch.name}
                </h4>
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  getLevelBadge(currentBatch.level).color
                )}>
                  {getLevelBadge(currentBatch.level).label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {currentBatch.progress}%
              </div>
              <div className="text-xs text-muted-foreground">
                Complete
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="Calendar" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Start Date</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(currentBatch.startDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="Target" size={16} className="text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">Expected Completion</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(currentBatch.expectedCompletion)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="User" size={16} className="text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Instructor</p>
                <p className="text-xs text-muted-foreground">
                  {currentBatch.instructor}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium text-foreground">{currentBatch.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={cn("h-3 rounded-full transition-all duration-500", getProgressColor(currentBatch.progress))}
                style={{ width: `${currentBatch.progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              iconName="ExternalLink"
              onClick={() => console.log('Open batch details')}
            >
              View Batch Details
            </Button>
          </div>
        </div>
      )}

      {/* Requirements Progress */}
      {requirements.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Graduation Requirements
          </h3>
          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    req.completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {req.completed ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name="Clock" size={16} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{req.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Progress: {req.progress}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className={cn("h-2 rounded-full transition-all duration-300", getProgressColor(req.progress))}
                      style={{ width: `${req.progress}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    req.completed ? "text-success" : "text-muted-foreground"
                  )}>
                    {req.completed ? 'Complete' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Academic Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  achievement.certified ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {achievement.certified ? (
                    <Icon name="Award" size={20} />
                  ) : (
                    <Icon name="BookOpen" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Completed: {formatDate(achievement.date)}
                  </p>
                  {achievement.certified && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Shield" size={12} className="text-accent" />
                      <span className="text-xs text-accent font-medium">Certified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Resources */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Learning Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => console.log('Open course materials')}
          >
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-medium">Course Materials</p>
                <p className="text-xs text-muted-foreground">Access study guides and texts</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => console.log('Open assignments')}
          >
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-secondary" />
              <div className="text-left">
                <p className="font-medium">Assignments</p>
                <p className="text-xs text-muted-foreground">View and submit assignments</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => console.log('Open lecture recordings')}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Play" size={20} className="text-success" />
              <div className="text-left">
                <p className="font-medium">Lecture Recordings</p>
                <p className="text-xs text-muted-foreground">Watch recorded classes</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start"
            onClick={() => console.log('Open study group')}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={20} className="text-warning" />
              <div className="text-left">
                <p className="font-medium">Study Group</p>
                <p className="text-xs text-muted-foreground">Connect with batch mates</p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchSection;