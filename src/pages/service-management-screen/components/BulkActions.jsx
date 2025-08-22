import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedServices, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'update_status', label: 'Update Status' },
    { value: 'assign_volunteers', label: 'Assign Volunteers' },
    { value: 'send_notifications', label: 'Send Notifications' },
    { value: 'export_data', label: 'Export Data' },
    { value: 'delete', label: 'Delete Services' }
  ];

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction || selectedServices.length === 0) return;

    setIsProcessing(true);
    
    try {
      switch (selectedAction) {
        case 'update_status':
          // Handle status update
          break;
        case 'assign_volunteers':
          // Handle volunteer assignment
          break;
        case 'send_notifications':
          // Handle notification sending
          break;
        case 'export_data':
          // Handle data export
          break;
        case 'delete':
          // Handle deletion
          break;
        default:
          break;
      }
      
      await onBulkAction(selectedAction, selectedServices);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action"
              className="min-w-[200px]"
            />

            {selectedAction === 'update_status' && (
              <Select
                options={statusOptions}
                placeholder="Select status"
                className="min-w-[150px]"
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleBulkAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName="Play"
            iconPosition="left"
          >
            Apply Action
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear Selection
          </Button>
        </div>
      </div>

      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground font-medium">
                Action Preview: {actionOptions.find(opt => opt.value === selectedAction)?.label}
              </p>
              <p className="text-muted-foreground mt-1">
                This action will be applied to {selectedServices.length} selected service{selectedServices.length > 1 ? 's' : ''}.
                {selectedAction === 'delete' && (
                  <span className="text-error font-medium"> This action cannot be undone.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;