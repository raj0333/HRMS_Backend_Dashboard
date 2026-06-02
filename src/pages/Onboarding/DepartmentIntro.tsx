import React from 'react';
import { Users, Target, Briefcase, CheckCircle } from 'lucide-react';

const departments = [
  { id: '1', name: 'Engineering', head: 'Rahul Sharma', members: 45, intro: 'Build scalable systems and features for our platform', status: 'completed' },
  { id: '2', name: 'Design', head: 'Bob Smith', members: 12, intro: 'Create beautiful and intuitive user experiences', status: 'completed' },
  { id: '3', name: 'Product', head: 'Carol Davis', members: 8, intro: 'Define product vision and strategy', status: 'in_progress' },
  { id: '4', name: 'Marketing', head: 'Alice Johnson', members: 15, intro: 'Drive growth and market awareness', status: 'pending' },
];

export function DepartmentIntro() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Department Introduction</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Get to know each department and team members</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {departments.map(d => (
          <div key={d.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${d.status === 'completed' ? 'bg-green-100 text-green-700' : d.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {d.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{d.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{d.intro}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Head: <span className="font-semibold text-gray-900 dark:text-white">{d.head}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">{d.members}</span> team members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
