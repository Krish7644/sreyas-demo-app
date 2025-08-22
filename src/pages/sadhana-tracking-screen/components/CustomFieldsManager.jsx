import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const CustomFieldsManager = ({ fields = [], data = {}, onUpdate, userRole = 'devotee' }) => {
  const [fieldData, setFieldData] = useState(data);

  const handleFieldUpdate = (fieldId, value) => {
    const newData = { ...fieldData, [fieldId]: value };
    setFieldData(newData);
    onUpdate?.(newData);
  };

  const renderField = (field) => {
    const currentValue = fieldData[field.id] || {};

    switch (field.type) {
      case 'boolean':
        return (
          <div key={field.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Icon name={field.icon} size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{field.name}</h4>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${currentValue.completed ? 'text-green-600' : 'text-gray-400'}`}>
                  {currentValue.completed ? 'Done' : 'Pending'}
                </p>
              </div>
            </div>
            
            <Button
              variant={currentValue.completed ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFieldUpdate(field.id, { 
                ...currentValue, 
                completed: !currentValue.completed 
              })}
              className={`w-full justify-center ${
                currentValue.completed 
                  ? 'bg-green-500 hover:bg-green-600 text-white' :'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon 
                name={currentValue.completed ? "CheckCircle" : "Circle"} 
                size={16} 
                className="mr-2"
              />
              {currentValue.completed ? 'Completed' : 'Mark as Complete'}
            </Button>
          </div>
        );

      case 'time':
        return (
          <div key={field.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Icon name={field.icon} size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{field.name}</h4>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-indigo-600">
                  {currentValue.minutes || 0}/{field.target} min
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(((currentValue.minutes || 0) / field.target) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={currentValue.minutes || 0}
                onChange={(e) => handleFieldUpdate(field.id, { 
                  ...currentValue, 
                  minutes: parseInt(e.target.value) || 0 
                })}
                min="0"
                max="480"
                className="text-center flex-1"
              />
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFieldUpdate(field.id, { 
                    ...currentValue, 
                    minutes: Math.max((currentValue.minutes || 0) - 5, 0) 
                  })}
                  disabled={(currentValue.minutes || 0) < 5}
                  className="border-indigo-200 hover:bg-indigo-50"
                >
                  -5
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFieldUpdate(field.id, { 
                    ...currentValue, 
                    minutes: (currentValue.minutes || 0) + 5 
                  })}
                  className="border-indigo-200 hover:bg-indigo-50"
                >
                  +5
                </Button>
              </div>
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Icon name={field.icon} size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{field.name}</h4>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-indigo-600">
                  {currentValue.count || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleFieldUpdate(field.id, { 
                  ...currentValue, 
                  count: Math.max((currentValue.count || 0) - 1, 0) 
                })}
                disabled={(currentValue.count || 0) === 0}
                className="border-indigo-200 hover:bg-indigo-50"
              >
                <Icon name="Minus" size={16} />
              </Button>
              
              <Input
                type="number"
                value={currentValue.count || 0}
                onChange={(e) => handleFieldUpdate(field.id, { 
                  ...currentValue, 
                  count: parseInt(e.target.value) || 0 
                })}
                min="0"
                className="text-center w-20"
              />
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleFieldUpdate(field.id, { 
                  ...currentValue, 
                  count: (currentValue.count || 0) + 1 
                })}
                className="border-indigo-200 hover:bg-indigo-50"
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (fields.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="text-center">
          <Icon name="Settings" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Custom Fields
          </h3>
          <p className="text-gray-500 text-sm">
            {userRole === 'admin' ?'You can add custom sadhana fields from the admin panel.' :'Your temple administrator can add custom sadhana fields for your practice.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-gray-900">
          Custom Sadhana Fields
        </h3>
        <p className="text-sm text-gray-500">
          {fields.length} field{fields.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3">
        {fields.map(renderField)}
      </div>

      {userRole === 'admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Icon name="Settings" size={16} className="text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Admin Controls
              </p>
              <p className="text-xs text-blue-700">
                Manage custom fields from the admin panel
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFieldsManager;