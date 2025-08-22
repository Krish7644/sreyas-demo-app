import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import ProfileSection from './components/ProfileSection';
import CounsellorSection from './components/CounsellorSection';
import BatchSection from './components/BatchSection';
import SettingsSection from './components/SettingsSection';
import SecuritySection from './components/SecuritySection';
import DataExportSection from './components/DataExportSection';

const ProfileSettingsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  const mockUserProfile = {
    id: 'user123',
    email: 'krishna.das@iskcon.org',
    phone: '+91-9876543210',
    role: 'devotee', // devotee, counsellor, admin, hod
    personalInfo: {
      spiritualName: 'Krishna Das',
      legalName: 'Arjun Sharma',
      dateOfBirth: '1990-05-15',
      gender: 'male',
      initiationDate: '2023-01-15',
      initiatingGuru: 'His Holiness Radhanath Swami',
      avatar: '/assets/images/user-avatar.jpg',
      center: 'ISKCON Mumbai',
      address: {
        street: '123 Devotional Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400001'
      },
      emergencyContact: {
        name: 'Radha Priya Devi',
        relationship: 'Spouse',
        phone: '+91-9876543211'
      }
    },
    counsellor: {
      assigned: {
        name: 'Gopala Das Prabhu',
        email: 'gopala.das@iskcon.org',
        phone: '+91-9876543212',
        assignedDate: '2023-01-20',
        avatar: '/assets/images/counsellor-avatar.jpg'
      },
      meetings: [
        {
          id: 1,
          date: '2025-07-15',
          type: 'monthly_review',
          notes: 'Good progress in japa meditation',
          rating: 4
        }
      ],
      canRequestChange: true,
      nextMeeting: '2025-07-25'
    },
    batch: {
      current: {
        name: 'Bhakti Shastri 2024',
        level: 'intermediate',
        startDate: '2024-01-15',
        expectedCompletion: '2025-06-15',
        progress: 65,
        instructor: 'Bhakti Vidya Purna Swami'
      },
      achievements: [
        { id: 1, name: 'Bhagavad Gita Foundation', date: '2023-12-15', certified: true },
        { id: 2, name: 'Nectar of Devotion', date: '2024-06-15', certified: true }
      ],
      requirements: [
        { name: 'Attend 80% classes', completed: true, progress: 85 },
        { name: 'Complete assignments', completed: false, progress: 60 },
        { name: 'Pass final exam', completed: false, progress: 0 }
      ]
    },
    settings: {
      notifications: {
        pushNotifications: true,
        emailReminders: true,
        smsAlerts: false,
        eventReminders: true,
        sadhanaReminders: true,
        counsellorMessages: true,
        communityUpdates: false
      },
      privacy: {
        profileVisibility: 'devotees_only', // public, devotees_only, private
        showSadhanaProgress: true,
        showBatchInfo: true,
        allowMessages: true
      },
      preferences: {
        language: 'english',
        theme: 'light',
        timeZone: 'Asia/Kolkata',
        dateFormat: 'dd/mm/yyyy',
        chantingGoal: 16,
        readingGoal: 30
      }
    },
    spiritualProgress: {
      japaStreak: 47,
      totalRounds: 2847,
      booksRead: 12,
      lecturesHeard: 156,
      serviceHours: 89,
      eventAttendance: 34
    },
    security: {
      lastLogin: '2025-07-18T10:30:00Z',
      twoFactorEnabled: false,
      activeSessions: 2,
      loginHistory: [
        { device: 'iPhone 12', location: 'Mumbai, India', time: '2025-07-18T10:30:00Z' },
        { device: 'MacBook Pro', location: 'Mumbai, India', time: '2025-07-17T19:45:00Z' }
      ]
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User', description: 'Personal information' },
    { id: 'counsellor', label: 'Counsellor', icon: 'MessageCircle', description: 'Spiritual guidance' },
    ...(userProfile?.role === 'devotee' ? [{ id: 'batch', label: 'Batch', icon: 'GraduationCap', description: 'Educational progress' }] : []),
    { id: 'settings', label: 'Preferences', icon: 'Settings', description: 'App preferences' },
    { id: 'security', label: 'Security', icon: 'Shield', description: 'Account security' },
    { id: 'data', label: 'Data Export', icon: 'Download', description: 'Export your data' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserProfile(mockUserProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = (section, data) => {
    setUserProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to switch tabs?')) {
        setActiveTab(tabId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Loading your profile...</p>
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
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                Profile & Settings ⚙️
              </h1>
              <p className="text-muted-foreground font-body">
                Manage your profile, preferences, and spiritual journey
              </p>
            </div>
            
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="AlertTriangle" size={16} />
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
                <Button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  iconName={loading ? "Loader" : "Save"}
                  className={loading ? "animate-spin" : ""}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>

          {/* Profile Header Card */}
          <div className="bg-card rounded-lg border border-border shadow-soft p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image 
                    src={userProfile?.personalInfo?.avatar} 
                    alt={userProfile?.personalInfo?.spiritualName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Edit" size={12} className="text-primary-foreground" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    {userProfile?.personalInfo?.spiritualName}
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                    {userProfile?.role}
                  </span>
                </div>
                <p className="text-muted-foreground font-body text-sm mb-1">
                  {userProfile?.personalInfo?.center}
                </p>
                <p className="text-xs text-muted-foreground">
                  Initiated: {new Date(userProfile?.personalInfo?.initiationDate).toLocaleDateString()}
                  {userProfile?.personalInfo?.initiatingGuru && ` • Guru: ${userProfile.personalInfo.initiatingGuru}`}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">{userProfile?.spiritualProgress?.japaStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-secondary">{userProfile?.spiritualProgress?.booksRead}</p>
                  <p className="text-xs text-muted-foreground">Books Read</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-success">{userProfile?.spiritualProgress?.serviceHours}</p>
                  <p className="text-xs text-muted-foreground">Service Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Tab Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border shadow-soft p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-gentle text-left
                        ${activeTab === tab.id 
                          ? 'bg-primary text-primary-foreground shadow-raised' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon name={tab.icon} size={18} />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block">{tab.label}</span>
                        <span className="text-xs opacity-75 truncate">{tab.description}</span>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Spiritual Quote */}
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <Icon name="Quote" size={16} className="text-accent mb-2" />
                  <p className="text-xs text-muted-foreground italic">
                    "Man is made by his belief. As he believes, so he is."
                  </p>
                  <p className="text-xs text-accent font-medium mt-1">- Bhagavad Gita</p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <ProfileSection 
                  profile={userProfile?.personalInfo}
                  onUpdate={(data) => handleProfileUpdate('personalInfo', data)}
                />
              )}
              
              {activeTab === 'counsellor' && (
                <CounsellorSection 
                  counsellorData={userProfile?.counsellor}
                  onUpdate={(data) => handleProfileUpdate('counsellor', data)}
                />
              )}
              
              {activeTab === 'batch' && userProfile?.role === 'devotee' && (
                <BatchSection 
                  batchData={userProfile?.batch}
                  onUpdate={(data) => handleProfileUpdate('batch', data)}
                />
              )}
              
              {activeTab === 'settings' && (
                <SettingsSection 
                  settings={userProfile?.settings}
                  onUpdate={(data) => handleProfileUpdate('settings', data)}
                />
              )}
              
              {activeTab === 'security' && (
                <SecuritySection 
                  securityData={userProfile?.security}
                  onUpdate={(data) => handleProfileUpdate('security', data)}
                />
              )}
              
              {activeTab === 'data' && (
                <DataExportSection 
                  userProfile={userProfile}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingsScreen;