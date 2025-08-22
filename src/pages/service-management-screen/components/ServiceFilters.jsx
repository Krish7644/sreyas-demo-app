import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ServiceFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'temple', label: 'Temple Services' },
    { value: 'kitchen', label: 'Kitchen & Prasadam' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'education', label: 'Education & Outreach' },
    { value: 'events', label: 'Events & Programs' },
    { value: 'administration', label: 'Administration' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...activeFilters, [key]: value });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Filters</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search services..."
              value={activeFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              label="Status"
              options={statusOptions}
              value={activeFilters.status || 'all'}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          {/* Department Filter */}
          <div>
            <Select
              label="Department"
              options={departmentOptions}
              value={activeFilters.department || 'all'}
              onChange={(value) => handleFilterChange('department', value)}
            />
          </div>

          {/* Priority Filter */}
          <div>
            <Select
              label="Priority"
              options={urgencyOptions}
              value={activeFilters.urgency || 'all'}
              onChange={(value) => handleFilterChange('urgency', value)}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date Range</label>
            <div className="grid grid-cols-1 gap-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={activeFilters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={activeFilters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>

          {/* Volunteer Capacity */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Volunteer Capacity</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={activeFilters.minCapacity || ''}
                onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={activeFilters.maxCapacity || ''}
                onChange={(e) => handleFilterChange('maxCapacity', e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onFilterChange({})}
              iconName="X"
              iconPosition="left"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceFilters;