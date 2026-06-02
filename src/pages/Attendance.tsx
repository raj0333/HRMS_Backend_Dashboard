import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, X } from 'lucide-react';

const records = [
  { date: '2024-08-26', name: 'Rahul Sharma', checkIn: '09:02', checkOut: '18:05', status: 'present' },
  { date: '2024-08-26', name: 'Priya Singh', checkIn: '08:55', checkOut: '17:58', status: 'present' },
  { date: '2024-08-26', name: 'Mike Johnson', checkIn: '—', checkOut: '—', status: 'absent' },
  { date: '2024-08-26', name: 'Anita Patel', checkIn: '09:30', checkOut: '13:30', status: 'half_day' },
];

const colors: Record<string, string> = {
  present: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  absent: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  half_day: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export function Attendance() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', checkIn: '', checkOut: '', status: 'present' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setForm({ date: '', checkIn: '', checkOut: '', status: 'present' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track daily attendance records</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg transition hover:from-red-600 hover:to-red-800">
          <CheckCircle className="w-5 h-5" /> Mark Attendance
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Present Today',value:'212',icon:CheckCircle,color:'green'},{label:'Absent',value:'36',icon:Calendar,color:'red'},{label:'Half Day',value:'8',icon:Clock,color:'yellow'}].map((s,i)=>{
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color==='green'?'text-green-600':s.color==='red'?'text-red-600':'text-yellow-600'}`}>{s.value}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                {['Date','Employee','Check In','Check Out','Status'].map(h=><th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {records.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{r.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{r.checkIn}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{r.checkOut}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[r.status]}`}>{r.status.replace('_',' ').toUpperCase()}</span></td>
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mark Attendance</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date <span className="text-red-500">*</span></label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:dark:white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status <span className="text-red-500">*</span></label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="half_day">Half Day</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Check In</label>
                  <input type="time" value={form.checkIn} onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Check Out</label>
                  <input type="time" value={form.checkOut} onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:[color-scheme:dark]" />
                </div>
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
