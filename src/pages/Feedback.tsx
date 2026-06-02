import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const feedbacks = [
  { id: '1', subject: 'Workplace Environment', message: 'The office environment is very comfortable and productive.', date: '2024-08-10', status: 'reviewed' },
  { id: '2', subject: 'Team Collaboration', message: 'Great teamwork across departments this quarter.', date: '2024-08-05', status: 'pending' },
];

export function Feedback() {
  const [list, setList] = useState(feedbacks);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setList(prev => [{ id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0], status: 'pending' }, ...prev]);
    setForm({ subject: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Share your thoughts and suggestions</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Submit Feedback</h2>
          {submitted && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">Feedback submitted successfully!</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" required />
            </div>
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">
              <Send className="w-4 h-4" /> Submit
            </button>
          </form>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Feedback History</h2>
          <div className="space-y-4">
            {list.map(f => (
              <div key={f.id} className="p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{f.subject}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{f.status}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.message}</p>
                <p className="text-xs text-gray-400 mt-2">{f.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
