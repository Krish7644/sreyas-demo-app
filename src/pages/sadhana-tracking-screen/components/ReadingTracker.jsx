import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ReadingTracker = ({ data = {}, onUpdate }) => {
  const [minutes, setMinutes] = useState(data?.minutes || 0);
  const [target, setTarget] = useState(data?.target || 30);
  const [selectedBooks, setSelectedBooks] = useState(data?.books || []);

  const bookOptions = [
    { value: 'bhagavad-gita', label: 'भगवद्गीता (Bhagavad Gita)' },
    { value: 'srimad-bhagavatam', label: 'श्रीमद्भागवतम् (Srimad Bhagavatam)' },
    { value: 'chaitanya-charitamrita', label: 'चैतन्य चरितामृत (Chaitanya Charitamrita)' },
    { value: 'nectar-of-devotion', label: 'Nectar of Devotion' },
    { value: 'nectar-of-instruction', label: 'Nectar of Instruction' },
    { value: 'teachings-of-lord-chaitanya', label: 'Teachings of Lord Chaitanya' },
    { value: 'krishna-book', label: 'Krishna Book' },
    { value: 'isopanisad', label: 'Sri Isopanisad' }
  ];

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value) || 0;
    setMinutes(newMinutes);
    onUpdate?.({ minutes: newMinutes, target, books: selectedBooks });
  };

  const handleTargetChange = (e) => {
    const newTarget = parseInt(e.target.value) || 30;
    setTarget(newTarget);
    onUpdate?.({ minutes, target: newTarget, books: selectedBooks });
  };

  const handleBookChange = (books) => {
    setSelectedBooks(books);
    onUpdate?.({ minutes, target, books });
  };

  const handleQuickAdd = (addMinutes) => {
    const newMinutes = Math.max(minutes + addMinutes, 0);
    setMinutes(newMinutes);
    onUpdate?.({ minutes: newMinutes, target, books: selectedBooks });
  };

  const getProgressPercentage = () => {
    return Math.min((minutes / target) * 100, 100);
  };

  const getTimeColor = () => {
    if (minutes >= target) return 'text-green-600';
    if (minutes >= target * 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <Icon name="Book" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              स्वाध्याय (Spiritual Reading)
            </h3>
            <p className="text-sm text-gray-600">
              Study of sacred texts
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${getTimeColor()}`}>
            {minutes}/{target}
          </p>
          <p className="text-xs text-gray-500">minutes</p>
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
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Time Input */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minutes Read
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Target
          </label>
          <Input
            type="number"
            value={target}
            onChange={handleTargetChange}
            min="10"
            max="240"
            className="text-center"
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="flex justify-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-15)}
          disabled={minutes < 15}
          className="border-blue-200 hover:bg-blue-50"
        >
          -15m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(-5)}
          disabled={minutes < 5}
          className="border-blue-200 hover:bg-blue-50"
        >
          -5m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(5)}
          className="border-blue-200 hover:bg-blue-50"
        >
          +5m
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAdd(15)}
          className="border-blue-200 hover:bg-blue-50"
        >
          +15m
        </Button>
      </div>

      {/* Book Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Books Being Read
        </label>
        <Select
          options={bookOptions}
          value={selectedBooks}
          onChange={handleBookChange}
          multiple
          placeholder="Select books you're reading..."
          searchable={true}
          className="w-full"
        />
      </div>

      {/* Selected Books Display */}
      {selectedBooks?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedBooks.map((bookValue) => {
              const book = bookOptions.find(opt => opt.value === bookValue);
              return (
                <span
                  key={bookValue}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  <Icon name="Book" size={12} className="mr-1" />
                  {book?.label || bookValue}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Message */}
      {minutes >= target ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={16} className="text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              Excellent! You've completed your reading goal today! 📚
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="Clock" size={16} className="text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              {target - minutes} minutes remaining to reach your goal
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingTracker;