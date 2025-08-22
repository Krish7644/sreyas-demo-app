import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const DataExportSection = ({ userProfile }) => {
  const [exportInProgress, setExportInProgress] = useState(false);
  const [selectedData, setSelectedData] = useState({
    profile: true,
    sadhana: true,
    spiritual_progress: true,
    batch_info: true,
    achievements: true,
    communication: false,
    settings: true
  });

  const dataTypes = [
    {
      id: 'profile',
      label: 'Profile Information',
      description: 'Personal details, contact info, spiritual information',
      icon: 'User',
      size: '2.1 KB'
    },
    {
      id: 'sadhana',
      label: 'Sadhana Records',
      description: 'Daily practice tracking, japa rounds, reading logs',
      icon: 'Circle',
      size: '145.7 KB'
    },
    {
      id: 'spiritual_progress',
      label: 'Spiritual Progress',
      description: 'Milestones, streaks, service hours, attendance',
      icon: 'TrendingUp',
      size: '32.4 KB'
    },
    {
      id: 'batch_info',
      label: 'Educational Records',
      description: 'Batch information, assignments, grades, certificates',
      icon: 'GraduationCap',
      size: '18.9 KB'
    },
    {
      id: 'achievements',
      label: 'Achievements & Badges',
      description: 'Earned badges, completed milestones, recognition',
      icon: 'Award',
      size: '5.3 KB'
    },
    {
      id: 'communication',
      label: 'Communication Data',
      description: 'Messages, counsellor interactions, community posts',
      icon: 'MessageCircle',
      size: '234.8 KB'
    },
    {
      id: 'settings',
      label: 'App Settings',
      description: 'Preferences, notification settings, privacy controls',
      icon: 'Settings',
      size: '1.2 KB'
    }
  ];

  const handleDataTypeToggle = (dataType) => {
    setSelectedData(prev => ({
      ...prev,
      [dataType]: !prev[dataType]
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedData).every(Boolean);
    const newState = {};
    dataTypes.forEach(type => {
      newState[type.id] = !allSelected;
    });
    setSelectedData(newState);
  };

  const handleExport = async (format) => {
    setExportInProgress(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create export data
      const exportData = {
        exportDate: new Date().toISOString(),
        userId: userProfile?.id,
        spiritualName: userProfile?.personalInfo?.spiritualName,
        data: {}
      };

      // Add selected data types
      Object.keys(selectedData).forEach(dataType => {
        if (selectedData[dataType]) {
          exportData.data[dataType] = userProfile?.[dataType] || {};
        }
      });

      // Download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: format === 'pdf' ? 'application/pdf' : 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sreyas_spiritual_data_${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'json'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log(`Data exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportInProgress(false);
    }
  };

  const selectedCount = Object.values(selectedData).filter(Boolean).length;
  const totalSelectedSize = dataTypes.reduce((total, type) => {
    if (selectedData[type.id]) {
      return total + parseFloat(type.size);
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Data Export
        </h2>
        <p className="text-sm text-muted-foreground">
          Export your spiritual journey data for personal records or migration
        </p>
      </div>

      {/* Export Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Export Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
            <Icon name="Package" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Selected Data Types</p>
              <p className="text-xs text-muted-foreground">{selectedCount} of {dataTypes.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-secondary/10 rounded-lg">
            <Icon name="HardDrive" size={20} className="text-secondary" />
            <div>
              <p className="text-sm font-medium text-foreground">Estimated Size</p>
              <p className="text-xs text-muted-foreground">{totalSelectedSize.toFixed(1)} KB</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Privacy Protected</p>
              <p className="text-xs text-muted-foreground">Secure export</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Selection */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Select Data to Export
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            iconName={Object.values(selectedData).every(Boolean) ? "Minus" : "Plus"}
          >
            {Object.values(selectedData).every(Boolean) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        <div className="space-y-3">
          {dataTypes.map(dataType => (
            <div 
              key={dataType.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-gentle cursor-pointer",
                selectedData[dataType.id] 
                  ? "border-primary bg-primary/5" :"border-border hover:bg-muted/50"
              )}
              onClick={() => handleDataTypeToggle(dataType.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center transition-gentle",
                  selectedData[dataType.id]
                    ? "border-primary bg-primary" :"border-muted-foreground"
                )}>
                  {selectedData[dataType.id] && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  selectedData[dataType.id] ? "bg-primary/10" : "bg-muted/30"
                )}>
                  <Icon 
                    name={dataType.icon} 
                    size={20} 
                    className={selectedData[dataType.id] ? "text-primary" : "text-muted-foreground"}
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{dataType.label}</p>
                  <p className="text-sm text-muted-foreground">{dataType.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{dataType.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Export Format
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="FileText" size={20} className="text-primary" />
              <h4 className="font-semibold text-foreground">JSON Format</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Machine-readable format, perfect for data migration and backup
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Structured data format</li>
              <li>• Easy to process programmatically</li>
              <li>• Smaller file size</li>
            </ul>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="FileText" size={20} className="text-secondary" />
              <h4 className="font-semibold text-foreground">PDF Report</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Human-readable report with charts and spiritual progress summary
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Formatted for reading</li>
              <li>• Includes progress charts</li>
              <li>• Print-friendly layout</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleExport('json')}
            disabled={selectedCount === 0 || exportInProgress}
            iconName={exportInProgress ? "Loader" : "Download"}
            className={exportInProgress ? "animate-spin" : ""}
          >
            {exportInProgress ? 'Exporting...' : 'Export as JSON'}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            disabled={selectedCount === 0 || exportInProgress}
            iconName={exportInProgress ? "Loader" : "FileText"}
            className={exportInProgress ? "animate-spin" : ""}
          >
            {exportInProgress ? 'Generating...' : 'Export as PDF'}
          </Button>
        </div>
      </div>

      {/* Data Usage Information */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Data Usage & Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-success mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Secure Export</p>
              <p className="text-sm text-muted-foreground">
                Your data is exported directly to your device without being stored on external servers
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Eye" size={16} className="text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Your Data, Your Control</p>
              <p className="text-sm text-muted-foreground">
                You maintain complete control over your exported data and how it's used
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-warning mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Data Accuracy</p>
              <p className="text-sm text-muted-foreground">
                Exported data reflects information available at the time of export
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-secondary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Regular Backups</p>
              <p className="text-sm text-muted-foreground">
                We recommend exporting your data regularly to maintain personal records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportSection;