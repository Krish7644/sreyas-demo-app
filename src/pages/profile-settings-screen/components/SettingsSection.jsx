import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const SettingsSection = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings || {});
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (section, key) => {
    const newSettings = {
      ...localSettings,
      [section]: {
        ...localSettings[section],
        [key]: !localSettings[section]?.[key]
      }
    };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSelectChange = (section, key, value) => {
    const newSettings = {
      ...localSettings,
      [section]: {
        ...localSettings[section],
        [key]: value
      }
    };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground mb-2">
            Preferences & Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize your app experience and notification preferences
          </p>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              iconName="Save"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={16} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'pushNotifications')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.notifications?.pushNotifications ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.notifications?.pushNotifications ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-secondary" />
              <div>
                <p className="font-medium text-foreground">Email Reminders</p>
                <p className="text-sm text-muted-foreground">Receive reminders via email</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'emailReminders')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.notifications?.emailReminders ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.notifications?.emailReminders ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={16} className="text-success" />
              <div>
                <p className="font-medium text-foreground">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'smsAlerts')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.notifications?.smsAlerts ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.notifications?.smsAlerts ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-warning" />
              <div>
                <p className="font-medium text-foreground">Event Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about upcoming events</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'eventReminders')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.notifications?.eventReminders ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.notifications?.eventReminders ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Circle" size={16} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">Sadhana Reminders</p>
                <p className="text-sm text-muted-foreground">Daily practice reminders</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications', 'sadhanaReminders')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.notifications?.sadhanaReminders ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.notifications?.sadhanaReminders ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Profile Visibility
            </label>
            <select
              value={localSettings?.privacy?.profileVisibility || 'devotees_only'}
              onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="devotees_only">Devotees Only - Visible to ISKCON members</option>
              <option value="private">Private - Only visible to counsellors</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show Sadhana Progress</p>
              <p className="text-sm text-muted-foreground">Allow others to see your spiritual progress</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'showSadhanaProgress')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.privacy?.showSadhanaProgress ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.privacy?.showSadhanaProgress ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show Batch Information</p>
              <p className="text-sm text-muted-foreground">Display your current batch and progress</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'showBatchInfo')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.privacy?.showBatchInfo ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.privacy?.showBatchInfo ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Allow Messages</p>
              <p className="text-sm text-muted-foreground">Let other devotees send you messages</p>
            </div>
            <button
              onClick={() => handleToggle('privacy', 'allowMessages')}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                localSettings?.privacy?.allowMessages ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  localSettings?.privacy?.allowMessages ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          App Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Language
            </label>
            <select
              value={localSettings?.preferences?.language || 'english'}
              onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="english">English</option>
              <option value="hindi">हिन्दी (Hindi)</option>
              <option value="bengali">বাংলা (Bengali)</option>
              <option value="gujarati">ગુજરાતી (Gujarati)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select
              value={localSettings?.preferences?.theme || 'light'}
              onChange={(e) => handleSelectChange('preferences', 'theme', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Time Zone
            </label>
            <select
              value={localSettings?.preferences?.timeZone || 'Asia/Kolkata'}
              onChange={(e) => handleSelectChange('preferences', 'timeZone', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Format
            </label>
            <select
              value={localSettings?.preferences?.dateFormat || 'dd/mm/yyyy'}
              onChange={(e) => handleSelectChange('preferences', 'dateFormat', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spiritual Goals */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Spiritual Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Daily Japa Goal (Rounds)
            </label>
            <select
              value={localSettings?.preferences?.chantingGoal || 16}
              onChange={(e) => handleSelectChange('preferences', 'chantingGoal', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value={4}>4 rounds</option>
              <option value={8}>8 rounds</option>
              <option value={16}>16 rounds</option>
              <option value={32}>32 rounds</option>
              <option value={64}>64 rounds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Daily Reading Goal (Minutes)
            </label>
            <select
              value={localSettings?.preferences?.readingGoal || 30}
              onChange={(e) => handleSelectChange('preferences', 'readingGoal', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;