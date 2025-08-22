import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { hasAdminAccess } from '../../../utils/roleManager';

const CreateServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'medium',
    maxVolunteers: 1,
    deadline: '',
    location: '',
    requirements: '',
    icon: 'Users'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user role - in real app, get from context/store
  const userRole = 'counsellor';

  const departments = [
    'Temple Services',
    'Kitchen & Prasadam', 
    'Education & Outreach',
    'Maintenance',
    'Events & Programs',
    'Administration'
  ];

  const icons = [
    'Users', 'Heart', 'Book', 'Flower', 'Star', 'Calculator', 
    'Sun', 'MapPin', 'Calendar', 'Music', 'Gift', 'Home'
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department selection is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else if (new Date(formData.deadline) <= new Date()) {
      newErrors.deadline = 'Deadline must be in the future';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.maxVolunteers < 1) {
      newErrors.maxVolunteers = 'At least 1 volunteer is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check admin access
    if (!hasAdminAccess(userRole)) {
      setErrors({ submit: 'You do not have permission to create services' });
      return;
    }
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const newService = {
        id: Date.now(),
        ...formData,
        status: 'not_started',
        progress: 0,
        volunteers: [],
        incharge: {
          name: 'Current User', // Replace with actual user data
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        updates: []
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(newService);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        department: '',
        priority: 'medium',
        maxVolunteers: 1,
        deadline: '',
        location: '',
        requirements: '',
        icon: 'Users'
      });
      
    } catch (error) {
      setErrors({ submit: 'Failed to create service. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-2xl shadow-floating border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Create New Service
                </h2>
                <p className="text-sm text-muted-foreground">
                  Set up a new seva opportunity for the community
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Basic Information</h3>
              
              <Input
                type="text"
                name="title"
                label="Service Title"
                placeholder="e.g., Mangala Aarti Preparation"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Describe the service requirements and activities..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Department <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-sm text-destructive">{errors.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Service Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  name="maxVolunteers"
                  label="Maximum Volunteers"
                  placeholder="1"
                  min="1"
                  value={formData.maxVolunteers}
                  onChange={handleInputChange}
                  error={errors.maxVolunteers}
                  required
                />

                <Input
                  type="datetime-local"
                  name="deadline"
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  error={errors.deadline}
                  required
                />
              </div>

              <Input
                type="text"
                name="location"
                label="Location"
                placeholder="e.g., Main Temple Hall, Kitchen, Garden"
                value={formData.location}
                onChange={handleInputChange}
                error={errors.location}
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Requirements</label>
                <textarea
                  name="requirements"
                  rows="2"
                  placeholder="Special skills, experience, or qualifications needed..."
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Icon</label>
                <div className="grid grid-cols-6 gap-2">
                  {icons.map(iconName => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                      className={`p-3 rounded-lg border transition-gentle ${
                        formData.icon === iconName
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={iconName} size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">{errors.submit}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                disabled={!hasAdminAccess(userRole)}
              >
                {isLoading ? 'Creating...' : 'Create Service'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceModal;