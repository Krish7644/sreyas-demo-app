import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const HearingTracker = ({ data = {}, onUpdate }) => {
  const [minutes, setMinutes] = useState(data?.minutes || 0);
  const [selectedLectures, setSelectedLectures] = useState(data?.lectures || []);

  const lectureOptions = [
    { value: 'sb-1.1.1', label: 'SB 1.1.1 - Questions by the Sages' },
    { value: 'sb-1.1.2', label: 'SB 1.1.2 - Divinity and Divine Service' },
    { value: 'sb-1.2.1', label: 'SB 1.2.1 - Divinity and Divine Service' },
    { value: 'bg-2.13', label: 'BG 2.13 - Contents of the Gita Summarized' },
    { value: 'bg-4.9', label: 'BG 4.9 - Transcendental Knowledge' },
    { value: 'bg-7.1', label: 'BG 7.1 - Knowledge of the Absolute' },
    { value: 'cc-adi-1.1', label: 'CC Adi 1.1 - The Spiritual Masters' },
    { value: 'cc-madhya-8.51', label: 'CC Madhya 8.51 - Talks with Ramananda Raya' },
    { value: 'kirtan-session', label: '🎵 Kirtan Session' },
    { value: 'bhajan-session', label: '🎶 Bhajan Session' },
    { value: 'guru-maharaj-lecture', label: '👨‍🏫 Guru Maharaj Lecture' },
    { value: 'festival-discourse', label: '🎉 Festival Discourse' }
  ];

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value) || 0;
    setMinutes(newMinutes);
    onUpdate?.({ minutes: newMinutes, lectures: selectedLectures });
  };

  const handleLecturesChange = (lectures) => {
    setSelectedLectures(lectures);
    onUpdate?.({ minutes, lectures });
  };

  const handleQuickAdd = (addMinutes) => {
    const newMinutes = Math.max(minutes + addMinutes, 0);
    setMinutes(newMinutes);
    onUpdate?.({ minutes: newMinutes, lectures: selectedLectures });
  };

  const getProgressLevel = () => {
    if (minutes >= 60) return { level: 'excellent', color: 'text-green-600', message: 'Excellent!' };
    if (minutes >= 30) return { level: 'good', color: 'text-blue-600', message: 'Good progress!' };
    if (minutes >= 15) return { level: 'fair', color: 'text-yellow-600', message: 'Keep going!' };
    return { level: 'start', color: 'text-gray-600', message: 'Start listening!' };
  };

  const progress = getProgressLevel();

  return (
    <div className="bg-white rounded-lg border border-purple-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <Icon name="Headphones" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              श्रवण (Hearing)
            </h3>
            <p className="text-sm text-gray-600">
              Listening to spiritual discourses
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${progress.color}`}>
            {minutes}
          </p>
          <p className="text-xs text-gray-500">minutes</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Daily Listening</span>
          <span className={progress.color}>{progress.message}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((minutes / 60) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Time Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minutes Listened
        </label>
        <Input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          min="0"
          max="480"
          className="text-center"
        />
      </div>

      {/* Quick Add Buttons */}
      <div className="flex justify-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-15)}
          disabled={minutes < 15}
          className="border-purple-200 hover:bg-purple-50"
        >
          -15m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-5)}
          disabled={minutes < 5}
          className="border-purple-200 hover:bg-purple-50"
        >
          -5m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(15)}
          className="border-purple-200 hover:bg-purple-50"
        >
          +15m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(30)}
          className="border-purple-200 hover:bg-purple-50"
        >
          +30m
        </Button>
      </div>

      {/* Lecture Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lectures/Kirtans Heard
        </label>
        <Select
          options={lectureOptions}
          value={selectedLectures}
          onChange={handleLecturesChange}
          multiple
          placeholder="Select what you listened to..."
          searchable={true}
          className="w-full"
        />
      </div>

      {/* Selected Lectures Display */}
      {selectedLectures?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedLectures.map((lectureValue) => {
              const lecture = lectureOptions.find(opt => opt.value === lectureValue);
              return (
                <span
                  key={lectureValue}
                  className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                >
                  <Icon name="Headphones" size={12} className="mr-1" />
                  {lecture?.label || lectureValue}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { mins: 15, label: '15m', icon: 'Clock' },
          { mins: 30, label: '30m', icon: 'Clock' },
          { mins: 45, label: '45m', icon: 'Clock' },
          { mins: 60, label: '1h', icon: 'Award' }
        ].map((milestone) => (
          <div
            key={milestone.mins}
            className={`text-center p-2 rounded-lg border ${
              minutes >= milestone.mins
                ? 'bg-purple-100 border-purple-300 text-purple-800' :'bg-gray-50 border-gray-200 text-gray-500'
            }`}
          >
            <Icon 
              name={milestone.icon} 
              size={16} 
              className={`mx-auto mb-1 ${
                minutes >= milestone.mins ? 'text-purple-600' : 'text-gray-400'
              }`} 
            />
            <p className="text-xs font-medium">{milestone.label}</p>
          </div>
        ))}
      </div>

      {/* Status Message */}
      {minutes >= 60 ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Award" size={16} className="text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              Amazing! You've had a full hour of spiritual hearing today! 🏆
            </p>
          </div>
        </div>
      ) : minutes >= 30 ? (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Headphones" size={16} className="text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              Great progress! Continue listening to purify your consciousness.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="PlayCircle" size={16} className="text-purple-600 mr-2" />
            <p className="text-sm text-purple-800">
              Start your spiritual hearing journey today!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HearingTracker;