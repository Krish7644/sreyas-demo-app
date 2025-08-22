import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { hasAdminAccess, canManageServices } from '../../../utils/roleManager';

const ServiceTable = ({ services, onServiceSelect, onStatusUpdate, onVolunteerAssign }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  
  // Mock user role - in real app, get from context/store
  const userRole = 'counsellor';

  const getStatusBadge = (status) => {
    const statusConfig = {
      not_started: { 
        label: 'Not Started', 
        variant: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: 'Clock'
      },
      in_progress: { 
        label: 'In Progress', 
        variant: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: 'Play'
      },
      completed: { 
        label: 'Completed', 
        variant: 'bg-green-100 text-green-700 border-green-200',
        icon: 'CheckCircle'
      }
    };
    
    const config = statusConfig[status] || statusConfig.not_started;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config.variant}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { label: 'Low', variant: 'bg-green-100 text-green-700 border-green-200' },
      medium: { label: 'Medium', variant: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      high: { label: 'High', variant: 'bg-red-100 text-red-700 border-red-200' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${config.variant}`}>
        {config.label}
      </span>
    );
  };

  const handleStatusUpdate = async (service) => {
    if (!canManageServices(userRole)) {
      alert('You do not have permission to update service status');
      return;
    }

    setIsLoading(prev => ({ ...prev, [`status_${service.id}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cycle through status: not_started -> in_progress -> completed -> not_started
      const statusCycle = {
        not_started: 'in_progress',
        in_progress: 'completed', 
        completed: 'not_started'
      };
      
      const newStatus = statusCycle[service.status] || 'not_started';
      onStatusUpdate({ ...service, status: newStatus });
      
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [`status_${service.id}`]: false }));
    }
  };

  const handleVolunteerAssign = async (service) => {
    if (!canManageServices(userRole)) {
      alert('You do not have permission to assign volunteers');
      return;
    }

    setIsLoading(prev => ({ ...prev, [`volunteer_${service.id}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onVolunteerAssign(service);
    } catch (error) {
      console.error('Failed to assign volunteer:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [`volunteer_${service.id}`]: false }));
    }
  };

  const handleEdit = async (service) => {
    if (!canManageServices(userRole)) {
      alert('You do not have permission to edit services');
      return;
    }
    
    setIsLoading(prev => ({ ...prev, [`edit_${service.id}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Edit service:', service.title);
      // Here you would open edit modal or navigate to edit page
    } catch (error) {
      console.error('Failed to edit service:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [`edit_${service.id}`]: false }));
    }
  };

  const handleDelete = async (service) => {
    if (!canManageServices(userRole)) {
      alert('You do not have permission to delete services');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete "${service.title}"?`)) {
      return;
    }
    
    setIsLoading(prev => ({ ...prev, [`delete_${service.id}`]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Delete service:', service.title);
      // Here you would call the actual delete function
    } catch (error) {
      console.error('Failed to delete service:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [`delete_${service.id}`]: false }));
    }
  };

  const handleJoinChat = (service) => {
    console.log('Join chat for service:', service.title);
    // Navigate to chat room or open chat modal
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Services ({services.length})
          </h2>
          {hasAdminAccess(userRole) && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                Admin Access
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Service</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Priority</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Volunteers</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Deadline</th>
              <th className="text-left p-4 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr 
                key={service.id} 
                className="border-b border-border hover:bg-muted/20 transition-gentle cursor-pointer"
                onClick={() => onServiceSelect(service)}
              >
                <td className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {service.department}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </td>
                
                <td className="p-4">
                  {getStatusBadge(service.status)}
                  <div className="mt-1">
                    <div className="w-20 bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all"
                        style={{ width: `${service.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {service.progress}%
                    </span>
                  </div>
                </td>
                
                <td className="p-4">
                  {getPriorityBadge(service.priority)}
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {service.volunteers?.slice(0, 3).map((volunteer, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                        >
                          <Image
                            src={volunteer.avatar}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {service.volunteers?.length || 0}/{service.maxVolunteers}
                    </span>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="text-xs text-muted-foreground">
                    {new Date(service.deadline).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(service.deadline).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </td>
                
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusUpdate(service)}
                      loading={isLoading[`status_${service.id}`]}
                      disabled={!canManageServices(userRole)}
                      iconName="RefreshCw"
                      title="Update Status"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVolunteerAssign(service)}
                      loading={isLoading[`volunteer_${service.id}`]}
                      disabled={!canManageServices(userRole)}
                      iconName="UserPlus"
                      title="Assign Volunteer"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      loading={isLoading[`edit_${service.id}`]}
                      disabled={!canManageServices(userRole)}
                      iconName="Edit"
                      title="Edit Service"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service)}
                      loading={isLoading[`delete_${service.id}`]}
                      disabled={!canManageServices(userRole)}
                      iconName="Trash2"
                      title="Delete Service"
                      className="text-destructive hover:text-destructive"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleJoinChat(service)}
                      iconName="MessageCircle"
                      title="Join Service Chat"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Services Found</h3>
          <p className="text-muted-foreground">
            {hasAdminAccess(userRole) 
              ? "Create your first service to get started with seva coordination." :"No services are currently available."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;