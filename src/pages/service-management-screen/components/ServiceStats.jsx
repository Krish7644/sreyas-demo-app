import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceStats = ({ services }) => {
  const stats = React.useMemo(() => {
    const total = services.length;
    const notStarted = services.filter(s => s.status === 'not_started').length;
    const inProgress = services.filter(s => s.status === 'in_progress').length;
    const completed = services.filter(s => s.status === 'completed').length;
    const totalVolunteers = services.reduce((sum, s) => sum + s.volunteers.length, 0);
    const highPriority = services.filter(s => s.priority === 'high').length;

    return {
      total,
      notStarted,
      inProgress,
      completed,
      totalVolunteers,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [services]);

  const statCards = [
    {
      title: 'Total Services',
      value: stats.total,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: 'Play',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Volunteers',
      value: stats.totalVolunteers,
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-soft p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-heading font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {stat.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceStats;