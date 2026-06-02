import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const initialProbation = [
  { id: '1', employee: 'Bob Smith', dept: 'Design', startDate: '2024-09-20', endDate: '2024-12-20', daysLeft: 62, reviews: [{ month: 'Sep', rating: 4, feedback: 'Good start, needs to improve on deadlines' }, { month: 'Oct', rating: 4.5, feedback: 'Excellent progress on project X' }], status: 'in_progress' },
  { id: '2', employee: 'Carol Davis', dept: 'Product', startDate: '2024-10-01', endDate: '2025-01-01', daysLeft: 82, reviews: [], status: 'in_progress' },
  { id: '3', employee: 'Rahul Sharma', dept: 'Engineering', startDate: '2024-05-15', endDate: '2024-08-15', daysLeft: 0, reviews: [{ month: 'May', rating: 5, feedback: 'Excellent performance' }, { month: 'Jun', rating: 5, feedback: 'Strong technical skills' }, { month: 'Jul', rating: 5, feedback: 'Ready for confirmation' }], status: 'completed' },
];

export function Probation() {
  const [probations] = useState(initialProbation);

  const statusColors: Record<string, string> = {
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Probation Period</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor probation periods and performance reviews</p>
      </div>

      <div className="space-y-4">
        {probations.map(p => (
          <div key={p.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{p.employee}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.dept} • Started {p.startDate}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold block mb-2 ${statusColors[p.status]}`}>{p.status.replace('_', ' ').toUpperCase()}</span>
                {p.status === 'in_progress' && (
                  <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {p.daysLeft} days left
                  </div>
                )}
                {p.status === 'completed' && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Confirmed
                  </div>
                )}
              </div>
            </div>

            {p.reviews.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Performance Reviews</h4>
                {p.reviews.map((review, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{review.month} Review</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={`text-sm ${j < review.rating ? '⭐' : '☆'}`}>★</span>
                        ))}
                        <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{review.feedback}</p>
                  </div>
                ))}
              </div>
            )}

            {p.reviews.length === 0 && p.status === 'in_progress' && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-yellow-700 dark:text-yellow-400">No reviews recorded yet. Schedule the first review.</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
