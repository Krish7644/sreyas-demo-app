import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import ParticipantPanel from './components/ParticipantPanel';
import MobileConversationDrawer from './components/MobileConversationDrawer';
import NotificationPanel from './components/NotificationPanel';

const CommunicationHubScreen = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [showParticipantPanel, setShowParticipantPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [messages, setMessages] = useState([]);

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Arjun Devotee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Devotee",
    isOnline: true
  };

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Counsellor Radhika Devi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      type: "counsellor",
      isGroup: false,
      isOnline: true,
      lastMessage: "How is your japa rounds going today?",
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      memberCount: 2
    },
    {
      id: 2,
      name: "Temple Cleaning Service",
      avatar: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop&crop=center",
      type: "service",
      isGroup: true,
      isOnline: false,
      lastMessage: "Tomorrow\'s cleaning schedule is ready",
      timestamp: new Date(Date.now() - 900000),
      unreadCount: 0,
      memberCount: 12,
      incharge: "Govind Das",
      status: "active",
      deadline: "Dec 25, 2024"
    },
    {
      id: 3,
      name: "Bhima Batch Community",
      avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=150&h=150&fit=crop&crop=center",
      type: "community",
      isGroup: true,
      isOnline: true,
      lastMessage: "Sharing today\'s spiritual insights...",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 5,
      memberCount: 25
    },
    {
      id: 4,
      name: "Kitchen Seva Team",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center",
      type: "service",
      isGroup: true,
      isOnline: true,
      lastMessage: "Prasadam preparation starts at 5 AM",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      memberCount: 8,
      incharge: "Radha Devi",
      status: "active",
      deadline: "Daily"
    },
    {
      id: 5,
      name: "Devotee Madhav",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      type: "community",
      isGroup: false,
      isOnline: false,
      lastMessage: "Hare Krishna! How was your temple visit?",
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 0,
      memberCount: 2
    },
    {
      id: 6,
      name: "Sankirtana Team",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=center",
      type: "service",
      isGroup: true,
      isOnline: true,
      lastMessage: "Book distribution results are amazing!",
      timestamp: new Date(Date.now() - 10800000),
      unreadCount: 3,
      memberCount: 15,
      incharge: "Nitai Das",
      status: "active",
      deadline: "Dec 31, 2024"
    }
  ];

  // Mock participants for group chats
  const participants = [
    {
      id: 1,
      name: "Arjun Devotee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Devotee",
      isOnline: true,
      isAdmin: false
    },
    {
      id: 2,
      name: "Govind Das",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Inmate",
      isOnline: true,
      isAdmin: true
    },
    {
      id: 3,
      name: "Radha Devi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      role: "Counsellor",
      isOnline: false,
      isAdmin: true
    },
    {
      id: 4,
      name: "Krishna Das",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "HOD",
      isOnline: true,
      isAdmin: false
    },
    {
      id: 5,
      name: "Gauranga Devotee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Devotee",
      isOnline: false,
      isAdmin: false
    }
  ];

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "messages",
      title: "New message from Counsellor",
      message: "Counsellor Radhika Devi sent you a message about your spiritual progress",
      timestamp: new Date(Date.now() - 300000),
      isRead: false
    },
    {
      id: 2,
      type: "services",
      title: "Service Assignment",
      message: "You have been assigned to Temple Cleaning Service for tomorrow",
      timestamp: new Date(Date.now() - 900000),
      isRead: false
    },
    {
      id: 3,
      type: "spiritual",
      title: "Daily Reminder",
      message: "Don\'t forget to complete your 16 rounds of japa today",
      timestamp: new Date(Date.now() - 1800000),
      isRead: true
    },
    {
      id: 4,
      type: "messages",
      title: "Group Message",
      message: "New message in Bhima Batch Community group",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true
    }
  ]);

  // Mock messages for active conversation
  const mockMessages = [
    {
      id: 1,
      text: "Hare Krishna! How are your japa rounds going today?",
      sender: {
        id: 2,
        name: "Counsellor Radhika Devi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 3600000),
      type: "text"
    },
    {
      id: 2,
      text: "Hare Krishna Mataji! I completed 12 rounds so far. Planning to finish the remaining 4 before evening aarti 🙏",
      sender: currentUser,
      timestamp: new Date(Date.now() - 3300000),
      type: "text"
    },
    {
      id: 3,
      text: "That's wonderful! Remember, quality is more important than speed. Focus on hearing each holy name clearly.",
      sender: {
        id: 2,
        name: "Counsellor Radhika Devi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 3000000),
      type: "text"
    },
    {
      id: 4,
      text: "Thank you for the guidance! I\'m also reading Bhagavad Gita daily. Currently on Chapter 7.",
      sender: currentUser,
      timestamp: new Date(Date.now() - 2700000),
      type: "text"
    },
    {
      id: 5,
      text: "Excellent! Chapter 7 is about knowing Krishna as the Supreme. How are you finding the verses?",
      sender: {
        id: 2,
        name: "Counsellor Radhika Devi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 2400000),
      type: "text"
    },
    {
      id: 6,
      text: "The verses about Krishna being the taste in water and the light in the moon are so beautiful! It helps me see Krishna everywhere 🌙✨",
      sender: currentUser,
      timestamp: new Date(Date.now() - 2100000),
      type: "text"
    },
    {
      id: 7,
      text: "That's the real realization! When we see Krishna in everything, our spiritual life becomes joyful. Keep up this wonderful progress! 🪷",
      sender: {
        id: 2,
        name: "Counsellor Radhika Devi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      timestamp: new Date(Date.now() - 1800000),
      type: "text"
    }
  ];

  useEffect(() => {
    if (activeConversation) {
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    setIsMobileDrawerOpen(false);
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleParticipantAction = (participant, action) => {
    if (action === 'message') {
      // Navigate to direct message with participant
      const directConversation = {
        id: `dm_${participant.id}`,
        name: participant.name,
        avatar: participant.avatar,
        type: 'community',
        isGroup: false,
        isOnline: participant.isOnline,
        lastMessage: '',
        timestamp: new Date(),
        unreadCount: 0,
        memberCount: 2
      };
      setActiveConversation(directConversation);
      setMessages([]);
    }
  };

  const handleNotificationAction = (notification, action) => {
    if (action === 'read' && notification) {
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
    } else if (action === 'markAllRead') {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } else if (action === 'clearAll') {
      setNotifications([]);
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-soft">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name="Menu" size={20} />
          </button>
          <h1 className="text-lg font-heading font-bold text-foreground">
            {activeConversation ? activeConversation.name : 'Messages'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name="Bell" size={20} />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
              </span>
            )}
          </button>
          
          {activeConversation?.isGroup && (
            <button
              onClick={() => setShowParticipantPanel(!showParticipantPanel)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
            >
              <Icon name="Users" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Conversation List */}
        <div className="w-80 flex-shrink-0">
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={handleConversationSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex">
          <ChatWindow
            conversation={activeConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
          />
          
          {/* Participant Panel */}
          {showParticipantPanel && activeConversation?.isGroup && (
            <ParticipantPanel
              conversation={activeConversation}
              participants={participants}
              onParticipantAction={handleParticipantAction}
            />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-[calc(100vh-64px)]">
        <ChatWindow
          conversation={activeConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={currentUser}
        />
      </div>

      {/* Mobile Conversation Drawer */}
      <MobileConversationDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        conversations={conversations}
        activeConversation={activeConversation}
        onConversationSelect={handleConversationSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onNotificationAction={handleNotificationAction}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Floating Action Button (Mobile) */}
      <div className="lg:hidden fixed bottom-20 right-4 z-30">
        <Button
          variant="default"
          size="icon"
          iconName="Plus"
          className="w-14 h-14 rounded-full shadow-floating"
          onClick={() => setIsMobileDrawerOpen(true)}
        />
      </div>

      {/* Desktop Notification Button */}
      <div className="hidden lg:block fixed top-4 right-4 z-30">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-3 bg-card border border-border rounded-lg shadow-soft text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
        >
          <Icon name="Bell" size={20} />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
              {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Spiritual Footer */}
      <div className="hidden lg:block fixed bottom-4 left-4 z-30">
        <div className="bg-card border border-border rounded-lg shadow-soft p-3 max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} className="text-accent" />
            <span className="text-sm font-heading font-semibold text-accent">
              Daily Inspiration
            </span>
          </div>
          <p className="text-xs font-body text-foreground italic">
            "The more you chant the holy name, the more you will taste the sweetness of Krishna's love."
          </p>
          <p className="text-xs font-caption text-muted-foreground mt-1">
            - Srila Prabhupada
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHubScreen;