import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const initialLeaves = [
  { id: '1', employee: 'Rahul Sharma', type: 'Annual Leave', from: '2024-08-20', to: '2024-08-22', days: 3, status: 'approved', reason: 'Family vacation' },
  { id: '2', employee: 'Priya Singh', type: 'Sick Leave', from: '2024-08-15', to: '2024-08-16', days: 2, status: 'approved', reason: 'Medical appointment' },
  { id: '3', employee: 'Mike Johnson', type: 'Casual Leave', from: '2024-08-28', to: '2024-08-28', days: 1, status: 'pending', reason: 'Personal work' },
  { id: '4', employee: 'Anita Patel', type: 'Annual Leave', from: '2024-09-02', to: '2024-09-06', days: 5, status: 'pending', reason: 'Travel' },
];

const statusColors: Record<string, string> = {
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export function Leaves() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'Annual Leave', from: '', to: '', reason: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaves(prev => [...prev, { id: Date.now().toString(), employee: 'Current User', ...form, days: 1, status: 'pending' }]);
    setShowModal(false);
    setForm({ type: 'Annual Leave', from: '', to: '', reason: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage leave requests</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">
          <Plus className="w-5 h-5" /> Apply Leave
        </button>
      </div>
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                {['Employee','Type','From','To','Days','Status','Reason'].map(h=><th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {leaves.map(l=>(
                <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{l.employee}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{l.type}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{l.from}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{l.to}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{l.days}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[l.status]}`}>{l.status.toUpperCase()}</span></td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">{l.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 !m-0">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Apply for Leave</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Leave Type <span className="text-red-500">*</span></label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                    {['Annual Leave','Sick Leave','Casual Leave','Maternity Leave','Paternity Leave'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                  <select disabled className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 focus:outline-none cursor-not-allowed opacity-50">
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">From <span className="text-red-500">*</span></label>
                  <input type="date" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:dark:white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">To <span className="text-red-500">*</span></label>
                  <input type="date" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:dark:white" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason <span className="text-red-500">*</span></label>
                <textarea value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} rows={3} placeholder="Explain the reason for your leave request..." className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" required />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
