import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Square, Pause, RotateCcw } from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  day: string;
  in: string;
  out: string;
  total: string;
  type: 'Regular' | 'Overtime';
  totalMinutes: number;
}

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getDayName = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatElapsed = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatTotalHours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export function WorkingHours() {
  const [entries, setEntries] = useState<TimeEntry[]>(() => {
    const stored = localStorage.getItem('hrms_timesheet');
    if (stored) return JSON.parse(stored);
    return [
      { id: '1', date: '2024-08-26', day: 'Monday', in: '09:02', out: '18:05', total: '9h 3m', type: 'Regular', totalMinutes: 543 },
      { id: '2', date: '2024-08-27', day: 'Tuesday', in: '08:55', out: '17:58', total: '9h 3m', type: 'Regular', totalMinutes: 543 },
      { id: '3', date: '2024-08-28', day: 'Wednesday', in: '09:15', out: '20:00', total: '10h 45m', type: 'Overtime', totalMinutes: 645 },
      { id: '4', date: '2024-08-29', day: 'Thursday', in: '09:00', out: '18:00', total: '9h 0m', type: 'Regular', totalMinutes: 540 },
      { id: '5', date: '2024-08-30', day: 'Friday', in: '09:10', out: '17:30', total: '8h 20m', type: 'Regular', totalMinutes: 500 },
    ];
  });

  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pauseStart, setPauseStart] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    localStorage.setItem('hrms_timesheet', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (isClockedIn && !isPaused && clockInTime) {
      timerRef.current = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime() - pausedDuration;
        setElapsed(diff > 0 ? diff : 0);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isClockedIn, isPaused, clockInTime, pausedDuration]);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
    setIsPaused(false);
    setPausedDuration(0);
    setElapsed(0);
  };

  const handlePause = () => {
    if (isPaused && pauseStart) {
      const pausedMs = new Date().getTime() - pauseStart.getTime();
      setPausedDuration(prev => prev + pausedMs);
      setPauseStart(null);
      setIsPaused(false);
    } else {
      setPauseStart(new Date());
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleClockOut = () => {
    if (!clockInTime) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const now = new Date();
    const totalMs = now.getTime() - clockInTime.getTime() - pausedDuration;
    const totalMinutes = Math.round(totalMs / 60000);
    const entryType = totalMinutes > 540 ? 'Overtime' : 'Regular';

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      date: formatDate(clockInTime),
      day: getDayName(clockInTime),
      in: formatTime(clockInTime),
      out: formatTime(now),
      total: formatTotalHours(totalMinutes),
      type: entryType,
      totalMinutes,
    };

    setEntries(prev => [newEntry, ...prev]);
    setIsClockedIn(false);
    setIsPaused(false);
    setClockInTime(null);
    setPausedDuration(0);
    setPauseStart(null);
    setElapsed(0);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsClockedIn(false);
    setIsPaused(false);
    setClockInTime(null);
    setPausedDuration(0);
    setPauseStart(null);
    setElapsed(0);
  };

  const todayTotal = entries
    .filter(e => e.date === formatDate(new Date()))
    .reduce((sum, e) => sum + e.totalMinutes, 0);

  const weekTotal = entries
    .filter(e => {
      const entryDate = new Date(e.date);
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      return entryDate >= weekStart;
    })
    .reduce((sum, e) => sum + e.totalMinutes, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Working Hours</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your time and attendance</p>
        </div>
      </div>

      {/* Time Tracker Card */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Timer Display */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {isClockedIn ? (isPaused ? 'Paused' : 'Running') : 'Ready to clock in'}
            </p>
            <p className={`text-5xl font-bold tabular-nums tracking-wider ${isClockedIn ? (isPaused ? 'text-yellow-500' : 'text-gray-900 dark:text-white') : 'text-gray-400 dark:text-gray-500'}`}>
              {formatElapsed(elapsed)}
            </p>
            {clockInTime && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Clocked in at {formatTime(clockInTime)}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {!isClockedIn ? (
              <button
                onClick={handleClockIn}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition shadow-lg shadow-red-500/25"
              >
                <Play className="w-5 h-5" />
                Clock In
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-lg transition ${
                    isPaused
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={handleClockOut}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-800 transition shadow-lg shadow-red-500/25"
                >
                  <Square className="w-5 h-5" />
                  Clock Out
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatTotalHours(todayTotal)}</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatTotalHours(weekTotal)}</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overtime Hours</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {formatTotalHours(entries.filter(e => e.type === 'Overtime').reduce((s, e) => s + e.totalMinutes, 0))}
          </p>
        </div>
      </div>

      {/* Timesheet Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                {['Date','Day','Clock In','Clock Out','Total Hours','Type'].map(h=><th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {entries.map((t)=>(
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.day}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t.in}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t.out}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{t.total}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.type==='Overtime'?'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400':'bg-gray-100 text-gray-600 dark:bg-dark-600 dark:text-gray-600'}`}>{t.type}</span></td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No entries yet. Clock in to start tracking.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
