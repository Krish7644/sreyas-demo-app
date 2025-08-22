import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const ProgressChart = ({ data }) => {
  const chartData = [
    { name: 'Japa', value: data?.japaCompletion || 0, color: '#E91E63' },
    { name: 'Aarti', value: data?.aartiAttendance || 0, color: '#FF9800' },
    { name: 'Reading', value: data?.readingGoal || 0, color: '#4CAF50' },
    { name: 'Seva', value: data?.sevaParticipation || 0, color: '#FFD700' }
  ];

  return (
    <div className="space-y-4">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              fontSize={12} 
              fill="#757575"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              fontSize={12} 
              fill="#757575"
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-body text-foreground">{item.name}</span>
            </div>
            <div className="text-lg font-heading font-bold text-foreground">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;