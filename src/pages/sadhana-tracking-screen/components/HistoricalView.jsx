import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format, subDays, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HistoricalView = ({ data = {}, selectedDate, onDateSelect, fullView = false }) => {
  const [viewType, setViewType] = useState('week'); // week, month, heatmap
  const [selectedMetric, setSelectedMetric] = useState('japa'); // japa, reading, seva, hearing

  const getChartData = () => {
    const days = viewType === 'week' ? 7 : 30;
    const dateRange = eachDayOfInterval({
      start: subDays(selectedDate, days - 1),
      end: selectedDate
    });

    return dateRange.map(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayData = data[dateKey] || {};
      
      let value = 0;
      switch (selectedMetric) {
        case 'japa':
          value = dayData.japa?.completed || 0;
          break;
        case 'reading':
          value = dayData.reading?.minutes || 0;
          break;
        case 'seva':
          value = dayData.seva?.hours || 0;
          break;
        case 'hearing':
          value = dayData.hearing?.minutes || 0;
          break;
        default:
          value = 0;
      }

      return {
        date: format(date, 'MMM dd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        value,
        target: getTargetValue(selectedMetric, dayData)
      };
    });
  };

  const getTargetValue = (metric, dayData) => {
    switch (metric) {
      case 'japa':
        return dayData.japa?.target || 16;
      case 'reading':
        return dayData.reading?.target || 30;
      case 'seva':
        return dayData.seva?.target || 3;
      case 'hearing':
        return 60; // Default target for hearing
      default:
        return 0;
    }
  };

  const getHeatmapData = () => {
    const weeks = [];
    const startDate = subDays(selectedDate, 83); // 12 weeks
    
    for (let i = 0; i < 12; i++) {
      const weekStart = startOfWeek(subDays(selectedDate, i * 7));
      const weekEnd = endOfWeek(weekStart);
      const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
      
      weeks.unshift(weekDays.map(date => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const dayData = data[dateKey] || {};
        
        // Calculate completion percentage
        const metrics = ['japa', 'reading', 'seva', 'hearing'];
        const completed = metrics.filter(metric => {
          const metricData = dayData[metric];
          if (!metricData) return false;
          
          switch (metric) {
            case 'japa':
              return metricData.completed >= (metricData.target || 16);
            case 'reading':
              return metricData.minutes >= (metricData.target || 30);
            case 'seva':
              return metricData.hours >= (metricData.target || 3);
            case 'hearing':
              return metricData.minutes >= 30;
            default:
              return false;
          }
        }).length;
        
        return {
          date: format(date, 'yyyy-MM-dd'),
          completion: (completed / metrics.length) * 100
        };
      }));
    }
    
    return weeks;
  };

  const chartData = getChartData();
  const heatmapData = getHeatmapData();

  const getMetricInfo = (metric) => {
    const info = {
      japa: { label: 'Japa Rounds', icon: 'Circle', color: '#f97316', unit: 'rounds' },
      reading: { label: 'Reading Time', icon: 'Book', color: '#3b82f6', unit: 'minutes' },
      seva: { label: 'Seva Hours', icon: 'Heart', color: '#10b981', unit: 'hours' },
      hearing: { label: 'Hearing Time', icon: 'Headphones', color: '#8b5cf6', unit: 'minutes' }
    };
    return info[metric] || info.japa;
  };

  const currentMetric = getMetricInfo(selectedMetric);

  if (!fullView) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              Weekly Progress
            </h3>
            <p className="text-sm text-gray-600">
              {currentMetric.label} - Last 7 days
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* Handle expand */}}
            iconName="Expand"
          >
            View All
          </Button>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={currentMetric.color} 
                strokeWidth={2}
                dot={{ fill: currentMetric.color }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#e5e7eb" 
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-gray-900">
            Historical Analytics
          </h3>
          <p className="text-sm text-gray-600">
            Track your spiritual progress over time
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          <Button
            variant={viewType === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('week')}
          >
            Week
          </Button>
          <Button
            variant={viewType === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('month')}
          >
            Month
          </Button>
          <Button
            variant={viewType === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('heatmap')}
          >
            Heatmap
          </Button>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['japa', 'reading', 'seva', 'hearing'].map(metric => {
          const metricInfo = getMetricInfo(metric);
          return (
            <Button
              key={metric}
              variant={selectedMetric === metric ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric(metric)}
              iconName={metricInfo.icon}
              className={selectedMetric === metric ? '' : 'border-gray-300'}
            >
              {metricInfo.label}
            </Button>
          );
        })}
      </div>

      {/* Charts */}
      {viewType === 'heatmap' ? (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Daily completion percentage - Last 12 weeks
            </p>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 w-fit mx-auto">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs text-gray-500 text-center p-1">
                  {day}
                </div>
              ))}
              {heatmapData.flat().map((day, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-sm border border-gray-200 cursor-pointer transition-all duration-200 ${
                    day.completion >= 80 ? 'bg-green-500' :
                    day.completion >= 60 ? 'bg-yellow-500' :
                    day.completion >= 40 ? 'bg-orange-500' :
                    day.completion > 0 ? 'bg-red-500' : 'bg-gray-100'
                  }`}
                  title={`${day.date}: ${day.completion.toFixed(0)}% completion`}
                  onClick={() => onDateSelect?.(new Date(day.date))}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm border border-gray-200"></div>
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} ${currentMetric.unit}`, currentMetric.label]}
              />
              <Bar dataKey="value" fill={currentMetric.color} />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#e5e7eb" 
                strokeDasharray="5 5"
                dot={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Icon name="TrendingUp" size={20} className="text-green-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-green-600">
            {chartData.filter(d => d.value >= d.target).length}
          </p>
          <p className="text-xs text-gray-600">Goals Met</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Icon name="Target" size={20} className="text-blue-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-blue-600">
            {chartData.length > 0 ? Math.round((chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)) : 0}
          </p>
          <p className="text-xs text-gray-600">Daily Average</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Icon name="Award" size={20} className="text-purple-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-purple-600">
            {chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 0}
          </p>
          <p className="text-xs text-gray-600">Best Day</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Icon name="Percent" size={20} className="text-orange-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-orange-600">
            {chartData.length > 0 ? Math.round((chartData.filter(d => d.value >= d.target).length / chartData.length) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-600">Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default HistoricalView;