import React, { useState } from 'react';
import { CheckCircle, Award, Trophy, Calendar } from 'lucide-react';

const initialConfirmations = [
  { id: '1', employee: 'Bob Smith', dept: 'Design', startDate: '2024-09-20', confirmDate: '2024-12-20', score: 92, status: 'confirmed', benefits: ['Health Insurance', '5% Salary Hike', 'Annual Bonus Eligible'] },
  { id: '2', employee: 'Carol Davis', dept: 'Product', startDate: '2024-10-01', confirmDate: null, score: 0, status: 'pending', benefits: [] },
  { id: '3', employee: 'Rahul Sharma', dept: 'Engineering', startDate: '2024-05-15', confirmDate: '2024-08-15', score: 95, status: 'confirmed', benefits: ['Health Insurance', '7% Salary Hike', 'Annual Bonus Eligible', 'Promotion Track Initiated'] },
];

export function Confirmation() {
  const [confirmations] = useState(initialConfirmations);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Confirmation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Confirm employees after probation period completion</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Employees', value: confirmations.length, color: 'blue' },
          { label: 'Confirmed', value: confirmations.filter(c => c.status === 'confirmed').length, color: 'green' },
          { label: 'Pending', value: confirmations.filter(c => c.status === 'pending').length, color: 'yellow' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className={`text-2xl font-bold mt-2 ${s.color === 'yellow' ? 'text-yellow-600' : s.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {confirmations.map(c => (
          <div key={c.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{c.employee}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.dept} • Joined {c.startDate}</p>
              </div>
              {c.status === 'confirmed' ? (
                <div className="text-right">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-semibold mb-2">
                    <CheckCircle className="w-4 h-4" />
                    CONFIRMED
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Performance: {c.score}/100</p>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs font-semibold">PENDING</span>
              )}
            </div>

            {c.status === 'confirmed' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-900/30">
                <div className="flex items-start gap-3 mb-4">
                  <Trophy className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Confirmation Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {c.benefits.map((benefit, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-dark-700 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-900/30">{benefit}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                  <Calendar className="w-4 h-4" />
                  Confirmed on {c.confirmDate}
                </div>
              </div>
            )}

            {c.status === 'pending' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900/30">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">Complete probation period to confirm employee and unlock confirmation benefits.</p>
              </div>
            )}

            {c.status === 'confirmed' && (
              <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Performance Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: `${c.score}%` }} />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{c.score}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
