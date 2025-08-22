import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const CalendarView = ({ events, selectedDate, onDateSelect, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const getEventsForDate = (day) => {
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const getCategoryColor = (category) => {
    const colors = {
      daily_program: 'bg-secondary',
      festival: 'bg-accent',
      workshop: 'bg-success',
      yatra: 'bg-warning'
    };
    return colors[category] || 'bg-primary';
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 lg:h-32 border-r border-b border-border bg-muted/20" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
      const isSelected = selectedDate?.toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
          className={cn(
            "h-24 lg:h-32 border-r border-b border-border p-1 lg:p-2 cursor-pointer transition-gentle hover:bg-muted/50",
            isToday && "bg-primary/10",
            isSelected && "bg-primary/20 ring-2 ring-primary/30"
          )}
        >
          <div className={cn(
            "w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-medium mb-1",
            isToday && "bg-primary text-primary-foreground",
            !isToday && "text-foreground"
          )}>
            {day}
          </div>
          
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                className={cn(
                  "text-xs p-1 rounded text-white cursor-pointer truncate hover:opacity-80",
                  getCategoryColor(event.category)
                )}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-heading font-bold text-foreground">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-gentle"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-gentle"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {dayNames.map(day => (
            <div key={day} className="p-2 lg:p-4 text-center text-sm font-semibold text-muted-foreground border-r border-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-secondary"></div>
            <span className="text-muted-foreground">Daily Programs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-accent"></div>
            <span className="text-muted-foreground">Festivals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-success"></div>
            <span className="text-muted-foreground">Workshops</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-warning"></div>
            <span className="text-muted-foreground">Yatras</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;