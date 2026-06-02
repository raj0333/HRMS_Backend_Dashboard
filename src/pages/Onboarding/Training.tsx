import React, { useState } from 'react';
import { CheckCircle, BookOpen, Clock, Award } from 'lucide-react';

const initialTraining = [
  { id: '1', employee: 'Bob Smith', courses: [{ name: 'Company Policies', completed: true }, { name: 'Security Training', completed: true }, { name: 'Product Overview', completed: false }, { name: 'Advanced Features', completed: false }], status: 'in_progress' },
  { id: '2', employee: 'Carol Davis', courses: [{ name: 'Company Policies', completed: false }, { name: 'Security Training', completed: false }, { name: 'Product Overview', completed: false }, { name: 'Advanced Features', completed: false }], status: 'pending' },
  { id: '3', employee: 'Rahul Sharma', courses: [{ name: 'Company Policies', completed: true }, { name: 'Security Training', completed: true }, { name: 'Product Overview', completed: true }, { name: 'Advanced Features', completed: true }], status: 'completed' },
];

export function Training() {
  const [training, setTraining] = useState(initialTraining);

  const toggleCourse = (empId: string, courseName: string) => {
    setTraining(prev => prev.map(t => t.id === empId ? {
      ...t,
      courses: t.courses.map(c => c.name === courseName ? { ...c, completed: !c.completed } : c),
      status: t.courses.every(c => c.completed) ? 'completed' : 'in_progress'
    } : t));
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training & Access</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage employee training programs and system access</p>
      </div>

      <div className="space-y-4">
        {training.map(t => {
          const completedCount = t.courses.filter(c => c.completed).length;
          return (
            <div key={t.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">{t.employee}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[t.status]}`}>{t.status.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Completed: {completedCount}/{t.courses.length}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round((completedCount / t.courses.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: `${(completedCount / t.courses.length) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {t.courses.map((course, i) => (
                  <button
                    key={i}
                    onClick={() => toggleCourse(t.id, course.name)}
                    className={`p-3 rounded-lg text-xs font-medium transition text-center ${course.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                  >
                    {course.completed ? <CheckCircle className="w-4 h-4 mx-auto mb-1" /> : <BookOpen className="w-4 h-4 mx-auto mb-1 opacity-40" />}
                    {course.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
