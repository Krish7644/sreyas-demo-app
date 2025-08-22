import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      path: '/dashboard-screen', 
      label: 'Dashboard', 
      icon: 'Home',
      description: 'Spiritual progress hub'
    },
    { 
      path: '/sadhana-tracking-screen', 
      label: 'Sadhana', 
      icon: 'Calendar',
      description: 'Daily practice tracking'
    },
    { 
      path: '/service-management-screen', 
      label: 'Services', 
      icon: 'Users',
      description: 'Seva coordination'
    },
    { 
      path: '/community-feed-screen', 
      label: 'Community', 
      icon: 'MessageCircle',
      description: 'Devotional sharing'
    },
    {
      path: '/events-yatras-screen',
      label: 'Events',
      icon: 'MapPin',
      description: 'Spiritual events & yatras'
    },
    {
      path: '/profile-settings-screen',
      label: 'Profile',
      icon: 'Settings',
      description: 'Settings & preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
        <div className="w-full flex items-center justify-between px-6 py-4">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-raised">
              <Icon name="Lotus" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-heading font-bold text-foreground">SREYAS</h1>
              <p className="text-xs font-caption text-muted-foreground">Spiritual Community Platform</p>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-gentle hover-lift
                  ${isActive(item.path) 
                    ? 'bg-primary text-primary-foreground shadow-raised' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item.description}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-body font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Section - Spiritual Elements */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="space-y-1">
                <p className="text-sm font-heading font-semibold text-accent">
                  Hare Krishna Hare Krishna
                </p>
                <p className="text-xs font-heading font-semibold text-primary">
                  Krishna Krishna Hare Hare
                </p>
                <p className="text-xs font-heading font-semibold text-primary">
                  Hare Rama Hare Rama
                </p>
                <p className="text-xs font-heading font-semibold text-primary">
                  Rama Rama Hare Hare
                </p>
              </div>
              <p className="text-xs font-caption text-muted-foreground mt-1">
                Hare Krishna Maha Mantra
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-accent shadow-raised overflow-hidden">
              <Image 
                src="/assets/images/srila-prabhupada.jpg" 
                alt="Founder Acharya of ISKCON - Srila Prabhupada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Lotus" size={18} color="white" />
            </div>
            <h1 className="text-lg font-heading font-bold text-foreground">SREYAS</h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-floating animate-slide-down">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-gentle text-left
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item.icon} size={20} />
                  <div>
                    <span className="font-body font-medium text-sm block">{item.label}</span>
                    <span className="font-caption text-xs opacity-75">{item.description}</span>
                  </div>
                </button>
              ))}
            </nav>
            
            {/* Mobile Spiritual Section */}
            <div className="px-4 py-3 border-t border-border bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-accent overflow-hidden">
                  <Image 
                    src="/assets/images/srila-prabhupada.jpg" 
                    alt="Founder Acharya of ISKCON - Srila Prabhupada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-heading font-semibold text-accent">
                      Hare Krishna Hare Krishna
                    </p>
                    <p className="text-xs font-heading font-semibold text-primary">
                      Krishna Krishna Hare Hare
                    </p>
                    <p className="text-xs font-heading font-semibold text-primary">
                      Hare Rama Hare Rama
                    </p>
                    <p className="text-xs font-heading font-semibold text-primary">
                      Rama Rama Hare Hare
                    </p>
                  </div>
                  <p className="text-xs font-caption text-muted-foreground">
                    Hare Krishna Maha Mantra
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-floating">
        <div className="flex items-center justify-around px-2 py-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-gentle min-w-0 flex-1
                ${isActive(item.path) 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-caption text-xs font-medium truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20"></div>
      {/* Spacer for mobile bottom navigation */}
      <div className="h-16 lg:h-0"></div>
    </>
  );
};

export default Header;