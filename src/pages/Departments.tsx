import React, { useState } from 'react';
import { Plus, Building2, X } from 'lucide-react';

const initialDepts = [
  { id: '1', name: 'Engineering', description: 'Software development and technical operations', head: 'Rahul Sharma', employees: 45 },
  { id: '2', name: 'Human Resources', description: 'People management and organizational development', head: 'Priya Singh', employees: 12 },
  { id: '3', name: 'Finance', description: 'Financial planning, accounting, and reporting', head: 'Mike Johnson', employees: 18 },
  { id: '4', name: 'Marketing', description: 'Brand management and customer acquisition', head: 'Anita Patel', employees: 22 },
  { id: '5', name: 'Operations', description: 'Business operations and process management', head: 'David Lee', employees: 30 },
];

export function Departments() {
  const [depts, setDepts] = useState(initialDepts);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', head: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDepts(prev => [...prev, { id: Date.now().toString(), employees: 0, ...form }]);
    setShowModal(false);
    setForm({ name: '', description: '', head: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage organizational structure</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">
          <Plus className="w-5 h-5" /> Add Department
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {depts.map(d => (
          <div key={d.id} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{d.name}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{d.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Head: <span className="font-medium text-gray-900 dark:text-white">{d.head}</span></span>
              <span className="font-semibold text-red-600 dark:text-red-400">{d.employees} employees</span>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Department</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department Head <span className="text-red-500">*</span></label>
                  <input type="text" value={form.head} onChange={e => setForm(f=>({...f,head:e.target.value}))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Brief description of department responsibilities and focus areas..." className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" required />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
