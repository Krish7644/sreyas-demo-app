import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SadhanaCard from './components/SadhanaCard';
import ServiceCard from './components/ServiceCard';
import CommunityFeedPreview from './components/CommunityFeedPreview';
import CounsellorChat from './components/CounsellorChat';
import NotificationCenter from './components/NotificationCenter';
import ProgressChart from './components/ProgressChart';
import QuickStats from './components/QuickStats';
import UpcomingServices from './components/UpcomingServices';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('devotee'); // devotee, counsellor, admin
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for demonstration
  const mockDashboardData = {
    user: {
      name: 'Devotee Krishna Das',
      role: 'devotee',
      initiationDate: '2023-01-15',
      currentStreak: 47,
      totalDaysActive: 329
    },
    sadhana: {
      today: {
        japaRounds: 12,
        targetRounds: 16,
        mangalaAarti: true,
        readingTime: 25,
        targetReading: 30,
        sevaHours: 2,
        targetSeva: 3
      },
      weekly: {
        japaCompletion: 85,
        aartiAttendance: 90,
        readingGoal: 75,
        sevaParticipation: 80
      }
    },
    upcomingServices: [
      {
        id: 1,
        name: 'Mangala Aarti',
        time: '04:30 AM',
        date: '2025-07-19',
        rsvpRequired: true,
        countdown: '13h 11m',
        participants: 24
      },
      {
        id: 2,
        name: 'Bhagavad Gita Class',
        time: '07:00 PM',
        date: '2025-07-18',
        rsvpRequired: true,
        countdown: '3h 41m',
        participants: 156
      },
      {
        id: 3,
        name: 'Prasadam Distribution',
        time: '12:00 PM',
        date: '2025-07-18',
        rsvpRequired: false,
        countdown: '8h 41m',
        participants: 89
      }
    ],
    communityFeed: [
      {
        id: 1,
        author: 'Radha Priya Devi',
        content: 'Beautiful sunrise darshan at the temple today. Hare Krishna! 🌅',
        time: '2 hours ago',
        likes: 23,
        comments: 5,
        image: '/assets/images/temple-sunrise.jpg'
      },
      {
        id: 2,
        author: 'Gopala Das',
        content: 'Completed 108 rounds today for Ekadashi. Feeling blessed! 🙏',
        time: '4 hours ago',
        likes: 47,
        comments: 12
      }
    ],
    notifications: [
      {
        id: 1,
        type: 'service_reminder',
        message: 'Mangala Aarti starting in 10 minutes',
        time: '10 minutes ago',
        read: false
      },
      {
        id: 2,
        type: 'achievement',
        message: 'Congratulations! 45-day japa streak achieved',
        time: '1 hour ago',
        read: false
      }
    ],
    achievements: [
      { id: 1, name: '30-Day Streak', icon: 'Calendar', achieved: true },
      { id: 2, name: 'Early Riser', icon: 'Sun', achieved: true },
      { id: 3, name: 'Seva Warrior', icon: 'Heart', achieved: false }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockDashboardData);
      setLoading(false);
    }, 1000);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleServiceRSVP = (serviceId) => {
    console.log(`RSVP for service ${serviceId}`);
    // Handle RSVP logic
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'japa': navigate('/sadhana-tracking-screen');
        break;
      case 'services': navigate('/service-management-screen');
        break;
      case 'community': navigate('/community-feed-screen');
        break;
      case 'chat': navigate('/communication-hub-screen');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Loading your spiritual dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-6 lg:px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                  Hare Krishna, {dashboardData?.user?.name?.split(' ')[1] || 'Devotee'}! 🙏
                </h1>
                <p className="text-muted-foreground font-body">
                  Welcome to your spiritual dashboard • {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-heading font-semibold text-accent">
                    {dashboardData?.user?.currentStreak || 0} days
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    Current Streak
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Flame" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sadhana Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SadhanaCard 
                  title="Japa Meditation"
                  current={dashboardData?.sadhana?.today?.japaRounds || 0}
                  target={dashboardData?.sadhana?.today?.targetRounds || 16}
                  unit="rounds"
                  icon="Circle"
                  color="primary"
                  onClick={() => handleQuickAction('japa')}
                />
                <SadhanaCard 
                  title="Spiritual Reading"
                  current={dashboardData?.sadhana?.today?.readingTime || 0}
                  target={dashboardData?.sadhana?.today?.targetReading || 30}
                  unit="minutes"
                  icon="Book"
                  color="secondary"
                  onClick={() => handleQuickAction('japa')}
                />
                <SadhanaCard 
                  title="Seva Service"
                  current={dashboardData?.sadhana?.today?.sevaHours || 0}
                  target={dashboardData?.sadhana?.today?.targetSeva || 3}
                  unit="hours"
                  icon="Heart"
                  color="success"
                  onClick={() => handleQuickAction('services')}
                />
                <ServiceCard 
                  title="Mangala Aarti"
                  status={dashboardData?.sadhana?.today?.mangalaAarti ? 'completed' : 'pending'}
                  time="04:30 AM"
                  onClick={() => handleQuickAction('services')}
                />
              </div>

              {/* Upcoming Services */}
              <UpcomingServices 
                services={dashboardData?.upcomingServices || []}
                onRSVP={handleServiceRSVP}
              />

              {/* Progress Chart */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Weekly Spiritual Progress
                </h3>
                <ProgressChart data={dashboardData?.sadhana?.weekly || {}} />
              </div>

              {/* Community Feed Preview */}
              <CommunityFeedPreview 
                posts={dashboardData?.communityFeed || []}
                onViewAll={() => handleQuickAction('community')}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <QuickStats 
                totalDays={dashboardData?.user?.totalDaysActive || 0}
                currentStreak={dashboardData?.user?.currentStreak || 0}
                achievements={dashboardData?.achievements || []}
              />

              {/* Notification Center */}
              <NotificationCenter 
                notifications={dashboardData?.notifications || []}
              />

              {/* Counsellor Chat Widget */}
              <CounsellorChat />

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="Play"
                    onClick={() => handleQuickAction('japa')}
                  >
                    Start Japa Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="Calendar"
                    onClick={() => handleQuickAction('services')}
                  >
                    View All Services
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="MessageCircle"
                    onClick={() => handleQuickAction('community')}
                  >
                    Community Feed
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;