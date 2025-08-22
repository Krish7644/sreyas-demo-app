import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const JapaTracker = ({ data = {}, onUpdate }) => {
  const [completed, setCompleted] = useState(data?.completed || 0);
  const [target, setTarget] = useState(data?.target || 16);
  const [startTime, setStartTime] = useState(data?.startTime || '');
  const [endTime, setEndTime] = useState(data?.endTime || '');

  const handleIncrement = () => {
    const newCompleted = Math.min(completed + 1, target + 8); // Allow extra rounds
    setCompleted(newCompleted);
    onUpdate?.({ completed: newCompleted, target, startTime, endTime });
  };

  const handleDecrement = () => {
    const newCompleted = Math.max(completed - 1, 0);
    setCompleted(newCompleted);
    onUpdate?.({ completed: newCompleted, target, startTime, endTime });
  };

  const handleTargetChange = (e) => {
    const newTarget = parseInt(e.target.value) || 16;
    setTarget(newTarget);
    onUpdate?.({ completed, target: newTarget, startTime, endTime });
  };

  const handleTimeChange = (field, value) => {
    const updates = { completed, target, startTime, endTime };
    updates[field] = value;
    
    if (field === 'startTime') setStartTime(value);
    if (field === 'endTime') setEndTime(value);
    
    onUpdate?.(updates);
  };

  const getProgressPercentage = () => {
    return Math.min((completed / target) * 100, 100);
  };

  const getStreakBonus = () => {
    if (completed >= target) return completed - target;
    return 0;
  };

  return (
    <div className="bg-white rounded-lg border border-orange-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
            <Icon name="Circle" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              जप साधना (Japa Meditation)
            </h3>
            <p className="text-sm text-gray-600">
              Chanting the holy names
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-orange-600">{completed}/{target}</p>
          <p className="text-xs text-gray-500">rounds</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{getProgressPercentage().toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        {getStreakBonus() > 0 && (
          <p className="text-xs text-green-600 mt-1">
            +{getStreakBonus()} bonus rounds! 🎉
          </p>
        )}
      </div>

      {/* Counter Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={completed === 0}
          className="border-orange-200 hover:bg-orange-50"
        >
          <Icon name="Minus" size={16} />
        </Button>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">{completed}</div>
          <div className="text-xs text-gray-500">completed</div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          className="border-orange-200 hover:bg-orange-50"
        >
          <Icon name="Plus" size={16} />
        </Button>
      </div>

      {/* Time Tracking */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      {/* Target Setting */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">
          Daily Target:
        </label>
        <Input
          type="number"
          value={target}
          onChange={handleTargetChange}
          min="1"
          max="64"
          className="w-20 text-sm"
        />
        <span className="text-sm text-gray-500">rounds</span>
      </div>

      {/* Motivational Message */}
      {completed >= target && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 text-center">
            🎉 Excellent! You've completed your daily japa goal. Hare Krishna! 🙏
          </p>
        </div>
      )}
    </div>
  );
};

export default JapaTracker;