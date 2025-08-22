import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AartiTracker = ({ data = {}, onUpdate }) => {
  const [attended, setAttended] = useState(data?.attended || false);
  const [time, setTime] = useState(data?.time || '04:30');

  const handleToggle = () => {
    const newAttended = !attended;
    setAttended(newAttended);
    onUpdate?.({ attended: newAttended, time });
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    onUpdate?.({ attended, time: newTime });
  };

  return (
    <div className="bg-white rounded-lg border border-yellow-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <Icon name="Sun" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              मंगल आरती (Mangala Aarti)
            </h3>
            <p className="text-sm text-gray-600">
              Morning worship ceremony
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">{time}</p>
          <p className="text-xs text-gray-500">scheduled</p>
        </div>
      </div>

      {/* Attendance Toggle */}
      <div className="flex items-center justify-center mb-4">
        <Button
          variant={attended ? 'default' : 'outline'}
          size="lg"
          onClick={handleToggle}
          className={`w-full justify-center transition-all duration-300 ${
            attended 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg' 
              : 'border-yellow-300 hover:bg-yellow-50'
          }`}
        >
          <Icon 
            name={attended ? "CheckCircle" : "Circle"} 
            size={20} 
            className={`mr-2 ${attended ? 'text-white' : 'text-yellow-600'}`}
          />
          {attended ? 'Attended' : 'Mark as Attended'}
        </Button>
      </div>

      {/* Time Options */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {['04:30', '05:00', '05:30', '06:00'].map((timeOption) => (
          <Button
            key={timeOption}
            variant={time === timeOption ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTimeChange(timeOption)}
            className={`text-xs ${
              time === timeOption 
                ? 'bg-yellow-500 text-white' :'border-yellow-200 hover:bg-yellow-50'
            }`}
          >
            {timeOption}
          </Button>
        ))}
      </div>

      {/* Status Message */}
      {attended ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={16} className="text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              Wonderful! You attended Mangala Aarti at {time}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Clock" size={16} className="text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              Join the sacred morning ceremony at {time}
            </p>
          </div>
        </div>
      )}

      {/* Streak Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>Weekly Attendance</span>
        <span className="font-medium">6/7 days</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded-full"
          style={{ width: '85%' }}
        />
      </div>
    </div>
  );
};

export default AartiTracker;