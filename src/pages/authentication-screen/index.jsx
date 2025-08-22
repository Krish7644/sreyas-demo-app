import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';


import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import LoadingSpinner from './components/LoadingSpinner';

const AuthenticationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = (userRole) => {
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      // Role-based navigation
      switch (userRole) {
        case 'devotee': navigate('/dashboard-screen');
          break;
        case 'counsellor': navigate('/counsellor-dashboard');
          break;
        case 'inmate': navigate('/inmate-dashboard');
          break;
        case 'hod': navigate('/hod-dashboard');
          break;
        case 'temple-president': navigate('/temple-president-dashboard');
          break;
        default:
          navigate('/dashboard-screen');
      }
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout - Two Column */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Panel - Inspirational Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-floating">
                  <Icon name="Lotus" size={64} color="white" />
                </div>
                <h1 className="text-4xl font-heading font-bold text-foreground">
                  Welcome to SREYAS
                </h1>
                <p className="text-lg text-muted-foreground font-body">
                  Join our spiritual community platform and embark on your devotional journey
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-raised">
                      <Image 
                        src="/assets/images/srila-prabhupada.jpg" 
                        alt="Srila Prabhupada"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-2xl font-heading font-bold text-accent">
                        Hare Krishna Hare Krishna
                      </h3>
                      <p className="text-lg font-heading font-semibold text-primary">
                        Krishna Krishna Hare Hare
                      </p>
                      <p className="text-lg font-heading font-semibold text-primary">
                        Hare Rama Hare Rama
                      </p>
                      <p className="text-lg font-heading font-semibold text-primary">
                        Rama Rama Hare Hare
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground italic text-center">
                      "Chant the holy names of Krishna and be happy"
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      - Founder Acharya of ISKCON - Srila Prabhupada
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  Devotional Features
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Daily Sadhana Tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Spiritual Community Network</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Seva Management System</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Counselor Guidance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Panel - Authentication Form */}
            <div className="animate-slide-right animation-delay-300">
              <div className="bg-card rounded-2xl shadow-floating border border-border overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center shadow-raised mb-4">
                      <Icon name="Lock" size={28} color="white" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {activeTab === 'login' ? 'Sign In' : 'Join Our Community'}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      {activeTab === 'login' ?'Access your spiritual journey dashboard' :'Create your devotional account'
                      }
                    </p>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex bg-muted rounded-lg p-1 mb-6">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-gentle ${
                        activeTab === 'login' ?'bg-primary text-primary-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setActiveTab('register')}
                      className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-gentle ${
                        activeTab === 'register' ?'bg-primary text-primary-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Register
                    </button>
                  </div>

                  {/* Form Content */}
                  {activeTab === 'login' ? (
                    <LoginForm 
                      onSuccess={handleAuthSuccess}
                      onForgotPassword={() => setShowForgotPassword(true)}
                    />
                  ) : (
                    <RegistrationForm 
                      onSuccess={handleAuthSuccess}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Single Column */}
          <div className="lg:hidden space-y-8">
            {/* Mobile Header */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-floating">
                <Icon name="Lotus" size={48} color="white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Welcome to SREYAS
              </h1>
              <p className="text-muted-foreground">
                Your spiritual community platform
              </p>
            </div>

            {/* Mobile Mantra Card */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-3 border-accent shadow-raised">
                  <Image 
                    src="/assets/images/srila-prabhupada.jpg" 
                    alt="Srila Prabhupada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-accent">
                    Hare Krishna Hare Krishna
                  </h3>
                  <p className="text-sm font-heading font-semibold text-primary">
                    Krishna Krishna Hare Hare
                  </p>
                  <p className="text-sm font-heading font-semibold text-primary">
                    Hare Rama Hare Rama
                  </p>
                  <p className="text-sm font-heading font-semibold text-primary">
                    Rama Rama Hare Hare
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Chant the holy names and be happy"
                </p>
              </div>
            </div>

            {/* Mobile Authentication Form */}
            <div className="bg-card rounded-2xl shadow-floating border border-border overflow-hidden animate-slide-up animation-delay-300">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto bg-primary rounded-full flex items-center justify-center shadow-raised mb-3">
                    <Icon name="Lock" size={24} color="white" />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    {activeTab === 'login' ? 'Sign In' : 'Join Community'}
                  </h2>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="flex bg-muted rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-gentle ${
                      activeTab === 'login' ?'bg-primary text-primary-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-gentle ${
                      activeTab === 'register' ?'bg-primary text-primary-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Mobile Form Content */}
                {activeTab === 'login' ? (
                  <LoginForm 
                    onSuccess={handleAuthSuccess}
                    onForgotPassword={() => setShowForgotPassword(true)}
                  />
                ) : (
                  <RegistrationForm 
                    onSuccess={handleAuthSuccess}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © 2025 SREYAS - ISKCON Spiritual Community Platform
            </p>
            <p className="text-xs mt-1">
              Founder Acharya of ISKCON - Srila Prabhupada
            </p>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default AuthenticationScreen;