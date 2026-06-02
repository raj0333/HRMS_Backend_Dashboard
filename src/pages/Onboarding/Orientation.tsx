import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const initialOrientations = [
  { id: '1', employee: 'Bob Smith', dept: 'Design', startDate: '2024-09-20', status: 'in_progress', completedTasks: 5, totalTasks: 8 },
  { id: '2', employee: 'Carol Davis', dept: 'Product', startDate: '2024-10-01', status: 'pending', completedTasks: 0, totalTasks: 8 },
  { id: '3', employee: 'Rahul Sharma', dept: 'Engineering', startDate: '2024-08-15', status: 'completed', completedTasks: 8, totalTasks: 8 },
];

const orientationTasks = [
  'Company Overview & Culture',
  'IT Setup & Tools',
  'Office Tour & Facilities',
  'Compliance & Documentation',
  'Team Introduction',
  'Role Specific Training',
  'Emergency Procedures',
  'Wellness & Benefits',
];

export function Orientation() {
  const [orientations, setOrientations] = useState(initialOrientations);

  const markTaskComplete = (id: string) => {
    setOrientations(prev => prev.map(o => o.id === id ? { ...o, completedTasks: Math.min(o.completedTasks + 1, o.totalTasks), status: o.completedTasks + 1 >= o.totalTasks ? 'completed' : 'in_progress' } : o));
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Orientation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track onboarding orientation progress</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: orientations.filter(o => o.status === 'pending').length, color: 'yellow' },
          { label: 'In Progress', value: orientations.filter(o => o.status === 'in_progress').length, color: 'blue' },
          { label: 'Completed', value: orientations.filter(o => o.status === 'completed').length, color: 'green' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className={`text-2xl font-bold mt-2 ${s.color === 'yellow' ? 'text-yellow-600' : s.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {orientations.map(o => (
          <div key={o.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{o.employee}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{o.dept} • Started {o.startDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[o.status]}`}>{o.status.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress: {o.completedTasks}/{o.totalTasks}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round((o.completedTasks / o.totalTasks) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: `${(o.completedTasks / o.totalTasks) * 100}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {orientationTasks.map((task, i) => (
                <button
                  key={i}
                  onClick={() => markTaskComplete(o.id)}
                  disabled={o.completedTasks <= i}
                  className={`p-3 rounded-lg text-xs font-medium transition text-center ${i < o.completedTasks ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200'}`}
                >
                  {i < o.completedTasks ? <CheckCircle className="w-4 h-4 mx-auto mb-1" /> : <Clock className="w-4 h-4 mx-auto mb-1 opacity-40" />}
                  {task}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
