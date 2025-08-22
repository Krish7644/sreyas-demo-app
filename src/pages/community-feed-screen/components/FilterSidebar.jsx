import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  trendingTopics, 
  onTopicClick,
  className = "" 
}) => {
  const postTypeOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'inspiration', label: 'Spiritual Inspiration' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'question', label: 'Questions' },
    { value: 'announcement', label: 'Announcements' }
  ];

  const centerOptions = [
    { value: 'all', label: 'All Centers' },
    { value: 'mumbai', label: 'ISKCON Mumbai' },
    { value: 'delhi', label: 'ISKCON Delhi' },
    { value: 'bangalore', label: 'ISKCON Bangalore' },
    { value: 'vrindavan', label: 'ISKCON Vrindavan' },
    { value: 'mayapur', label: 'ISKCON Mayapur' }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Temple President', label: 'Temple Presidents' },
    { value: 'HOD', label: 'HODs' },
    { value: 'Counsellor', label: 'Counsellors' },
    { value: 'Inmate', label: 'Inmates' },
    { value: 'Devotee', label: 'Devotees' }
  ];

  return (
    <div className={`bg-card border border-border rounded-xl shadow-soft p-6 ${className}`}>
      {/* Filters Section */}
      <div className="mb-8">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filters
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Post Type"
            options={postTypeOptions}
            value={filters.postType}
            onChange={(value) => onFilterChange('postType', value)}
          />
          
          <Select
            label="Center"
            options={centerOptions}
            value={filters.center}
            onChange={(value) => onFilterChange('center', value)}
          />
          
          <Select
            label="Author Role"
            options={roleOptions}
            value={filters.role}
            onChange={(value) => onFilterChange('role', value)}
          />
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          className="mt-4"
          onClick={() => onFilterChange('reset')}
        >
          Reset Filters
        </Button>
      </div>

      {/* Trending Topics */}
      <div className="mb-8">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2" />
          Trending Topics
        </h3>
        
        <div className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => onTopicClick(topic.tag)}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-gentle group"
            >
              <div className="flex items-center justify-between">
                <span className="font-body font-medium text-foreground group-hover:text-primary">
                  #{topic.tag}
                </span>
                <span className="text-sm text-muted-foreground">
                  {topic.count} posts
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Spiritual Quote of the Day */}
      <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
        <h4 className="font-heading font-semibold text-foreground mb-2 flex items-center">
          <Icon name="Quote" size={16} className="mr-2" />
          Daily Inspiration
        </h4>
        <p className="text-sm text-foreground italic mb-2">
          "The highest perfection of human life is to remember Krishna at the time of death."
        </p>
        <p className="text-xs text-muted-foreground">— Bhagavad Gita</p>
      </div>
    </div>
  );
};

export default FilterSidebar;