import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceDetails = ({ service, onClose, onEdit, onJoinChat }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!service) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Select a Service
          </h3>
          <p className="text-muted-foreground">
            Choose a service from the table to view details
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'not_started': return 'text-muted-foreground bg-muted';
      case 'in_progress': return 'text-warning-foreground bg-warning';
      case 'completed': return 'text-success-foreground bg-success';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'not_started': return 'Clock';
      case 'in_progress': return 'Play';
      case 'completed': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error-foreground bg-error';
      case 'medium': return 'text-warning-foreground bg-warning';
      case 'low': return 'text-success-foreground bg-success';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'volunteers', label: 'Volunteers', icon: 'Users' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={service.icon} size={24} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {service.description}
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

        {/* Status and Priority */}
        <div className="flex items-center space-x-3 mt-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
            <Icon name={getStatusIcon(service.status)} size={14} className="mr-1" />
            {service.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(service.priority)}`}>
            {service.priority.toUpperCase()} PRIORITY
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 py-3 border-b-2 font-medium text-sm transition-gentle
                ${activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Department</label>
                <p className="text-sm text-muted-foreground mt-1">{service.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Incharge</label>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={service.incharge.avatar} 
                      alt={service.incharge.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{service.incharge.name}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Deadline</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(service.deadline).toLocaleDateString()} at {new Date(service.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <p className="text-sm text-muted-foreground mt-1">{service.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Requirements</label>
                <p className="text-sm text-muted-foreground mt-1">{service.requirements}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-border">
              <Button
                variant="default"
                onClick={onEdit}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Service
              </Button>
              <Button
                variant="outline"
                onClick={() => onJoinChat(service)}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Join Chat
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-semibold text-foreground">
                Volunteers ({service.volunteers.length}/{service.maxVolunteers})
              </h4>
              <Button
                variant="outline"
                size="sm"
                iconName="UserPlus"
                iconPosition="left"
              >
                Add Volunteer
              </Button>
            </div>

            <div className="space-y-3">
              {service.volunteers.map((volunteer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src={volunteer.avatar} 
                        alt={volunteer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{volunteer.name}</p>
                      <p className="text-xs text-muted-foreground">{volunteer.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      volunteer.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {volunteer.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageCircle"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{service.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${service.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-foreground">Recent Updates</h4>
              {service.updates?.map((update, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={update.user.avatar} 
                      alt={update.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{update.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{update.user.name}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{update.timestamp}</span>
                    </div>
                  </div>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No recent updates</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;