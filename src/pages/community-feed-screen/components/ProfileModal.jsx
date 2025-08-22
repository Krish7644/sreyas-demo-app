import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileModal = ({ isOpen, onClose, user, onMessage }) => {
  const [activeTab, setActiveTab] = useState('about');

  if (!isOpen || !user) return null;

  const mockUserDetails = {
    ...user,
    bio: `Dedicated devotee of Lord Krishna, serving at ISKCON Mumbai for the past 3 years. \nPassionate about spiritual growth and community service. \nDaily practitioner of japa meditation and kirtan.`,
    joinDate: 'January 2021',
    location: 'Mumbai, Maharashtra',
    batch: 'Arjuna Batch 2021',
    counsellor: 'Radhanath Swami',
    sadhanaStats: {
      japaRounds: 16,
      streak: 45,
      totalDays: 892
    },
    recentPosts: [
      {
        id: 1,
        content: 'Beautiful kirtan session today at the temple. The energy was absolutely divine!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        likes: 23
      },
      {
        id: 2,
        content: 'Completed my 16 rounds today with full concentration. Hare Krishna!',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        likes: 18
      }
    ],
    achievements: [
      { title: '100 Day Japa Streak', date: '2024-06-15', icon: 'Award' },
      { title: 'Community Helper', date: '2024-05-20', icon: 'Heart' },
      { title: 'Kirtan Enthusiast', date: '2024-04-10', icon: 'Music' }
    ]
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Temple President': return 'bg-purple-100 text-purple-800';
      case 'HOD': return 'bg-blue-100 text-blue-800';
      case 'Counsellor': return 'bg-green-100 text-green-800';
      case 'Inmate': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'posts', label: 'Posts', icon: 'FileText' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary rounded-t-xl"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-4">
            <div className="flex items-end space-x-4 -mt-16">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card shadow-raised">
                <Image 
                  src={mockUserDetails.avatar} 
                  alt={mockUserDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {mockUserDetails.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-caption ${getRoleBadgeColor(mockUserDetails.role)}`}>
                    {mockUserDetails.role}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{mockUserDetails.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Joined {mockUserDetails.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pb-2">
                <Button variant="default" onClick={() => onMessage(mockUserDetails)}>
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Message
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 border-b-2 transition-gentle ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-body font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">About</h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {mockUserDetails.bio}
                </p>
              </div>

              {/* Spiritual Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3">Spiritual Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Batch: {mockUserDetails.batch}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Counsellor: {mockUserDetails.counsellor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3">Sadhana Stats</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Japa Rounds</span>
                      <span className="text-sm font-medium text-foreground">{mockUserDetails.sadhanaStats.japaRounds}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Streak</span>
                      <span className="text-sm font-medium text-accent">{mockUserDetails.sadhanaStats.streak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Practice Days</span>
                      <span className="text-sm font-medium text-foreground">{mockUserDetails.sadhanaStats.totalDays}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground">Recent Posts</h3>
              {mockUserDetails.recentPosts.map((post) => (
                <div key={post.id} className="bg-muted rounded-lg p-4">
                  <p className="text-foreground mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatDate(post.timestamp)}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground">Achievements</h3>
              <div className="grid grid-cols-1 gap-4">
                {mockUserDetails.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Icon name={achievement.icon} size={20} className="text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-body font-semibold text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">Earned on {formatDate(achievement.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;