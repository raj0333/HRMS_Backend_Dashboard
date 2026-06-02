import React from 'react';
import { Users, Calendar, DollarSign, FileText, TrendingUp, Clock } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Total Employees', value: '248', icon: Users, color: 'blue', change: '+12 this month' },
    { label: 'Present Today', value: '212', icon: Calendar, color: 'green', change: '85% attendance' },
    { label: 'Total Payroll', value: '$2.4M', icon: DollarSign, color: 'red', change: 'This month' },
    { label: 'Leave Requests', value: '18', icon: FileText, color: 'orange', change: '5 pending' },
  ];

  const recentActivities = [
    { text: 'Rahul Sharma payslip generated for August 2024', time: '2 hours ago', type: 'payroll' },
    { text: 'Priya Singh applied for annual leave', time: '4 hours ago', type: 'leave' },
    { text: 'New employee Mike Johnson onboarded', time: '1 day ago', type: 'employee' },
    { text: 'Payroll processed for Engineering dept', time: '2 days ago', type: 'payroll' },
    { text: 'Attendance report generated for July', time: '3 days ago', type: 'attendance' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colors: Record<string, string> = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            red: 'from-red-500 to-red-600',
            orange: 'from-orange-500 to-orange-600',
          };
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[stat.color]} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{act.text}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Stats</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Average Salary', value: '$9,677', bar: 65 },
              { label: 'Attendance Rate', value: '85%', bar: 85 },
              { label: 'Leave Utilization', value: '42%', bar: 42 },
              { label: 'Onboarding Progress', value: '78%', bar: 78 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all" style={{ width: `${item.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
