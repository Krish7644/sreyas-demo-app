import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CalendarView from './components/CalendarView';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import CreateEventModal from './components/CreateEventModal';
import EventDetailsModal from './components/EventDetailsModal';
import YatraPlanner from './components/YatraPlanner';

const EventsYatrasScreen = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('calendar'); // calendar, list, yatras
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    status: 'all'
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userRole] = useState('devotee'); // devotee, admin, hod
  const [loading, setLoading] = useState(true);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: 'Mangala Aarti',
      description: 'Early morning devotional service with beautiful kirtans and prayers',
      category: 'daily_program',
      date: '2025-07-18',
      time: '04:30',
      duration: 90,
      location: 'Main Temple Hall',
      organizer: 'Temple Management',
      capacity: 150,
      enrolled: 87,
      waitingList: 12,
      requirements: ['Arrive 15 minutes early', 'Proper temple attire'],
      image: '/assets/images/mangala-aarti.jpg',
      rsvpRequired: true,
      userRSVP: 'confirmed'
    },
    {
      id: 2,
      title: 'Janmashtami Festival',
      description: 'Grand celebration of Lord Krishna\'s appearance day with abhishek, bhajans, and feast',
      category: 'festival',
      date: '2025-08-15',
      time: '18:00',
      duration: 480,
      location: 'Temple Complex',
      organizer: 'Festival Committee',
      capacity: 500,
      enrolled: 324,
      waitingList: 45,
      requirements: ['Fasting till midnight', 'Volunteer seva opportunities'],
      image: '/assets/images/janmashtami.jpg',
      rsvpRequired: true,
      userRSVP: null
    },
    {
      id: 3,
      title: 'Bhagavad Gita Study Circle',
      description: 'Weekly discussion on the sacred teachings of Lord Krishna',
      category: 'workshop',
      date: '2025-07-20',
      time: '19:00',
      duration: 120,
      location: 'Study Hall',
      organizer: 'Gopal Das Prabhu',
      capacity: 30,
      enrolled: 28,
      waitingList: 8,
      requirements: ['Bring Bhagavad Gita As It Is', 'Prior reading of assigned chapter'],
      image: '/assets/images/gita-class.jpg',
      rsvpRequired: true,
      userRSVP: 'confirmed'
    },
    {
      id: 4,
      title: 'Vrindavan Yatra',
      description: '7-day spiritual pilgrimage to the holy land of Lord Krishna',
      category: 'yatra',
      date: '2025-09-10',
      time: '06:00',
      duration: 10080, // 7 days in minutes
      location: 'Vrindavan, India',
      organizer: 'Yatra Committee',
      capacity: 40,
      enrolled: 35,
      waitingList: 15,
      requirements: ['Passport required', 'Advance payment', 'Health clearance'],
      image: '/assets/images/vrindavan-yatra.jpg',
      rsvpRequired: true,
      userRSVP: 'waitlist',
      cost: '₹35,000',
      itinerary: [
        'Day 1-2: Mathura darshan',
        'Day 3-5: Vrindavan temples',
        'Day 6-7: Govardhan parikrama'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events', color: 'primary' },
    { id: 'daily_program', label: 'Daily Programs', color: 'secondary' },
    { id: 'festival', label: 'Festivals', color: 'accent' },
    { id: 'workshop', label: 'Workshops', color: 'success' },
    { id: 'yatra', label: 'Yatras', color: 'warning' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter events based on selected filters
    let filtered = events;
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }
    
    if (filters.location !== 'all') {
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(event => {
        if (filters.status === 'available') return event.enrolled < event.capacity;
        if (filters.status === 'full') return event.enrolled >= event.capacity;
        if (filters.status === 'my_events') return event.userRSVP;
        return true;
      });
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const handleRSVP = (eventId, action) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const updated = { ...event };
        if (action === 'confirm' && event.enrolled < event.capacity) {
          updated.enrolled += 1;
          updated.userRSVP = 'confirmed';
        } else if (action === 'waitlist') {
          updated.waitingList += 1;
          updated.userRSVP = 'waitlist';
        } else if (action === 'cancel') {
          if (event.userRSVP === 'confirmed') updated.enrolled -= 1;
          if (event.userRSVP === 'waitlist') updated.waitingList -= 1;
          updated.userRSVP = null;
        }
        return updated;
      }
      return event;
    }));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      enrolled: 0,
      waitingList: 0,
      userRSVP: null
    };
    setEvents(prev => [...prev, newEvent]);
    setShowCreateModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Loading spiritual events...</p>
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
                Events & Yatras 🕉️
              </h1>
              <p className="text-muted-foreground font-body">
                Spiritual gatherings, festivals, and sacred pilgrimages
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {(userRole === 'admin' || userRole === 'hod') && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  iconName="Plus"
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Event
                </Button>
              )}
              
              <div className="flex items-center bg-card border border-border rounded-lg shadow-soft">
                <button
                  onClick={() => setView('calendar')}
                  className={`px-3 py-2 text-sm font-medium transition-gentle ${
                    view === 'calendar' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  } rounded-l-lg`}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Calendar
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-2 text-sm font-medium transition-gentle ${
                    view === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} className="mr-2" />
                  List
                </button>
                <button
                  onClick={() => setView('yatras')}
                  className={`px-3 py-2 text-sm font-medium transition-gentle ${
                    view === 'yatras' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  } rounded-r-lg`}
                >
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Yatras
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <EventFilters
            categories={categories}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Calendar/List View */}
            <div className="lg:col-span-3">
              {view === 'calendar' && (
                <CalendarView
                  events={filteredEvents}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  onEventClick={handleEventClick}
                />
              )}
              
              {view === 'list' && (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                      onRSVP={handleRSVP}
                    />
                  ))}
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground font-body">No events found matching your filters</p>
                    </div>
                  )}
                </div>
              )}
              
              {view === 'yatras' && (
                <YatraPlanner
                  yatras={filteredEvents.filter(e => e.category === 'yatra')}
                  onEventClick={handleEventClick}
                  onRSVP={handleRSVP}
                />
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Event Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Events</span>
                    <span className="font-semibold text-foreground">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">My RSVPs</span>
                    <span className="font-semibold text-primary">
                      {events.filter(e => e.userRSVP).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming Festivals</span>
                    <span className="font-semibold text-accent">
                      {events.filter(e => e.category === 'festival').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available Yatras</span>
                    <span className="font-semibold text-warning">
                      {events.filter(e => e.category === 'yatra').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spiritual Calendar */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Spiritual Calendar
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                    <Icon name="Sun" size={16} className="text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Ekadashi</p>
                      <p className="text-xs text-muted-foreground">Tomorrow - Fasting day</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                    <Icon name="Star" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Janmashtami</p>
                      <p className="text-xs text-muted-foreground">Aug 15 - Festival</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="Calendar"
                    onClick={() => setView('calendar')}
                  >
                    View Calendar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="MapPin"
                    onClick={() => setView('yatras')}
                  >
                    Browse Yatras
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    iconName="Bell"
                    onClick={() => navigate('/notification-settings')}
                  >
                    Event Reminders
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showCreateModal && (
        <CreateEventModal
          categories={categories}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEvent}
        />
      )}
      
      {showDetailsModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setShowDetailsModal(false)}
          onRSVP={handleRSVP}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default EventsYatrasScreen;