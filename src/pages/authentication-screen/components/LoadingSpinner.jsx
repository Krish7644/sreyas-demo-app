import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Lotus Spinner */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-floating animate-pulse">
            <Icon name="Lotus" size={48} color="white" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin border-t-primary"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Authenticating...
          </h3>
          <p className="text-sm text-muted-foreground">
            Preparing your spiritual dashboard
          </p>
        </div>

        {/* Devotional Quote */}
        <div className="max-w-md mx-auto bg-card/50 rounded-lg p-4 border border-border/50">
          <p className="text-sm text-muted-foreground italic">
            "The mind is restless and difficult to restrain, but it is subdued by practice."
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            - Bhagavad Gita 6.35
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;