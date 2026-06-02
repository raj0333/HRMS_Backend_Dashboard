import React, { useState } from 'react';
import { Plus, X, CheckCircle, Clock, FileText } from 'lucide-react';

const initialOffers = [
  { id: '1', name: 'Alice Johnson', position: 'Senior Developer', dept: 'Engineering', joinDate: '2024-09-15', empId: 'EMP1012', manager: 'Rahul Sharma', email: 'alice@hoshodigital.com', status: 'offer_sent' },
  { id: '2', name: 'Bob Smith', position: 'UI/UX Designer', dept: 'Design', joinDate: '2024-09-20', empId: 'EMP1013', manager: 'Priya Singh', email: 'bob@hoshodigital.com', status: 'accepted' },
  { id: '3', name: 'Carol Davis', position: 'Product Manager', dept: 'Product', joinDate: '2024-10-01', empId: 'EMP1014', manager: 'Mike Johnson', email: 'carol@hoshodigital.com', status: 'pending' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  offer_sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  accepted: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
};

export function PreOnboarding() {
  const [offers, setOffers] = useState(initialOffers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', position: '', dept: '', joinDate: '', empId: '', manager: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOffers(prev => [...prev, { id: Date.now().toString(), ...form, status: 'pending' }]);
    setShowModal(false);
    setForm({ name: '', position: '', dept: '', joinDate: '', empId: '', manager: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pre-Onboarding</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage candidate offers and acceptance</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">
          <Plus className="w-5 h-5" /> Send Offer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: offers.filter(o => o.status === 'pending').length, icon: Clock, color: 'yellow' },
          { label: 'Offer Sent', value: offers.filter(o => o.status === 'offer_sent').length, icon: FileText, color: 'blue' },
          { label: 'Accepted', value: offers.filter(o => o.status === 'accepted').length, icon: CheckCircle, color: 'green' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{s.label}</p>
              <p className={`text-2xl font-bold mt-2 ${s.color === 'yellow' ? 'text-yellow-600' : s.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                {['Candidate Name', 'Employee ID', 'Position', 'Department', 'Email', 'Manager', 'Join Date', 'Status'].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {offers.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{o.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.empId}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.position}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.dept}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">{o.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.manager}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.joinDate}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[o.status]}`}>{o.status.replace('_', ' ').toUpperCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 !m-0">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between py-3 px-6 border-b border-gray-200 dark:border-dark-700 sticky top-0 bg-white dark:bg-dark-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send Offer</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Candidate Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Employee ID <span className="text-red-500">*</span></label>
                  <input type="text" value={form.empId} onChange={e => setForm(f => ({ ...f, empId: e.target.value }))} placeholder="EMP1001" className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Position <span className="text-red-500">*</span></label>
                  <input type="text" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department <span className="text-red-500">*</span></label>
                  <input type="text" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reporting Manager <span className="text-red-500">*</span></label>
                  <input type="text" value={form.manager} onChange={e => setForm(f => ({ ...f, manager: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Join Date <span className="text-red-500">*</span></label>
                  <input type="date" value={form.joinDate} onChange={e => setForm(f => ({ ...f, joinDate: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Official Email ID <span className="text-red-500">*</span></label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@hoshodigital.com" className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">Send Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
