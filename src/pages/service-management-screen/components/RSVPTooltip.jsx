import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RSVPTooltip = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 z-50">
      <div className="bg-card border border-border rounded-lg shadow-floating p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={18} className="text-accent" />
            <h3 className="font-heading font-semibold text-foreground">What is RSVP?</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong>RSVP</strong> stands for "Répondez s'il vous plaît" (French for "Please respond").
          </p>
          
          <p className="text-sm text-muted-foreground">
            It means <strong>"Please confirm your attendance or participation"</strong> in events like:
          </p>
          
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Temple Yatras and pilgrimages</li>
            <li>• Festival celebrations</li>
            <li>• Community programs</li>
            <li>• Special events and gatherings</li>
          </ul>
          
          <div className="bg-muted/50 rounded-lg p-3 mt-4">
            <p className="text-sm font-medium text-foreground mb-2">Response Options:</p>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600">
                Yes
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                No
              </Button>
              <Button size="sm" variant="outline" className="border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                Maybe
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground italic">
            Your response helps organizers plan better for accommodations, prasadam, and logistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSVPTooltip;