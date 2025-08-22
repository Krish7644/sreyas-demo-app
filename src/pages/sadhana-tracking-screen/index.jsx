import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import JapaTracker from './components/JapaTracker';
import AartiTracker from './components/AartiTracker';
import ReadingTracker from './components/ReadingTracker';
import SevaTracker from './components/SevaTracker';
import HearingTracker from './components/HearingTracker';
import HistoricalView from './components/HistoricalView';
import QuickEntryMode from './components/QuickEntryMode';
import CustomFieldsManager from './components/CustomFieldsManager';
import ProgressSummary from './components/ProgressSummary';
import ExportReport from './components/ExportReport';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { format } from 'date-fns';

const SadhanaTrackingScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('daily'); // daily, historical, quick-entry
  const [userRole, setUserRole] = useState('devotee'); // devotee, counsellor, admin
  const [isQuickEntryMode, setIsQuickEntryMode] = useState(false);
  const [sadhanaData, setSadhanaData] = useState({});
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [totalCompletedDays, setTotalCompletedDays] = useState(0);

  // Mock data for demonstration
  const mockSadhanaData = {
    '2025-07-18': {
      japa: { completed: 12, target: 16, startTime: '04:30', endTime: '05:45' },
      mangalaAarti: { attended: true, time: '04:30' },
      reading: { minutes: 25, target: 30, books: ['Bhagavad Gita', 'Srimad Bhagavatam'] },
      seva: { hours: 2, target: 3, activities: ['Kitchen Service', 'Temple Cleaning'] },
      hearing: { minutes: 45, lectures: ['SB 1.1.1', 'BG 2.13'] },
      customFields: {
        deityWorship: { completed: true, minutes: 20 },
        templeVisit: { completed: false },
        studySession: { completed: true, minutes: 30 }
      }
    },
    '2025-07-17': {
      japa: { completed: 16, target: 16, startTime: '04:15', endTime: '05:30' },
      mangalaAarti: { attended: true, time: '04:30' },
      reading: { minutes: 35, target: 30, books: ['Bhagavad Gita'] },
      seva: { hours: 3, target: 3, activities: ['Prasadam Distribution', 'Garden Service'] },
      hearing: { minutes: 60, lectures: ['SB 1.1.2', 'Kirtan'] },
      customFields: {
        deityWorship: { completed: true, minutes: 25 },
        templeVisit: { completed: true },
        studySession: { completed: true, minutes: 45 }
      }
    }
  };

  const mockCustomFields = [
    { 
      id: 'deityWorship', 
      name: 'Deity Worship', 
      type: 'boolean', 
      required: false, 
      target: 1, 
      icon: 'Star',
      description: 'Personal deity worship practice'
    },
    { 
      id: 'templeVisit', 
      name: 'Temple Visit', 
      type: 'boolean', 
      required: false, 
      target: 1, 
      icon: 'MapPin',
      description: 'Visit to temple for darshan'
    },
    { 
      id: 'studySession', 
      name: 'Study Session', 
      type: 'time', 
      required: false, 
      target: 30, 
      icon: 'BookOpen',
      description: 'Focused study of scriptures'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setSadhanaData(mockSadhanaData);
      setCustomFields(mockCustomFields);
      setStreak(47);
      setTotalCompletedDays(329);
      setLoading(false);
    }, 1000);
  }, []);

  const getCurrentDateData = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return sadhanaData[dateKey] || {};
  };

  const handleDataUpdate = (field, value) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setSadhanaData(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value
      }
    }));
  };

  const handleQuickEntry = () => {
    setIsQuickEntryMode(true);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Export logic here
  };

  const getTodayProgress = () => {
    const todayData = getCurrentDateData();
    const fields = ['japa', 'mangalaAarti', 'reading', 'seva', 'hearing'];
    const completed = fields.filter(field => {
      const data = todayData[field];
      if (!data) return false;
      
      switch (field) {
        case 'japa':
          return data.completed >= data.target;
        case 'mangalaAarti':
          return data.attended;
        case 'reading':
          return data.minutes >= data.target;
        case 'seva':
          return data.hours >= data.target;
        case 'hearing':
          return data.minutes > 0;
        default:
          return false;
      }
    }).length;
    
    return (completed / fields.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Loading your sadhana...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-6 lg:px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                  🕉️ Sadhana Tracking
                </h1>
                <p className="text-muted-foreground font-body">
                  Monitor your daily spiritual practices • {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-heading font-semibold text-orange-600">
                    {streak} days
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    Current Streak
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Icon name="Flame" size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <ProgressSummary 
            progress={getTodayProgress()}
            streak={streak}
            totalDays={totalCompletedDays}
            selectedDate={selectedDate}
          />

          {/* View Mode Toggle */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant={viewMode === 'daily' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('daily')}
              iconName="Calendar"
            >
              Daily View
            </Button>
            <Button
              variant={viewMode === 'historical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('historical')}
              iconName="TrendingUp"
            >
              Historical
            </Button>
            <Button
              variant={isQuickEntryMode ? 'default' : 'outline'}
              size="sm"
              onClick={handleQuickEntry}
              iconName="Zap"
            >
              Quick Entry
            </Button>
          </div>

          {/* Quick Entry Mode */}
          {isQuickEntryMode && (
            <QuickEntryMode 
              onClose={() => setIsQuickEntryMode(false)}
              onSave={handleDataUpdate}
              selectedDate={selectedDate}
            />
          )}

          {/* Main Content */}
          {viewMode === 'daily' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Tracking Cards */}
              <div className="space-y-6">
                <JapaTracker 
                  data={getCurrentDateData().japa}
                  onUpdate={(value) => handleDataUpdate('japa', value)}
                />
                
                <AartiTracker 
                  data={getCurrentDateData().mangalaAarti}
                  onUpdate={(value) => handleDataUpdate('mangalaAarti', value)}
                />
                
                <ReadingTracker 
                  data={getCurrentDateData().reading}
                  onUpdate={(value) => handleDataUpdate('reading', value)}
                />
                
                <SevaTracker 
                  data={getCurrentDateData().seva}
                  onUpdate={(value) => handleDataUpdate('seva', value)}
                />
                
                <HearingTracker 
                  data={getCurrentDateData().hearing}
                  onUpdate={(value) => handleDataUpdate('hearing', value)}
                />

                {/* Custom Fields */}
                <CustomFieldsManager 
                  fields={customFields}
                  data={getCurrentDateData().customFields || {}}
                  onUpdate={(value) => handleDataUpdate('customFields', value)}
                  userRole={userRole}
                />
              </div>

              {/* Right Column - Analytics & Tools */}
              <div className="space-y-6">
                <HistoricalView 
                  data={sadhanaData}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
                
                <ExportReport 
                  onExport={handleExport}
                  dateRange={{ start: selectedDate, end: selectedDate }}
                />
              </div>
            </div>
          )}

          {/* Historical View */}
          {viewMode === 'historical' && (
            <HistoricalView 
              data={sadhanaData}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              fullView={true}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SadhanaTrackingScreen;