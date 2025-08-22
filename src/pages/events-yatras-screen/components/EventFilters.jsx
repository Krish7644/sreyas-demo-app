import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const EventFilters = ({ categories, filters, onFiltersChange }) => {
  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'temple', label: 'Main Temple' },
    { id: 'hall', label: 'Study Hall' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'offsite', label: 'Offsite' }
  ];

  const statuses = [
    { id: 'all', label: 'All Events' },
    { id: 'available', label: 'Available' },
    { id: 'full', label: 'Full' },
    { id: 'my_events', label: 'My Events' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Event Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilterChange('category', category.id)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-gentle flex items-center space-x-2",
                  filters.category === category.id
                    ? "bg-primary text-primary-foreground shadow-raised"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  category.color === 'primary' && "bg-primary",
                  category.color === 'secondary' && "bg-secondary", 
                  category.color === 'accent' && "bg-accent",
                  category.color === 'success' && "bg-success",
                  category.color === 'warning' && "bg-warning"
                )} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Availability
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange({
              category: 'all',
              location: 'all',
              status: 'all'
            })}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-gentle flex items-center space-x-2"
          >
            <Icon name="X" size={16} />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;