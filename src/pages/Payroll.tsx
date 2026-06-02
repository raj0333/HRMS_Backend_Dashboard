import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Download, FileText, Plus, DollarSign, Search, X, CheckCircle,
  Clock, CreditCard, Wallet, ChevronDown, ChevronUp, Eye, RefreshCw
} from 'lucide-react';
import { PayrollRecord } from '../types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DEPARTMENTS = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations'];

const EMPLOYEES = [
  { id: 'EMP1001', name: 'Rahul Sharma', department: 'Engineering' },
  { id: 'EMP1002', name: 'Priya Singh', department: 'Human Resources' },
  { id: 'EMP1003', name: 'Mike Johnson', department: 'Finance' },
  { id: 'EMP1004', name: 'Anita Patel', department: 'Marketing' },
  { id: 'EMP1005', name: 'David Lee', department: 'Engineering' },
];

const initialPayroll: PayrollRecord[] = [
  {
    id: '1', employeeId: 'EMP1001', employeeName: 'Rahul Sharma', department: 'Engineering',
    month: 'August 2024', baseSalary: 50000, hra: 20000, da: 5000,
    medicalAllowance: 1250, transportAllowance: 1600, otherAllowances: 0,
    pfDeduction: 1800, taxDeduction: 5000, loanDeduction: 0, otherDeductions: 200,
    performanceBonus: 2000, festivalBonus: 0, overtimePay: 0,
    grossSalary: 77850, totalDeductions: 7000, netSalary: 70850,
    status: 'paid', processedDate: '2024-08-28', paidDate: '2024-08-31',
  },
  {
    id: '2', employeeId: 'EMP1002', employeeName: 'Priya Singh', department: 'Human Resources',
    month: 'August 2024', baseSalary: 60000, hra: 24000, da: 6000,
    medicalAllowance: 1250, transportAllowance: 1600, otherAllowances: 500,
    pfDeduction: 2160, taxDeduction: 7000, loanDeduction: 0, otherDeductions: 0,
    performanceBonus: 3000, festivalBonus: 0, overtimePay: 0,
    grossSalary: 93350, totalDeductions: 9160, netSalary: 84190,
    status: 'processed', processedDate: '2024-08-28',
  },
  {
    id: '3', employeeId: 'EMP1003', employeeName: 'Mike Johnson', department: 'Finance',
    month: 'August 2024', baseSalary: 45000, hra: 18000, da: 4500,
    medicalAllowance: 1250, transportAllowance: 1600, otherAllowances: 0,
    pfDeduction: 1620, taxDeduction: 3500, loanDeduction: 2000, otherDeductions: 0,
    performanceBonus: 1500, festivalBonus: 0, overtimePay: 500,
    grossSalary: 70350, totalDeductions: 7120, netSalary: 63230,
    status: 'pending',
  },
  {
    id: '4', employeeId: 'EMP1004', employeeName: 'Anita Patel', department: 'Marketing',
    month: 'August 2024', baseSalary: 55000, hra: 22000, da: 5500,
    medicalAllowance: 1250, transportAllowance: 1600, otherAllowances: 1000,
    pfDeduction: 1980, taxDeduction: 6000, loanDeduction: 0, otherDeductions: 0,
    performanceBonus: 4000, festivalBonus: 0, overtimePay: 0,
    grossSalary: 85350, totalDeductions: 7980, netSalary: 77370,
    status: 'pending',
  },
  {
    id: '5', employeeId: 'EMP1005', employeeName: 'David Lee', department: 'Engineering',
    month: 'August 2024', baseSalary: 38000, hra: 15200, da: 3800,
    medicalAllowance: 1250, transportAllowance: 1600, otherAllowances: 0,
    pfDeduction: 1368, taxDeduction: 2500, loanDeduction: 3000, otherDeductions: 0,
    performanceBonus: 1000, festivalBonus: 0, overtimePay: 1200,
    grossSalary: 60050, totalDeductions: 6868, netSalary: 53182,
    status: 'paid', processedDate: '2024-08-28', paidDate: '2024-08-31',
  },
];

type ModalMode = 'process' | 'salary' | 'view' | null;

interface ProcessForm {
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  year: string;
  baseSalary: string;
  hra: string;
  da: string;
  medicalAllowance: string;
  transportAllowance: string;
  otherAllowances: string;
  pfDeduction: string;
  taxDeduction: string;
  loanDeduction: string;
  otherDeductions: string;
  performanceBonus: string;
  festivalBonus: string;
  overtimePay: string;
  remarks: string;
}

const defaultForm: ProcessForm = {
  employeeId: '', employeeName: '', department: '',
  month: 'August', year: '2024',
  baseSalary: '', hra: '', da: '',
  medicalAllowance: '1250', transportAllowance: '1600', otherAllowances: '0',
  pfDeduction: '', taxDeduction: '', loanDeduction: '0', otherDeductions: '0',
  performanceBonus: '0', festivalBonus: '0', overtimePay: '0',
  remarks: '',
};

function calcGross(f: ProcessForm) {
  return (
    Number(f.baseSalary || 0) +
    Number(f.hra || 0) +
    Number(f.da || 0) +
    Number(f.medicalAllowance || 0) +
    Number(f.transportAllowance || 0) +
    Number(f.otherAllowances || 0) +
    Number(f.performanceBonus || 0) +
    Number(f.festivalBonus || 0) +
    Number(f.overtimePay || 0)
  );
}

function calcDeductions(f: ProcessForm) {
  return (
    Number(f.pfDeduction || 0) +
    Number(f.taxDeduction || 0) +
    Number(f.loanDeduction || 0) +
    Number(f.otherDeductions || 0)
  );
}

export function Payroll() {
  const location = useLocation();
  const [payroll, setPayroll] = useState<PayrollRecord[]>(initialPayroll);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [viewRecord, setViewRecord] = useState<PayrollRecord | null>(null);
  const [form, setForm] = useState<ProcessForm>(defaultForm);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'process') setModalMode('process');
    else if (action === 'salary') setModalMode('salary');
  }, [location.search]);

  const gross = calcGross(form);
  const deductions = calcDeductions(form);
  const net = gross - deductions;

  const handleEmployeeSelect = (empId: string) => {
    const emp = EMPLOYEES.find(e => e.id === empId);
    if (emp) {
      const base = { EMP1001: 50000, EMP1002: 60000, EMP1003: 45000, EMP1004: 55000, EMP1005: 38000 }[empId] || 0;
      const hraAmt = Math.round(base * 0.4);
      const daAmt = Math.round(base * 0.1);
      const pfAmt = Math.round(base * 0.036);
      const taxAmt = Math.round(base * 0.1);
      setForm(f => ({
        ...f,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        baseSalary: String(base),
        hra: String(hraAmt),
        da: String(daAmt),
        pfDeduction: String(pfAmt),
        taxDeduction: String(taxAmt),
      }));
    }
  };

  const handleSubmitPayroll = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PayrollRecord = {
      id: Date.now().toString(),
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      department: form.department,
      month: `${form.month} ${form.year}`,
      baseSalary: Number(form.baseSalary),
      hra: Number(form.hra),
      da: Number(form.da),
      medicalAllowance: Number(form.medicalAllowance),
      transportAllowance: Number(form.transportAllowance),
      otherAllowances: Number(form.otherAllowances),
      pfDeduction: Number(form.pfDeduction),
      taxDeduction: Number(form.taxDeduction),
      loanDeduction: Number(form.loanDeduction),
      otherDeductions: Number(form.otherDeductions),
      performanceBonus: Number(form.performanceBonus),
      festivalBonus: Number(form.festivalBonus),
      overtimePay: Number(form.overtimePay),
      grossSalary: gross,
      totalDeductions: deductions,
      netSalary: net,
      status: 'processed',
      processedDate: new Date().toISOString().split('T')[0],
      remarks: form.remarks,
    };
    setPayroll(prev => [newRecord, ...prev]);
    setModalMode(null);
    setForm(defaultForm);
    setSuccessMsg('Payroll processed successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const markAsPaid = (id: string) => {
    setPayroll(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'paid', paidDate: new Date().toISOString().split('T')[0] } : p
    ));
    setSuccessMsg('Payroll marked as paid!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const markAsProcessed = (id: string) => {
    setPayroll(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'processed', processedDate: new Date().toISOString().split('T')[0] } : p
    ));
    setSuccessMsg('Payroll processed!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDownloadPayslip = (record: PayrollRecord) => {
    const content = `
PAYSLIP
=======
Employee: ${record.employeeName} (${record.employeeId})
Department: ${record.department}
Month: ${record.month}
Status: ${record.status.toUpperCase()}

EARNINGS
--------
Base Salary:          $${record.baseSalary.toLocaleString()}
HRA:                  $${record.hra.toLocaleString()}
DA:                   $${record.da.toLocaleString()}
Medical Allowance:    $${record.medicalAllowance.toLocaleString()}
Transport Allowance:  $${record.transportAllowance.toLocaleString()}
Other Allowances:     $${record.otherAllowances.toLocaleString()}
Performance Bonus:    $${record.performanceBonus.toLocaleString()}
Festival Bonus:       $${record.festivalBonus.toLocaleString()}
Overtime Pay:         $${record.overtimePay.toLocaleString()}
GROSS SALARY:         $${record.grossSalary.toLocaleString()}

DEDUCTIONS
----------
PF Deduction:         $${record.pfDeduction.toLocaleString()}
Tax Deduction:        $${record.taxDeduction.toLocaleString()}
Loan Deduction:       $${record.loanDeduction.toLocaleString()}
Other Deductions:     $${record.otherDeductions.toLocaleString()}
TOTAL DEDUCTIONS:     $${record.totalDeductions.toLocaleString()}

NET SALARY:           $${record.netSalary.toLocaleString()}
${record.processedDate ? `\nProcessed: ${record.processedDate}` : ''}
${record.paidDate ? `Paid: ${record.paidDate}` : ''}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip_${record.employeeId}_${record.month.replace(' ', '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = payroll.filter(p => {
    const matchSearch = p.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      p.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      p.month.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchDept = filterDept === 'all' || p.department === filterDept;
    return matchSearch && matchStatus && matchDept;
  });

  const totalPayroll = payroll.reduce((s, p) => s + p.netSalary, 0);
  const avgSalary = payroll.length ? Math.round(totalPayroll / payroll.length) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'processed': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payroll Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Process and manage employee salaries</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setModalMode('salary'); setForm(defaultForm); }}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition"
          >
            <Wallet className="w-5 h-5" />
            Salary Structure
          </button>
          <button
            onClick={() => { setModalMode('process'); setForm(defaultForm); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg transition shadow-lg shadow-red-500/25"
          >
            <Plus className="w-5 h-5" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Payroll', value: `$${totalPayroll.toLocaleString()}`, icon: DollarSign, color: 'red', sub: 'This month' },
          { label: 'Processed', value: payroll.filter(p => p.status === 'processed').length, icon: CreditCard, color: 'blue', sub: 'Records' },
          { label: 'Pending', value: payroll.filter(p => p.status === 'pending').length, icon: Clock, color: 'orange', sub: 'Awaiting' },
          { label: 'Avg Salary', value: `$${avgSalary.toLocaleString()}`, icon: DollarSign, color: 'green', sub: 'Per employee' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          const textColors: Record<string, string> = {
            red: 'text-red-600 dark:text-red-400',
            blue: 'text-blue-600 dark:text-blue-400',
            orange: 'text-orange-600 dark:text-orange-400',
            green: 'text-green-600 dark:text-green-400',
          };
          const iconColors: Record<string, string> = {
            red: 'text-red-300',
            blue: 'text-blue-300',
            orange: 'text-orange-300',
            green: 'text-green-300',
          };
          return (
            <div key={idx} className="bg-white dark:bg-dark-800 rounded-xl p-5 border border-gray-200 dark:border-dark-700 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${textColors[stat.color]}`}>{stat.value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.sub}</p>
                </div>
                <Icon className={`w-9 h-9 opacity-30 ${iconColors[stat.color]}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search employee, ID or month..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processed">Processed</option>
            <option value="paid">Paid</option>
          </select>
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
                <th className="w-10 px-4 py-3" />
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Month</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Base</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Gross</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Deductions</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
              {filtered.map(record => (
                <React.Fragment key={record.id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleRow(record.id)}
                        className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                      >
                        {expandedRows.has(record.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{record.employeeName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{record.employeeId} · {record.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{record.month}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">${record.baseSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-medium text-green-600 dark:text-green-400">${record.grossSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-medium text-red-600 dark:text-red-400">-${record.totalDeductions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white text-lg">${record.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                        {record.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setViewRecord(record); setModalMode('view'); }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {record.status === 'pending' && (
                          <button
                            onClick={() => markAsProcessed(record.id)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                            title="Mark as processed"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        {record.status === 'processed' && (
                          <button
                            onClick={() => markAsPaid(record.id)}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                            title="Mark as paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDownloadPayslip(record)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          title="Download payslip"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded row - breakdown */}
                  {expandedRows.has(record.id) && (
                    <tr className="bg-gray-50 dark:bg-dark-700/50">
                      <td colSpan={9} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">Earnings</h4>
                            <div className="space-y-1.5 text-sm">
                              {[
                                ['Base Salary', record.baseSalary],
                                ['HRA', record.hra],
                                ['DA', record.da],
                                ['Medical Allowance', record.medicalAllowance],
                                ['Transport Allowance', record.transportAllowance],
                                record.otherAllowances > 0 && ['Other Allowances', record.otherAllowances],
                                record.performanceBonus > 0 && ['Performance Bonus', record.performanceBonus],
                                record.festivalBonus > 0 && ['Festival Bonus', record.festivalBonus],
                                record.overtimePay > 0 && ['Overtime Pay', record.overtimePay],
                              ].filter(Boolean).map((item, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">{(item as [string, number])[0]}</span>
                                  <span className="font-medium text-gray-900 dark:text-white">${((item as [string, number])[1]).toLocaleString()}</span>
                                </div>
                              ))}
                              <div className="flex justify-between border-t border-green-200 dark:border-green-900/30 pt-1.5 mt-2 font-bold">
                                <span className="text-green-700 dark:text-green-400">Gross Total</span>
                                <span className="text-green-700 dark:text-green-400">${record.grossSalary.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">Deductions</h4>
                            <div className="space-y-1.5 text-sm">
                              {[
                                ['PF Deduction', record.pfDeduction],
                                ['Tax Deduction', record.taxDeduction],
                                record.loanDeduction > 0 && ['Loan Deduction', record.loanDeduction],
                                record.otherDeductions > 0 && ['Other Deductions', record.otherDeductions],
                              ].filter(Boolean).map((item, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">{(item as [string, number])[0]}</span>
                                  <span className="font-medium text-red-600 dark:text-red-400">-${((item as [string, number])[1]).toLocaleString()}</span>
                                </div>
                              ))}
                              <div className="flex justify-between border-t border-red-200 dark:border-red-900/30 pt-1.5 mt-2 font-bold">
                                <span className="text-red-700 dark:text-red-400">Total Deductions</span>
                                <span className="text-red-700 dark:text-red-400">-${record.totalDeductions.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                                <p className="text-gray-500 text-xs">Net Salary</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">${record.netSalary.toLocaleString()}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Status</span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>{record.status.toUpperCase()}</span>
                                </div>
                                {record.processedDate && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Processed</span>
                                    <span className="text-gray-700 dark:text-gray-300">{record.processedDate}</span>
                                  </div>
                                )}
                                {record.paidDate && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Paid Date</span>
                                    <span className="text-gray-700 dark:text-gray-300">{record.paidDate}</span>
                                  </div>
                                )}
                                {record.remarks && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Remarks</span>
                                    <span className="text-gray-700 dark:text-gray-300">{record.remarks}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">No payroll records found</p>
          </div>
        )}
      </div>

      {/* Salary Components Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Salary Components Guide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { title: 'Base Salary', desc: 'Fixed monthly compensation' },
            { title: 'HRA (40%)', desc: 'House Rent Allowance' },
            { title: 'DA (10%)', desc: 'Dearness Allowance' },
            { title: 'PF (3.6%)', desc: 'Provident Fund deduction' },
          ].map((c, i) => (
            <div key={i}>
              <p className="text-blue-700 dark:text-blue-400 font-semibold">{c.title}</p>
              <p className="text-blue-900 dark:text-blue-200 mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Payroll Modal */}
      {modalMode === 'process' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-0 !m-0 overflow-y-auto">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-3xl my-3">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Process Payroll</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Fill in the details to generate payroll</p>
              </div>
              <button onClick={() => setModalMode(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmitPayroll} className="p-6">
              {/* Employee & Period */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">Employee & Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Select Employee <span className="text-red-500">*</span></label>
                    <select
                      value={form.employeeId}
                      onChange={e => handleEmployeeSelect(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select employee...</option>
                      {EMPLOYEES.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Month <span className="text-red-500">*</span></label>
                    <select
                      value={form.month}
                      onChange={e => setForm(f => ({ ...f, month: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      {MONTHS.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Year <span className="text-red-500">*</span></label>
                    <select
                      value={form.year}
                      onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {['2022', '2023', '2024', '2025', '2026'].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                {form.employeeName && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">{form.employeeName}</span> · {form.department}
                  </div>
                )}
              </div>

              {/* Earnings */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-4">Earnings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ['Base Salary', 'baseSalary', true],
                    ['HRA', 'hra', true],
                    ['DA', 'da', false],
                    ['Medical Allowance', 'medicalAllowance', false],
                    ['Transport Allowance', 'transportAllowance', false],
                    ['Other Allowances', 'otherAllowances', false],
                    ['Performance Bonus', 'performanceBonus', false],
                    ['Festival Bonus', 'festivalBonus', false],
                    ['Overtime Pay', 'overtimePay', false],
                  ].map(([label, key, required]) => (
                    <div key={key as string}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label as string} {required && <span className="text-red-500">*</span>}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          min="0"
                          value={(form as any)[key as string]}
                  // If there's a date picker icon associated with this input,
                  // ensure its color adapts to dark mode.
                  // For example, if it's an SVG, ensure its fill/stroke is 'currentColor'
                  // and the surrounding text color is set with dark mode classes (e.g., dark:text-white).
                  // If it's a custom icon, apply appropriate dark mode text color classes.
                          onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))}
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          required={required as boolean}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deductions */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-4">Deductions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ['PF Deduction', 'pfDeduction', true],
                    ['Tax Deduction', 'taxDeduction', true],
                    ['Loan Deduction', 'loanDeduction', false],
                    ['Other Deductions', 'otherDeductions', false],
                  ].map(([label, key, required]) => (
                    <div key={key as string}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label as string} {required && <span className="text-red-500">*</span>}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          min="0"
                          value={(form as any)[key as string]}
                          onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))}
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          required={required as boolean}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Remarks (Optional)</label>
                <input
                  type="text"
                  value={form.remarks}
                  onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))}
                  placeholder="Add any notes..."
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Live Summary */}
              {form.employeeId && (
                <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-700 rounded-xl border border-gray-200 dark:border-dark-600">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">Live Calculation Summary</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gross Earnings</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">${gross.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Deductions</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">-${deductions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Net Salary</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${net.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-3 border border-gray-300 dark:border-dark-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-xl transition shadow-lg shadow-red-500/25"
                >
                  Add With Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Salary Structure Modal */}
      {modalMode === 'salary' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 !m-0">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl  max-h-[500px] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Salary Structure</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Standard salary component breakdown</p>
              </div>
              <button onClick={() => setModalMode(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { category: 'Earnings', color: 'green', items: [
                  { name: 'Base Salary', desc: 'Fixed monthly compensation', pct: '100%' },
                  { name: 'HRA (House Rent)', desc: 'House Rent Allowance', pct: '40% of Base' },
                  { name: 'DA (Dearness)', desc: 'Dearness Allowance', pct: '10% of Base' },
                  { name: 'Medical Allowance', desc: 'Medical benefit', pct: '$1,250 fixed' },
                  { name: 'Transport Allowance', desc: 'Commute benefit', pct: '$1,600 fixed' },
                  { name: 'Performance Bonus', desc: 'Based on performance review', pct: 'Variable' },
                ]},
                { category: 'Deductions', color: 'red', items: [
                  { name: 'PF (Provident Fund)', desc: 'Employee PF contribution', pct: '3.6% of Base' },
                  { name: 'Income Tax', desc: 'TDS based on income slab', pct: '10-30% variable' },
                  { name: 'Loan EMI', desc: 'Employee loan repayment', pct: 'As applicable' },
                ]},
              ].map(section => (
                <div key={section.category}>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${section.color === 'green' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{section.category}</h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-600">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-dark-700">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Component</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Description</th>
                          <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                        {section.items.map((item, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white text-sm">{item.name}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">{item.desc}</td>
                            <td className={`px-4 py-3 text-right font-semibold text-sm ${section.color === 'green' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{item.pct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <button onClick={() => setModalMode(null)} className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-800 transition">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* View Payslip Modal */}
      {modalMode === 'view' && viewRecord && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 !m-0 overflow-y-auto">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[500px] overflow-y-scroll">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payslip Details</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{viewRecord.month}</p>
              </div>
              <button onClick={() => { setModalMode(null); setViewRecord(null); }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Employee Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                  {viewRecord.employeeName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{viewRecord.employeeName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{viewRecord.employeeId} · {viewRecord.department}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(viewRecord.status)}`}>{viewRecord.status.toUpperCase()}</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">Earnings</h4>
                  <div className="space-y-1.5 text-sm">
                    {[
                      ['Base', viewRecord.baseSalary],
                      ['HRA', viewRecord.hra],
                      ['DA', viewRecord.da],
                      ['Medical', viewRecord.medicalAllowance],
                      ['Transport', viewRecord.transportAllowance],
                      viewRecord.otherAllowances > 0 && ['Other Allow.', viewRecord.otherAllowances],
                      viewRecord.performanceBonus > 0 && ['Perf. Bonus', viewRecord.performanceBonus],
                      viewRecord.festivalBonus > 0 && ['Festival Bonus', viewRecord.festivalBonus],
                      viewRecord.overtimePay > 0 && ['Overtime', viewRecord.overtimePay],
                    ].filter(Boolean).map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-500">{(item as [string, number])[0]}</span>
                        <span className="font-medium text-gray-900 dark:text-white">${((item as [string, number])[1]).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-green-200 dark:border-green-900/30 pt-1.5 font-bold text-green-700 dark:text-green-400">
                      <span>Gross</span>
                      <span>${viewRecord.grossSalary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">Deductions</h4>
                  <div className="space-y-1.5 text-sm">
                    {[
                      ['PF', viewRecord.pfDeduction],
                      ['Tax', viewRecord.taxDeduction],
                      viewRecord.loanDeduction > 0 && ['Loan', viewRecord.loanDeduction],
                      viewRecord.otherDeductions > 0 && ['Other', viewRecord.otherDeductions],
                    ].filter(Boolean).map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-500">{(item as [string, number])[0]}</span>
                        <span className="font-medium text-red-600 dark:text-red-400">-${((item as [string, number])[1]).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-red-200 dark:border-red-900/30 pt-1.5 font-bold text-red-700 dark:text-red-400">
                      <span>Total Ded.</span>
                      <span>-${viewRecord.totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net */}
              <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-900 dark:to-dark-900 rounded-xl flex items-center justify-between">
                <span className="text-gray-300 font-medium">Net Salary</span>
                <span className="text-3xl font-bold text-white">${viewRecord.netSalary.toLocaleString()}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownloadPayslip(viewRecord)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-dark-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button
                  onClick={() => { setModalMode(null); setViewRecord(null); }}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
