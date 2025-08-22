import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { hasAdminAccess, canCreateAvailabilitySheets } from '../../../utils/roleManager';

const AvailabilitySheet = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeSlots: [],
    deadline: '',
    targetAudience: 'all'
  });
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '', endTime: '', capacity: 1, description: '' }
  ]);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('create'); // create, responses, confirm
  
  // Mock user role - in real app, get from context/store
  const userRole = 'counsellor';

  const mockResponses = [
    {
      id: 1,
      userName: 'Radha Devi',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      selectedSlots: [1, 2],
      notes: 'Available for morning services',
      responseTime: '2025-07-18T10:30:00'
    },
    {
      id: 2,
      userName: 'Krishna Das',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      selectedSlots: [1],
      notes: 'Can help with setup',
      responseTime: '2025-07-18T11:15:00'
    }
  ];

  useEffect(() => {
    if (viewMode === 'responses') {
      setResponses(mockResponses);
    }
  }, [viewMode]);

  const addTimeSlot = () => {
    const newSlot = {
      id: timeSlots.length + 1,
      startTime: '',
      endTime: '',
      capacity: 1,
      description: ''
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const removeTimeSlot = (id) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const updateTimeSlot = (id, field, value) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canCreateAvailabilitySheets(userRole)) {
      alert('You do not have permission to create availability sheets');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const availabilitySheet = {
        id: Date.now(),
        ...formData,
        timeSlots: timeSlots.filter(slot => slot.startTime && slot.endTime),
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(availabilitySheet);
      onClose();
    } catch (error) {
      console.error('Failed to create availability sheet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmServices = async () => {
    setIsLoading(true);
    
    try {
      // Create services based on confirmed availability
      const confirmedServices = responses.map(response => ({
        title: `${formData.title} - ${response.userName}`,
        volunteers: [response],
        timeSlots: response.selectedSlots,
        status: 'confirmed'
      }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Services confirmed:', confirmedServices);
      setViewMode('create');
      onClose();
    } catch (error) {
      console.error('Failed to confirm services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-2xl shadow-floating border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-success" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Service Availability Manager
                </h2>
                <p className="text-sm text-muted-foreground">
                  Create and manage volunteer availability collection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'create' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('create')}
                >
                  Create
                </Button>
                <Button
                  variant={viewMode === 'responses' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('responses')}
                >
                  Responses
                </Button>
                <Button
                  variant={viewMode === 'confirm' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('confirm')}
                >
                  Confirm
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
              />
            </div>
          </div>

          {/* Admin Access Check */}
          {!hasAdminAccess(userRole) && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
                <p className="text-sm text-destructive">
                  You do not have admin privileges to create availability sheets.
                </p>
              </div>
            </div>
          )}

          {/* Create Mode */}
          {viewMode === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="text"
                  name="title"
                  label="Service Title"
                  placeholder="e.g., Sunday Feast Preparation"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Describe the service and what volunteers will be doing..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    name="deadline"
                    label="Response Deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Target Audience</label>
                    <select
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">All Community Members</option>
                      <option value="devotees">Devotees Only</option>
                      <option value="inmates">Inmates Only</option>
                      <option value="counsellors">Counsellors Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Available Time Slots</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTimeSlot}
                    iconName="Plus"
                  >
                    Add Slot
                  </Button>
                </div>

                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="p-4 border border-border rounded-lg bg-muted/20">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">Slot {slot.id}</h4>
                        {timeSlots.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(slot.id)}
                            iconName="Trash2"
                            className="text-destructive"
                          />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          type="time"
                          label="Start Time"
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                          required
                        />
                        
                        <Input
                          type="time"
                          label="End Time"
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                          required
                        />
                        
                        <Input
                          type="number"
                          label="Capacity"
                          min="1"
                          value={slot.capacity}
                          onChange={(e) => updateTimeSlot(slot.id, 'capacity', parseInt(e.target.value))}
                          required
                        />
                      </div>
                      
                      <Input
                        type="text"
                        label="Description (Optional)"
                        placeholder="Special requirements or notes for this time slot"
                        value={slot.description}
                        onChange={(e) => updateTimeSlot(slot.id, 'description', e.target.value)}
                        className="mt-3"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!hasAdminAccess(userRole)}
                >
                  {isLoading ? 'Creating...' : 'Create & Send'}
                </Button>
              </div>
            </form>
          )}

          {/* Responses Mode */}
          {viewMode === 'responses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Volunteer Responses ({responses.length})
                </h3>
                <Button
                  variant="default"
                  onClick={() => setViewMode('confirm')}
                  iconName="Check"
                >
                  Proceed to Confirmation
                </Button>
              </div>

              <div className="space-y-4">
                {responses.map((response) => (
                  <div key={response.id} className="p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={response.avatar}
                          alt={response.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{response.userName}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(response.responseTime).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Selected {response.selectedSlots.length} time slot(s)
                        </p>
                        {response.notes && (
                          <p className="text-sm text-foreground bg-muted/50 p-2 rounded">
                            "{response.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Mode */}
          {viewMode === 'confirm' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Confirm Service Assignments
                </h3>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-accent" />
                  <h4 className="font-medium text-accent">Confirmation Process</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  This will create service assignments and notify volunteers via in-app message or call.
                  Once confirmed, services will be published to the community.
                </p>
              </div>

              <div className="space-y-4">
                {responses.map((response) => (
                  <div key={response.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={response.avatar}
                            alt={response.userName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{response.userName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {response.selectedSlots.length} slot(s) selected
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" iconName="MessageCircle">
                          Message
                        </Button>
                        <Button variant="outline" size="sm" iconName="Phone">
                          Call
                        </Button>
                        <Button variant="default" size="sm" iconName="Check">
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setViewMode('responses')}>
                  Back to Responses
                </Button>
                <Button
                  variant="default"
                  onClick={handleConfirmServices}
                  loading={isLoading}
                  iconName="Check"
                >
                  {isLoading ? 'Publishing...' : 'Confirm & Publish Services'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySheet;