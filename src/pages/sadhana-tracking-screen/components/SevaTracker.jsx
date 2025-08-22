import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SevaTracker = ({ data = {}, onUpdate }) => {
  const [hours, setHours] = useState(data?.hours || 0);
  const [target, setTarget] = useState(data?.target || 3);
  const [selectedActivities, setSelectedActivities] = useState(data?.activities || []);

  const sevaOptions = [
    { value: 'kitchen-service', label: '🍳 Kitchen Service', description: 'Cooking prasadam' },
    { value: 'temple-cleaning', label: '🧹 Temple Cleaning', description: 'Maintaining cleanliness' },
    { value: 'prasadam-distribution', label: '🥘 Prasadam Distribution', description: 'Serving devotees' },
    { value: 'garden-service', label: '🌱 Garden Service', description: 'Maintaining temple gardens' },
    { value: 'book-distribution', label: '📖 Book Distribution', description: 'Sharing knowledge' },
    { value: 'decoration-service', label: '🌸 Decoration Service', description: 'Deity decoration' },
    { value: 'construction-service', label: '🔨 Construction Service', description: 'Building maintenance' },
    { value: 'administrative-service', label: '📋 Administrative Service', description: 'Office work' },
    { value: 'educational-service', label: '👨‍🏫 Educational Service', description: 'Teaching and mentoring' },
    { value: 'transportation-service', label: '🚗 Transportation Service', description: 'Driving devotees' }
  ];

  const handleHoursChange = (e) => {
    const newHours = parseFloat(e.target.value) || 0;
    setHours(newHours);
    onUpdate?.({ hours: newHours, target, activities: selectedActivities });
  };

  const handleTargetChange = (e) => {
    const newTarget = parseFloat(e.target.value) || 3;
    setTarget(newTarget);
    onUpdate?.({ hours, target: newTarget, activities: selectedActivities });
  };

  const handleActivitiesChange = (activities) => {
    setSelectedActivities(activities);
    onUpdate?.({ hours, target, activities });
  };

  const handleQuickAdd = (addHours) => {
    const newHours = Math.max(hours + addHours, 0);
    setHours(newHours);
    onUpdate?.({ hours: newHours, target, activities: selectedActivities });
  };

  const getProgressPercentage = () => {
    return Math.min((hours / target) * 100, 100);
  };

  const getHoursColor = () => {
    if (hours >= target) return 'text-green-600';
    if (hours >= target * 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg border border-green-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              सेवा (Seva Service)
            </h3>
            <p className="text-sm text-gray-600">
              Devotional service to others
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${getHoursColor()}`}>
            {hours}/{target}
          </p>
          <p className="text-xs text-gray-500">hours</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Daily Progress</span>
          <span>{getProgressPercentage().toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Time Input */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours Served
          </label>
          <Input
            type="number"
            value={hours}
            onChange={handleHoursChange}
            min="0"
            max="24"
            step="0.5"
            className="text-center"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Target
          </label>
          <Input
            type="number"
            value={target}
            onChange={handleTargetChange}
            min="0.5"
            max="12"
            step="0.5"
            className="text-center"
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="flex justify-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-1)}
          disabled={hours < 1}
          className="border-green-200 hover:bg-green-50"
        >
          -1h
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-0.5)}
          disabled={hours < 0.5}
          className="border-green-200 hover:bg-green-50"
        >
          -30m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(0.5)}
          className="border-green-200 hover:bg-green-50"
        >
          +30m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(1)}
          className="border-green-200 hover:bg-green-50"
        >
          +1h
        </Button>
      </div>

      {/* Activity Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Activities
        </label>
        <Select
          options={sevaOptions}
          value={selectedActivities}
          onChange={handleActivitiesChange}
          multiple
          placeholder="Select seva activities..."
          searchable={true}
          className="w-full"
        />
      </div>

      {/* Selected Activities Display */}
      {selectedActivities?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedActivities.map((activityValue) => {
              const activity = sevaOptions.find(opt => opt.value === activityValue);
              return (
                <span
                  key={activityValue}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  <Icon name="Heart" size={12} className="mr-1" />
                  {activity?.label || activityValue}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Message */}
      {hours >= target ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={16} className="text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              Wonderful! You've completed your seva goal today! 🙏
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Clock" size={16} className="text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              {(target - hours).toFixed(1)} hours remaining to reach your seva goal
            </p>
          </div>
        </div>
      )}

      {/* Motivation Quote */}
      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800 italic text-center">
          "The best way to find yourself is to lose yourself in the service of others."
        </p>
      </div>
    </div>
  );
};

export default SevaTracker;