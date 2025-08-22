import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ParticipantPanel = ({ conversation, participants, onParticipantAction }) => {
  const [showAllParticipants, setShowAllParticipants] = useState(false);

  if (!conversation || !conversation.isGroup) {
    return (
      <div className="w-80 bg-card border-l border-border p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border mx-auto mb-4">
            <Image 
              src={conversation?.avatar || '/assets/images/no_image.png'} 
              alt={conversation?.name || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {conversation?.name || 'Unknown User'}
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-4">
            {conversation?.isOnline ? 'Online now' : 'Last seen recently'}
          </p>
          
          <div className="space-y-2">
            <Button variant="outline" fullWidth iconName="Phone">
              Voice Call
            </Button>
            <Button variant="outline" fullWidth iconName="Video">
              Video Call
            </Button>
            <Button variant="outline" fullWidth iconName="UserPlus">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayedParticipants = showAllParticipants ? participants : participants.slice(0, 8);
  const remainingCount = participants.length - 8;

  const getRoleBadge = (role) => {
    const badges = {
      'Temple President': { color: 'bg-primary text-primary-foreground', icon: 'Crown' },
      'HOD': { color: 'bg-secondary text-secondary-foreground', icon: 'Shield' },
      'Counsellor': { color: 'bg-accent text-accent-foreground', icon: 'User' },
      'Inmate': { color: 'bg-success text-success-foreground', icon: 'Home' },
      'Devotee': { color: 'bg-muted text-muted-foreground', icon: 'Heart' }
    };
    return badges[role] || badges['Devotee'];
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Group Info */}
      <div className="p-6 border-b border-border">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={32} color="white" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {conversation.name}
          </h3>
          <p className="text-sm font-body text-muted-foreground">
            {participants.length} members
          </p>
        </div>

        {/* Group Actions */}
        <div className="space-y-2">
          <Button variant="outline" fullWidth iconName="UserPlus">
            Add Members
          </Button>
          <Button variant="outline" fullWidth iconName="Settings">
            Group Settings
          </Button>
          {conversation.type === 'service' && (
            <Button variant="outline" fullWidth iconName="AlertCircle">
              Report Issue
            </Button>
          )}
        </div>
      </div>

      {/* Service Info (if applicable) */}
      {conversation.type === 'service' && (
        <div className="p-4 border-b border-border bg-muted/30">
          <h4 className="font-heading font-semibold text-foreground mb-3">Service Details</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-muted-foreground">Incharge:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {conversation.incharge || 'Not assigned'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-muted-foreground">Status:</span>
              <span className={`
                text-xs font-caption px-2 py-1 rounded-full
                ${conversation.status === 'active' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                }
              `}>
                {conversation.status || 'Active'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-muted-foreground">Deadline:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {conversation.deadline || 'No deadline'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-semibold text-foreground">
              Members ({participants.length})
            </h4>
            <button
              onClick={() => setShowAllParticipants(!showAllParticipants)}
              className="text-sm font-body text-primary hover:text-primary/80 transition-gentle"
            >
              {showAllParticipants ? 'Show Less' : 'Show All'}
            </button>
          </div>

          <div className="space-y-3">
            {displayedParticipants.map((participant) => {
              const badge = getRoleBadge(participant.role);
              return (
                <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-gentle">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                      <Image 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-body font-medium text-sm text-foreground truncate">
                        {participant.name}
                      </h5>
                      {participant.isAdmin && (
                        <Icon name="Shield" size={12} className="text-primary" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`
                        text-xs font-caption px-2 py-1 rounded-full flex items-center space-x-1
                        ${badge.color}
                      `}>
                        <Icon name={badge.icon} size={10} />
                        <span>{participant.role}</span>
                      </span>
                      <span className="text-xs font-caption text-muted-foreground">
                        {participant.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onParticipantAction(participant, 'message')}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
                  >
                    <Icon name="MessageCircle" size={16} />
                  </button>
                </div>
              );
            })}

            {!showAllParticipants && remainingCount > 0 && (
              <button
                onClick={() => setShowAllParticipants(true)}
                className="w-full p-3 border-2 border-dashed border-border rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:border-primary/50 transition-gentle"
              >
                +{remainingCount} more members
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spiritual Quote */}
      <div className="p-4 border-t border-border bg-accent/10">
        <div className="text-center">
          <Icon name="Quote" size={20} className="text-accent mx-auto mb-2" />
          <p className="text-sm font-body text-foreground italic mb-2">
            "Chant Hare Krishna and be happy"
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            - Srila Prabhupada
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantPanel;