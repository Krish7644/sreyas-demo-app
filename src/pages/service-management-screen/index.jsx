import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceFilters from './components/ServiceFilters';
import ServiceTable from './components/ServiceTable';
import ServiceDetails from './components/ServiceDetails';
import CreateServiceModal from './components/CreateServiceModal';
import BulkActions from './components/BulkActions';
import ServiceStats from './components/ServiceStats';
import AvailabilitySheet from './components/AvailabilitySheet';
import RSVPTooltip from './components/RSVPTooltip';
import { hasAdminAccess } from '../../utils/roleManager';

const ServiceManagementScreen = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filters, setFilters] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAvailabilitySheetOpen, setIsAvailabilitySheetOpen] = useState(false);
  const [showRSVPTooltip, setShowRSVPTooltip] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // table, cards

  // Mock user role - in real app, get from context/store
  const userRole = 'counsellor';

  // Mock data
  const mockServices = [
    {
      id: 1,
      title: "Mangala Aarti Preparation",
      description: "Prepare temple for morning aarti ceremony including deity dressing and altar decoration",
      department: "Temple Services",
      status: "in_progress",
      priority: "high",
      maxVolunteers: 5,
      volunteers: [
        { name: "Radha Devi", role: "Lead Coordinator", avatar: "https://randomuser.me/api/portraits/women/1.jpg", status: "confirmed" },
        { name: "Krishna Das", role: "Assistant", avatar: "https://randomuser.me/api/portraits/men/2.jpg", status: "confirmed" },
        { name: "Gopi Devi", role: "Volunteer", avatar: "https://randomuser.me/api/portraits/women/3.jpg", status: "pending" }
      ],
      deadline: "2025-07-19T04:30:00",
      location: "Main Temple Hall",
      requirements: "Early morning availability, knowledge of deity worship procedures",
      icon: "Sun",
      progress: 75,
      incharge: {
        name: "Prabhu Govinda Das",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg"
      },
      updates: [
        {
          user: { name: "Radha Devi", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
          message: "Altar decoration completed, deity dressing in progress",
          timestamp: "2 hours ago"
        }
      ],
      chatRoom: {
        id: 'service_1_chat',
        participants: 3,
        lastMessage: 'Setup is going well, see you at 4:30 AM',
        lastMessageTime: '10 minutes ago'
      }
    },
    {
      id: 2,
      title: "Prasadam Distribution",
      description: "Coordinate prasadam distribution for Sunday feast program",
      department: "Kitchen & Prasadam",
      status: "not_started",
      priority: "medium",
      maxVolunteers: 8,
      volunteers: [
        { name: "Sita Devi", role: "Kitchen Coordinator", avatar: "https://randomuser.me/api/portraits/women/4.jpg", status: "confirmed" },
        { name: "Rama Das", role: "Server", avatar: "https://randomuser.me/api/portraits/men/5.jpg", status: "confirmed" }
      ],
      deadline: "2025-07-20T12:00:00",
      location: "Community Hall",
      requirements: "Food handling experience preferred, ability to work in team",
      icon: "Heart",
      progress: 0,
      incharge: {
        name: "Mataji Yamuna Devi",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg"
      }
    },
    {
      id: 3,
      title: "Bhagavad Gita Class Setup",
      description: "Arrange seating, audio equipment, and materials for weekly Gita class",
      department: "Education & Outreach",
      status: "completed",
      priority: "low",
      maxVolunteers: 3,
      volunteers: [
        { name: "Arjuna Das", role: "Technical Setup", avatar: "https://randomuser.me/api/portraits/men/6.jpg", status: "confirmed" },
        { name: "Kunti Devi", role: "Material Coordinator", avatar: "https://randomuser.me/api/portraits/women/7.jpg", status: "confirmed" },
        { name: "Bhima Das", role: "Seating Arrangement", avatar: "https://randomuser.me/api/portraits/men/8.jpg", status: "confirmed" }
      ],
      deadline: "2025-07-18T18:00:00",
      location: "Lecture Hall",
      requirements: "Basic technical knowledge for audio setup",
      icon: "Book",
      progress: 100,
      incharge: {
        name: "Prabhu Narada Das",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg"
      }
    },
    {
      id: 4,
      title: "Temple Garden Maintenance",
      description: "Weekly maintenance of temple gardens including watering, pruning, and cleaning",
      department: "Maintenance",
      status: "in_progress",
      priority: "medium",
      maxVolunteers: 6,
      volunteers: [
        { name: "Vrinda Devi", role: "Garden Coordinator", avatar: "https://randomuser.me/api/portraits/women/9.jpg", status: "confirmed" },
        { name: "Tulasi Das", role: "Plant Care", avatar: "https://randomuser.me/api/portraits/men/10.jpg", status: "confirmed" }
      ],
      deadline: "2025-07-19T16:00:00",
      location: "Temple Gardens",
      requirements: "Physical fitness for outdoor work, gardening experience helpful",
      icon: "Flower",
      progress: 40,
      incharge: {
        name: "Prabhu Vrindavan Das",
        avatar: "https://randomuser.me/api/portraits/men/13.jpg"
      }
    },
    {
      id: 5,
      title: "Janmashtami Festival Preparation",
      description: "Comprehensive preparation for Lord Krishna\'s appearance day celebration",
      department: "Events & Programs",
      status: "not_started",
      priority: "high",
      maxVolunteers: 15,
      volunteers: [
        { name: "Yasoda Devi", role: "Event Coordinator", avatar: "https://randomuser.me/api/portraits/women/12.jpg", status: "confirmed" },
        { name: "Nanda Das", role: "Decoration Team", avatar: "https://randomuser.me/api/portraits/men/14.jpg", status: "confirmed" },
        { name: "Devaki Devi", role: "Cultural Program", avatar: "https://randomuser.me/api/portraits/women/13.jpg", status: "pending" }
      ],
      deadline: "2025-08-15T18:00:00",
      location: "Entire Temple Complex",
      requirements: "Event management experience, cultural program skills, decoration abilities",
      icon: "Star",
      progress: 10,
      incharge: {
        name: "Prabhu Madhava Das",
        avatar: "https://randomuser.me/api/portraits/men/15.jpg"
      }
    },
    {
      id: 6,
      title: "Weekly Accounts Review",
      description: "Review and organize temple financial records and donation tracking",
      department: "Administration",
      status: "not_started",
      priority: "medium",
      maxVolunteers: 2,
      volunteers: [
        { name: "Lakshmi Devi", role: "Accounts Assistant", avatar: "https://randomuser.me/api/portraits/women/14.jpg", status: "confirmed" }
      ],
      deadline: "2025-07-21T14:00:00",
      location: "Administrative Office",
      requirements: "Basic accounting knowledge, attention to detail, computer skills",
      icon: "Calculator",
      progress: 0,
      incharge: {
        name: "Prabhu Dhananjaya Das",
        avatar: "https://randomuser.me/api/portraits/men/16.jpg"
      }
    }
  ];

  useEffect(() => {
    setServices(mockServices);
    setFilteredServices(mockServices);
  }, []);

  useEffect(() => {
    let filtered = [...services];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        service.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(service => service.status === filters.status);
    }

    if (filters.department && filters.department !== 'all') {
      filtered = filtered.filter(service => service.department.toLowerCase().includes(filters.department));
    }

    if (filters.urgency && filters.urgency !== 'all') {
      filtered = filtered.filter(service => service.priority === filters.urgency);
    }

    if (filters.startDate) {
      filtered = filtered.filter(service => new Date(service.deadline) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter(service => new Date(service.deadline) <= new Date(filters.endDate));
    }

    if (filters.minCapacity) {
      filtered = filtered.filter(service => service.maxVolunteers >= parseInt(filters.minCapacity));
    }

    if (filters.maxCapacity) {
      filtered = filtered.filter(service => service.maxVolunteers <= parseInt(filters.maxCapacity));
    }

    setFilteredServices(filtered);
  }, [services, filters]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleCreateService = (newService) => {
    const serviceWithDefaults = {
      ...newService,
      chatRoom: {
        id: `service_${newService.id}_chat`,
        participants: 0,
        lastMessage: 'Service chat room created',
        lastMessageTime: 'Just now'
      }
    };
    setServices(prev => [...prev, serviceWithDefaults]);
    setIsCreateModalOpen(false);
  };

  const handleStatusUpdate = (updatedService) => {
    setServices(prev => 
      prev.map(service => 
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const handleVolunteerAssign = (service) => {
    console.log('Assign volunteer to:', service.title);
    // Open volunteer assignment modal
  };

  const handleBulkAction = (action, selectedServices) => {
    console.log('Bulk action:', action, 'for services:', selectedServices);
  };

  const handleJoinChat = (service) => {
    console.log('Join chat for:', service.title);
    // Navigate to communication hub with service chat room
    // navigate('/communication-hub-screen', { state: { chatRoomId: service.chatRoom.id } });
  };

  const handleExportData = () => {
    console.log('Exporting service data...');
  };

  const handleCreateAvailabilitySheet = (availabilityData) => {
    console.log('Availability sheet created:', availabilityData);
    setIsAvailabilitySheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Service Management
                  </h1>
                  <p className="text-muted-foreground">
                    Coordinate seva opportunities and volunteer engagement
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* RSVP Info Button */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRSVPTooltip(!showRSVPTooltip)}
                    iconName="HelpCircle"
                  >
                    What is RSVP?
                  </Button>
                  <RSVPTooltip 
                    isVisible={showRSVPTooltip} 
                    onClose={() => setShowRSVPTooltip(false)} 
                  />
                </div>

                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    iconName="Table"
                  />
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    iconName="Grid"
                  />
                </div>

                {hasAdminAccess(userRole) && (
                  <Button
                    variant="outline"
                    onClick={() => setIsAvailabilitySheetOpen(true)}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Availability Sheet
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>

                {hasAdminAccess(userRole) && (
                  <Button
                    variant="default"
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Service
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <ServiceStats services={services} />

        {/* Bulk Actions */}
        <BulkActions
          selectedServices={selectedServices}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedServices([])}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Filters */}
          <div className="lg:col-span-3">
            <ServiceFilters
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {/* Center Panel - Services Table */}
          <div className="lg:col-span-6">
            <ServiceTable
              services={filteredServices}
              onServiceSelect={handleServiceSelect}
              onStatusUpdate={handleStatusUpdate}
              onVolunteerAssign={handleVolunteerAssign}
            />
          </div>

          {/* Right Panel - Service Details */}
          <div className="lg:col-span-3">
            <ServiceDetails
              service={selectedService}
              onClose={() => setSelectedService(null)}
              onEdit={() => console.log('Edit service')}
              onJoinChat={handleJoinChat}
            />
          </div>
        </div>
      </div>

      {/* Create Service Modal */}
      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateService}
      />

      {/* Availability Sheet Modal */}
      <AvailabilitySheet
        isOpen={isAvailabilitySheetOpen}
        onClose={() => setIsAvailabilitySheetOpen(false)}
        onSubmit={handleCreateAvailabilitySheet}
      />

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40 space-y-2">
        {hasAdminAccess(userRole) && (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsAvailabilitySheetOpen(true)}
            iconName="Calendar"
            className="rounded-full shadow-floating block"
          />
        )}
        {hasAdminAccess(userRole) && (
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
            iconName="Plus"
            className="rounded-full shadow-floating block"
          />
        )}
      </div>
    </div>
  );
};

export default ServiceManagementScreen;