import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';


const CounsellorSection = ({ counsellorData, onUpdate }) => {
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [changeReason, setChangeReason] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleChangeRequest = () => {
    if (changeReason.trim()) {
      // Submit change request
      console.log('Counsellor change request:', changeReason);
      setShowChangeRequest(false);
      setChangeReason('');
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Spiritual Counsellor
        </h2>
        <p className="text-sm text-muted-foreground">
          Your assigned counsellor for spiritual guidance and progress tracking
        </p>
      </div>

      {/* Current Counsellor */}
      {counsellorData?.assigned && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Current Counsellor
            </h3>
            {counsellorData.canRequestChange && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChangeRequest(true)}
                iconName="RefreshCw"
              >
                Request Change
              </Button>
            )}
          </div>

          <div className="flex items-start space-x-4">
            {/* Counsellor Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
              <Image 
                src={counsellorData.assigned.avatar} 
                alt={counsellorData.assigned.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Counsellor Info */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-1">
                {counsellorData.assigned.name}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span>{counsellorData.assigned.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span>{counsellorData.assigned.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} />
                  <span>Assigned: {formatDate(counsellorData.assigned.assignedDate)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Button
                size="sm"
                iconName="MessageCircle"
                onClick={() => console.log('Open chat with counsellor')}
              >
                Message
              </Button>
              <Button
                size="sm"
                variant="outline"
                iconName="Phone"
                onClick={() => console.log('Call counsellor')}
              >
                Call
              </Button>
            </div>
          </div>

          {/* Next Meeting */}
          {counsellorData.nextMeeting && (
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Next Meeting: {formatDate(counsellorData.nextMeeting)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Meeting History */}
      {counsellorData?.meetings?.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Meeting History
          </h3>
          <div className="space-y-4">
            {counsellorData.meetings.map(meeting => (
              <div key={meeting.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Calendar" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {meeting.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(meeting.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {meeting.notes}
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground mr-2">Rating:</span>
                    {getRatingStars(meeting.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidance Resources */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Spiritual Guidance Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Book" size={16} className="text-secondary" />
              <span className="font-medium text-foreground">Recommended Reading</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Bhagavad Gita As It Is</li>
              <li>• Nectar of Devotion</li>
              <li>• Science of Self Realization</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Headphones" size={16} className="text-success" />
              <span className="font-medium text-foreground">Audio Lectures</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Daily Srimad Bhagavatam</li>
              <li>• Bhagavad Gita Commentary</li>
              <li>• Kirtan Sessions</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Users" size={16} className="text-warning" />
              <span className="font-medium text-foreground">Study Groups</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Weekly Gita Discussion</li>
              <li>• Bhakti Sastri Course</li>
              <li>• Devotee Association</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Heart" size={16} className="text-accent" />
              <span className="font-medium text-foreground">Service Opportunities</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Temple Cleaning Seva</li>
              <li>• Prasadam Distribution</li>
              <li>• Book Distribution</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Change Request Modal */}
      {showChangeRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-card rounded-lg border border-border shadow-floating">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Request Counsellor Change
                </h3>
                <button
                  onClick={() => setShowChangeRequest(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Reason for Change Request
                </label>
                <textarea
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Please explain why you would like to change your counsellor..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowChangeRequest(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangeRequest}
                  disabled={!changeReason.trim()}
                  iconName="Send"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorSection;