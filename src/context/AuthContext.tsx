import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, portal?: 'admin' | 'employee') => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  updateProfile: (data: { name?: string; email?: string; role?: User['role']; image?: string }) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  signup: async () => false,
  updateProfile: () => {},
});

const mockUsers = [
  { id: '1', email: 'admin@hrms.com', password: 'admin123', name: 'Admin User', role: 'super_admin' as const },
  { id: '2', email: 'hr@hrms.com', password: 'hr123', name: 'HR Manager', role: 'hr' as const },
  { id: '3', email: 'emp@hrms.com', password: 'emp123', name: 'John Employee', role: 'employee' as const },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('hrms_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, portal: 'admin' | 'employee' = 'admin'): Promise<boolean> => {
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      // super admin ko login karne ka access Admin and HR side se rakho
      // employee side ka login access super admin se remove kar do
      if (found.role === 'super_admin' && portal === 'employee') {
        return false;
      }

      if (found.role === 'employee' && portal === 'admin') {
        return false;
      }

      const u: User = { id: found.id, email: found.email, name: found.name, role: found.role };
      setUser(u);
      localStorage.setItem('hrms_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
  };

  const signup = async (email: string, _password: string, name: string): Promise<boolean> => {
    const u: User = { id: Date.now().toString(), email, name, role: 'employee' };
    setUser(u);
    localStorage.setItem('hrms_user', JSON.stringify(u));
    return true;
  };

  const updateProfile = (data: { name?: string; email?: string; role?: User['role']; image?: string }) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('hrms_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
