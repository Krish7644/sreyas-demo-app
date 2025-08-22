import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const SecuritySection = ({ securityData, onUpdate }) => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [show2FASetup, setShow2FASetup] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password changed successfully');
      setPasswordData({ current: '', new: '', confirm: '' });
      setShowPasswordChange(false);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handle2FAToggle = async () => {
    if (securityData?.twoFactorEnabled) {
      // Disable 2FA
      const confirmed = window.confirm('Are you sure you want to disable two-factor authentication?');
      if (confirmed) {
        onUpdate({ twoFactorEnabled: false });
      }
    } else {
      // Enable 2FA
      setShow2FASetup(true);
    }
  };

  const handleLogoutAllDevices = async () => {
    const confirmed = window.confirm('This will log you out of all devices. Continue?');
    if (confirmed) {
      console.log('Logging out of all devices...');
      // Simulate API call
      onUpdate({ activeSessions: 1 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Account Security
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your account security settings and monitor login activity
        </p>
      </div>

      {/* Security Overview */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Security Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              securityData?.twoFactorEnabled ? "bg-success/10" : "bg-warning/10"
            )}>
              <Icon 
                name={securityData?.twoFactorEnabled ? "Shield" : "AlertTriangle"} 
                size={20} 
                className={securityData?.twoFactorEnabled ? "text-success" : "text-warning"}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
              <p className={cn(
                "text-xs font-medium",
                securityData?.twoFactorEnabled ? "text-success" : "text-warning"
              )}>
                {securityData?.twoFactorEnabled ? 'Enabled' : 'Not Enabled'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Last Login</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(securityData?.lastLogin)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Monitor" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Active Sessions</p>
              <p className="text-xs text-muted-foreground">
                {securityData?.activeSessions || 0} device(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Management */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Password Management
          </h3>
          <Button
            variant="outline"
            iconName="Key"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
          >
            Change Password
          </Button>
        </div>

        {showPasswordChange && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Password
              </label>
              <Input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handlePasswordChange}
                disabled={!passwordData.current || !passwordData.new || passwordData.new !== passwordData.confirm}
                iconName="Save"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({ current: '', new: '', confirm: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button
            variant={securityData?.twoFactorEnabled ? "destructive" : "default"}
            iconName={securityData?.twoFactorEnabled ? "ShieldOff" : "Shield"}
            onClick={handle2FAToggle}
          >
            {securityData?.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </Button>
        </div>

        {securityData?.twoFactorEnabled && (
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Two-factor authentication is enabled
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Active Sessions
          </h3>
          <Button
            variant="outline"
            iconName="LogOut"
            onClick={handleLogoutAllDevices}
            className="text-destructive hover:bg-destructive/10"
          >
            Logout All Devices
          </Button>
        </div>

        <div className="space-y-3">
          {securityData?.loginHistory?.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon 
                    name={session.device.includes('iPhone') || session.device.includes('Android') ? "Smartphone" : "Monitor"} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{session.device}</p>
                  <p className="text-sm text-muted-foreground">{session.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {formatDate(session.time)}
                </p>
                {index === 0 && (
                  <span className="text-xs text-success font-medium">Current session</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Security Tips
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Use a strong, unique password that you don't use elsewhere
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Enable two-factor authentication for enhanced security
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Regularly review your login activity and active sessions
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Log out from public or shared computers after use
            </p>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-card rounded-lg border border-border shadow-floating p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Enable Two-Factor Authentication
              </h3>
              <button
                onClick={() => setShow2FASetup(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Verification Code
              </label>
              <Input
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="text-center text-lg tracking-wider"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                className="flex-1"
                onClick={() => {
                  onUpdate({ twoFactorEnabled: true });
                  setShow2FASetup(false);
                }}
                iconName="Shield"
              >
                Enable 2FA
              </Button>
              <Button
                variant="outline"
                onClick={() => setShow2FASetup(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;