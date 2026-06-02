import React from 'react';
import { Heart } from 'lucide-react';

const balances = [
  { type: 'Annual Leave', total: 21, used: 8, remaining: 13 },
  { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
  { type: 'Casual Leave', total: 7, used: 3, remaining: 4 },
  { type: 'Maternity Leave', total: 90, used: 0, remaining: 90 },
];

export function LeaveBalance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Balance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Your leave entitlements and usage</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {balances.map((b, i) => (
          <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{b.type}</p>
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{b.remaining}</p>
            <p className="text-xs text-gray-500 mt-1">of {b.total} days remaining</p>
            <div className="mt-3 w-full bg-gray-100 dark:bg-dark-700 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-1.5 rounded-full" style={{ width: `${(b.remaining / b.total) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">{b.used} days used</p>
          </div>
        ))}
      </div>
    </div>
  );
}
