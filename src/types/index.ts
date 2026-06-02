export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'hr' | 'employee';
  department?: string;
  image?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  employeeId: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half_day' | 'holiday';
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedBy?: string;
  completedDate?: string;
}

export interface OnboardingStage {
  id: string;
  employeeId: string;
  stage: number;
  status: 'pending' | 'in_progress' | 'completed';
  completedDate?: string;
  tasks: OnboardingTask[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headId?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  description?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  baseSalary: number;
  hra: number;
  da: number;
  medicalAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  pfDeduction: number;
  taxDeduction: number;
  loanDeduction: number;
  otherDeductions: number;
  performanceBonus: number;
  festivalBonus: number;
  overtimePay: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  processedDate?: string;
  paidDate?: string;
  remarks?: string;
}
