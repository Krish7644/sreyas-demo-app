import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const popularSearches = [
    'Krishna consciousness',
    'Bhagavad Gita',
    'Japa meditation',
    'Temple service',
    'Spiritual growth',
    'Kirtan',
    'Prasadam',
    'Vrindavan'
  ];

  return (
    <div className="bg-card border border-border rounded-xl shadow-soft p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Form */}
        <div className="flex-1 relative">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search posts, hashtags, or Sanskrit terms..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input text-foreground"
              />
            </div>
            
            {/* Search Suggestions */}
            {isSearchFocused && searchQuery.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-floating z-10">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-body font-medium text-muted-foreground">Popular Searches</p>
                </div>
                <div className="p-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search);
                        onSearch(search);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-gentle flex items-center space-x-2"
                    >
                      <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Create Post Button */}
        <Button 
          variant="default" 
          onClick={onCreatePost}
          iconName="Plus"
          iconPosition="left"
          className="lg:w-auto"
        >
          Create Post
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-body font-medium text-muted-foreground mr-2">Quick filters:</span>
        {['All', 'Inspiration', 'Questions', 'Achievements', 'Announcements'].map((filter) => (
          <button
            key={filter}
            onClick={() => onSearch(`type:${filter.toLowerCase()}`)}
            className="px-3 py-1 text-xs font-caption bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-gentle"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;