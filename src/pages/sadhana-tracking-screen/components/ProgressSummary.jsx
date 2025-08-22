import React from 'react';
import Icon from '../../../components/AppIcon';
import { format } from 'date-fns';

const ProgressSummary = ({ progress = 0, streak = 0, totalDays = 0, selectedDate }) => {
  const getProgressColor = () => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 60) return 'from-yellow-400 to-yellow-600';
    if (progress >= 40) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getProgressMessage = () => {
    if (progress >= 80) return 'Excellent sadhana! 🌟';
    if (progress >= 60) return 'Good progress! 👍';
    if (progress >= 40) return 'Keep going! 💪';
    return 'Let\'s start strong! 🚀';
  };

  const getStreakMessage = () => {
    if (streak >= 100) return 'Incredible dedication! 🏆';
    if (streak >= 50) return 'Amazing consistency! 🔥';
    if (streak >= 30) return 'Building strong habits! 💪';
    if (streak >= 7) return 'Great weekly streak! 📈';
    return 'Starting your journey! 🌱';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-gray-900">
            Daily Progress Summary
          </h2>
          <p className="text-sm text-gray-600">
            {format(selectedDate, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {progress.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500">completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Today's Completion</span>
          <span>{getProgressMessage()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`bg-gradient-to-r ${getProgressColor()} h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
            style={{ width: `${Math.max(progress, 5)}%` }}
          >
            {progress >= 10 && (
              <span className="text-xs font-medium text-white">
                {progress.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Flame" size={16} className="text-white" />
          </div>
          <p className="text-lg font-bold text-orange-600">{streak}</p>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={16} className="text-white" />
          </div>
          <p className="text-lg font-bold text-blue-600">{totalDays}</p>
          <p className="text-xs text-gray-600">Total Days</p>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={16} className="text-white" />
          </div>
          <p className="text-lg font-bold text-green-600">{progress.toFixed(0)}%</p>
          <p className="text-xs text-gray-600">Today's Goal</p>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={16} className="text-white" />
          </div>
          <p className="text-lg font-bold text-yellow-600">
            {totalDays > 0 ? Math.round((totalDays / (totalDays + 30)) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-600">Success Rate</p>
        </div>
      </div>

      {/* Motivational Messages */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Flame" size={20} className="text-orange-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-orange-900">
                Streak Status
              </p>
              <p className="text-xs text-orange-700">
                {getStreakMessage()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="TrendingUp" size={20} className="text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Daily Focus
              </p>
              <p className="text-xs text-blue-700">
                Consistency leads to spiritual growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spiritual Quote */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <div className="text-center">
          <Icon name="Quote" size={24} className="text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-purple-900 italic">
            "The supreme occupation for all humanity is that by which men can attain to loving devotional service unto the transcendent Lord."
          </p>
          <p className="text-xs text-purple-700 mt-1">
            - Srimad Bhagavatam 1.2.6
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;