import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/Layout/MainLayout';

import { SignIn } from './pages/Auth/SignIn';
import { Register } from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { PreOnboarding } from './pages/Onboarding/PreOnboarding';
import { Orientation } from './pages/Onboarding/Orientation';
import { AssetSetup } from './pages/Onboarding/AssetSetup';
import { DepartmentIntro } from './pages/Onboarding/DepartmentIntro';
import { Training } from './pages/Onboarding/Training';
import { Probation } from './pages/Onboarding/Probation';
import { Confirmation } from './pages/Onboarding/Confirmation';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { Leaves } from './pages/Leaves';
import { Payroll } from './pages/Payroll';
import { Departments } from './pages/Departments';
import { PersonalInfo } from './pages/PersonalInfo';
import { WorkingHours } from './pages/WorkingHours';
import { Feedback } from './pages/Feedback';
import { LeaveBalance } from './pages/LeaveBalance';
import AdminAccess from './pages/AdminAccess';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding/pre" element={<PreOnboarding />} />
        <Route path="/onboarding/orientation" element={<Orientation />} />
        <Route path="/onboarding/assets" element={<AssetSetup />} />
        <Route path="/onboarding/department" element={<DepartmentIntro />} />
        <Route path="/onboarding/training" element={<Training />} />
        <Route path="/onboarding/probation" element={<Probation />} />
        <Route path="/onboarding/confirmation" element={<Confirmation />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/my-attendance" element={<Attendance />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/my-leaves" element={<Leaves />} />
        <Route path="/leave-balance" element={<LeaveBalance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/working-hours" element={<WorkingHours />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin-access" element={<AdminAccess />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
