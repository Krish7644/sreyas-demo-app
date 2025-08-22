import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, activeConversation, onConversationSelect, searchQuery, onSearchChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Chats', icon: 'MessageCircle' },
    { id: 'counsellor', label: 'Counsellor', icon: 'User' },
    { id: 'service', label: 'Service Teams', icon: 'Users' },
    { id: 'community', label: 'Community', icon: 'Globe' }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || conv.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'counsellor': return 'User';
      case 'service': return 'Users';
      case 'community': return 'Globe';
      default: return 'MessageCircle';
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      counsellor: { label: 'Counsellor', color: 'bg-primary text-primary-foreground' },
      service: { label: 'Service', color: 'bg-secondary text-secondary-foreground' },
      community: { label: 'Community', color: 'bg-accent text-accent-foreground' }
    };
    return badges[type] || { label: 'Chat', color: 'bg-muted text-muted-foreground' };
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold text-foreground">Messages</h2>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle">
            <Icon name="Plus" size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-2 border-b border-border">
        <div className="flex space-x-1 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-gentle
                ${selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={category.icon} size={14} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No conversations found</h3>
            <p className="text-sm font-body text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a new conversation to begin'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const badge = getTypeBadge(conversation.type);
              return (
                <button
                  key={conversation.id}
                  onClick={() => onConversationSelect(conversation)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-gentle hover:bg-muted
                    ${activeConversation?.id === conversation.id ? 'bg-primary/10 border border-primary/20' : ''}
                  `}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {conversation.isGroup ? (
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name={getTypeIcon(conversation.type)} size={20} color="white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                        <Image 
                          src={conversation.avatar} 
                          alt={conversation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-body font-semibold text-sm text-foreground truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs font-caption text-muted-foreground">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-body text-muted-foreground truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-caption ${badge.color}`}>
                          {badge.label}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;