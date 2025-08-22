import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const QuickEntryMode = ({ onClose, onSave, selectedDate }) => {
  const [entries, setEntries] = useState({
    japa: { completed: 16, target: 16 },
    mangalaAarti: { attended: true },
    reading: { minutes: 30, target: 30 },
    seva: { hours: 3, target: 3 },
    hearing: { minutes: 45 }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      key: 'japa',
      title: 'Japa Rounds',
      icon: 'Circle',
      color: 'from-orange-400 to-pink-400',
      question: 'How many rounds did you complete?',
      presets: [8, 12, 16, 20, 24, 32]
    },
    {
      key: 'mangalaAarti',
      title: 'Mangala Aarti',
      icon: 'Sun',
      color: 'from-yellow-400 to-orange-400',
      question: 'Did you attend Mangala Aarti?',
      presets: [true, false]
    },
    {
      key: 'reading',
      title: 'Reading Time',
      icon: 'Book',
      color: 'from-blue-400 to-purple-400',
      question: 'How many minutes did you read?',
      presets: [15, 30, 45, 60, 90]
    },
    {
      key: 'seva',
      title: 'Seva Hours',
      icon: 'Heart',
      color: 'from-green-400 to-teal-400',
      question: 'How many hours of seva?',
      presets: [1, 2, 3, 4, 5]
    },
    {
      key: 'hearing',
      title: 'Hearing Time',
      icon: 'Headphones',
      color: 'from-purple-400 to-pink-400',
      question: 'How many minutes of hearing?',
      presets: [15, 30, 45, 60, 90]
    }
  ];

  const currentStepData = steps[currentStep];

  const handlePresetSelect = (value) => {
    const step = steps[currentStep];
    let newEntries = { ...entries };

    if (step.key === 'mangalaAarti') {
      newEntries[step.key] = { attended: value };
    } else if (step.key === 'japa') {
      newEntries[step.key] = { ...newEntries[step.key], completed: value };
    } else if (step.key === 'reading') {
      newEntries[step.key] = { ...newEntries[step.key], minutes: value };
    } else if (step.key === 'seva') {
      newEntries[step.key] = { ...newEntries[step.key], hours: value };
    } else if (step.key === 'hearing') {
      newEntries[step.key] = { minutes: value };
    }

    setEntries(newEntries);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Save all entries
    Object.keys(entries).forEach(key => {
      onSave?.(key, entries[key]);
    });
    onClose?.();
  };

  const handleCustomInput = (value) => {
    const step = steps[currentStep];
    let newEntries = { ...entries };

    if (step.key === 'japa') {
      newEntries[step.key] = { ...newEntries[step.key], completed: parseInt(value) || 0 };
    } else if (step.key === 'reading') {
      newEntries[step.key] = { ...newEntries[step.key], minutes: parseInt(value) || 0 };
    } else if (step.key === 'seva') {
      newEntries[step.key] = { ...newEntries[step.key], hours: parseFloat(value) || 0 };
    } else if (step.key === 'hearing') {
      newEntries[step.key] = { minutes: parseInt(value) || 0 };
    }

    setEntries(newEntries);
  };

  const getCurrentValue = () => {
    const step = steps[currentStep];
    const entry = entries[step.key];
    
    if (step.key === 'mangalaAarti') {
      return entry.attended;
    } else if (step.key === 'japa') {
      return entry.completed;
    } else if (step.key === 'reading') {
      return entry.minutes;
    } else if (step.key === 'seva') {
      return entry.hours;
    } else if (step.key === 'hearing') {
      return entry.minutes;
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${currentStepData.color} rounded-full flex items-center justify-center`}>
              <Icon name={currentStepData.icon} size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-900">
                Quick Entry Mode
              </h3>
              <p className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h4 className="text-xl font-heading font-semibold text-gray-900 mb-2">
            {currentStepData.title}
          </h4>
          <p className="text-gray-600">
            {currentStepData.question}
          </p>
        </div>

        {/* Presets */}
        <div className="mb-6">
          {currentStepData.key === 'mangalaAarti' ? (
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={getCurrentValue() === true ? 'default' : 'outline'}
                size="lg"
                onClick={() => handlePresetSelect(true)}
                className={`justify-center ${getCurrentValue() === true ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Yes, I attended
              </Button>
              <Button
                variant={getCurrentValue() === false ? 'default' : 'outline'}
                size="lg"
                onClick={() => handlePresetSelect(false)}
                className={`justify-center ${getCurrentValue() === false ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                <Icon name="XCircle" size={20} className="mr-2" />
                No, I missed it
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {currentStepData.presets.map((preset) => (
                <Button
                  key={preset}
                  variant={getCurrentValue() === preset ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handlePresetSelect(preset)}
                  className={`justify-center ${getCurrentValue() === preset ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                >
                  {preset}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Custom Input */}
        {currentStepData.key !== 'mangalaAarti' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount:
            </label>
            <Input
              type="number"
              value={getCurrentValue()}
              onChange={(e) => handleCustomInput(e.target.value)}
              placeholder="Enter amount"
              className="text-center"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSave}
              iconName="Save"
            >
              Save All
            </Button>
            <Button
              variant="default"
              onClick={handleNext}
              iconName={currentStep === steps.length - 1 ? "Check" : "ChevronRight"}
              iconPosition="right"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Quick entry for {selectedDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickEntryMode;