import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Users, Calendar, DollarSign, Building2,
  FileText, LogOut, ChevronDown, BookOpen, UserCog,
  Heart, Clock, UserPlus, List, PlusCircle, ClipboardList,
  Wallet, Receipt, CreditCard, Briefcase, UsersRound, MapPin,
  UserCheck, Shield, Eye, Send, MessageSquare, Edit, X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface SubmenuItem {
  label: string;
  path: string;
  icon?: React.ElementType;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  submenu?: SubmenuItem[];
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    {
      icon: BookOpen, label: 'Onboarding', path: '#',
      submenu: [
        { label: 'Pre-Onboarding', path: '/onboarding/pre', icon: ClipboardList },
        { label: 'Orientation', path: '/onboarding/orientation', icon: Eye },
        { label: 'Asset Setup', path: '/onboarding/assets', icon: Shield },
        { label: 'Department Intro', path: '/onboarding/department', icon: Briefcase },
        { label: 'Training & Access', path: '/onboarding/training', icon: UserCheck },
        { label: 'Probation', path: '/onboarding/probation', icon: Clock },
        { label: 'Confirmation', path: '/onboarding/confirmation', icon: UserPlus },
      ]
    },
    {
      icon: Users, label: 'Employees', path: '#',
      submenu: [
        { label: 'Employee List', path: '/employees', icon: List },
        { label: 'Add Employee', path: '/employees?action=add', icon: PlusCircle },
      ]
    },
    {
      icon: Calendar, label: 'Attendance', path: '#',
      submenu: [
        { label: 'Attendance Records', path: '/attendance', icon: ClipboardList },
        { label: 'Mark Attendance', path: '/attendance?action=mark', icon: Clock },
      ]
    },
    {
      icon: FileText, label: 'Leave Management', path: '#',
      submenu: [
        { label: 'All Leave Requests', path: '/leaves', icon: List },
        { label: 'Apply Leave', path: '/leaves?action=apply', icon: Send },
        { label: 'Leave Balance', path: '/leave-balance', icon: Heart },
      ]
    },
    {
      icon: DollarSign, label: 'Payroll', path: '#',
      submenu: [
        { label: 'Payroll Records', path: '/payroll', icon: Receipt },
        { label: 'Process Payroll', path: '/payroll?action=process', icon: CreditCard },
        { label: 'Salary Structure', path: '/payroll?action=salary', icon: Wallet },
      ]
    },
    {
      icon: Building2, label: 'Departments', path: '#',
      submenu: [
        { label: 'All Departments', path: '/departments', icon: UsersRound },
        // { label: 'Add Department', path: '/departments?action=add', icon: PlusCircle },
        // { label: 'Department Map', path: '/departments?action=map', icon: MapPin },
      ]
    },
    {
      icon: UserCog, label: 'Personal Info', path: '#',
      submenu: [
        { label: 'My Profile', path: '/personal-info', icon: UserCog },
        { label: 'Edit Profile', path: '/personal-info?action=edit', icon: Edit },
      ]
    },
    {
      icon: Clock, label: 'Working Hours', path: '#',
      submenu: [
        { label: 'Time Tracker', path: '/working-hours', icon: Clock },
        { label: 'Timesheet', path: '/working-hours?action=timesheet', icon: ClipboardList },
      ]
    },
    {
      icon: MessageSquare, label: 'Feedback', path: '#',
      submenu: [
        { label: 'Submit Feedback', path: '/feedback', icon: Send },
        // { label: 'Feedback History', path: '/feedback?action=history', icon: List },
      ]
    },
    { icon: UserCog, label: 'Admin Access', path: '/admin-access' },
  ];

  // Role-based menu filtering: Super Admin ke liye employee side access remove karna
  const filteredMenuItems = menuItems.map(item => ({ ...item })).filter(item => {
    // Rule 1: 'Admin Access' is only for 'super_admin'
    if (item.label === 'Admin Access') {
      return user?.role === 'super_admin';
    }

    if (user?.role === 'super_admin') {
      // Rule 2: 'Personal Info' is typically for employees, hide it for super_admin
      if (item.label === 'Personal Info') return false;

      // Rule 3: Filter out employee-specific submenu actions for super_admin
      if (item.submenu) {
        const employeeOnlyActions = ['Apply Leave', 'Leave Balance', 'Mark Attendance', 'Time Tracker'];
        // Create a new array for the submenu to avoid direct mutation issues if item is reused
        const newSubmenu = item.submenu.filter(sub => !employeeOnlyActions.includes(sub.label));
        // Update the item's submenu for rendering
        item.submenu = newSubmenu;
        // If a menu item's submenu becomes empty and its path is just a placeholder, hide the parent menu item
        if (newSubmenu.length === 0 && item.path === '#') {
          return false;
        }
      }
    }
    // For all other cases, or if no specific role-based filtering applies, keep the item
    return true;
  });

  const handleItemClick = () => {
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 1024 && isOpen) {
      onToggle();
    }
  };

  const isActive = (path: string) => location.pathname === path.split('?')[0];

  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  useEffect(() => {
    const active = menuItems.find(item => item.submenu?.some(s => isActive(s.path)));
    if (active) {
      setExpandedMenus(prev => prev.includes(active.label) ? prev : [...prev, active.label]);
    }
  }, [location.pathname]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300" 
          onClick={onToggle}
        />
      )}
      <aside className={`fixed left-0 top-0 h-screen bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 shadow-lg z-40 transition-all duration-300 ease-in-out scrollbar-thin overflow-y-auto overflow-x-hidden ${
        isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className={`sticky top-0 py-[10px] ${isOpen ? 'px-4' : 'px-5'} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-800 border-b border-gray-200 dark:border-dark-700 flex items-center justify-between z-10 transition-all duration-300`}>
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/logo.png" alt="HITO HRMS" className="w-full h-full object-contain" />
          </div>
          <div className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">HITO</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">HRMS Portal</p>
          </div>
          </div>
          
          {/* Mobile Close Button - Only visible when open on mobile */}
          {isOpen && (
            <button
              onClick={onToggle}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-700">
          <div className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2 rounded-lg bg-gray-50 dark:bg-dark-700 transition-all duration-300`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={`min-w-0 transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role?.replace('_', ' ') || 'Role'}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {filteredMenuItems.map((item, idx) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.label) && isOpen;
            const hasSubmenu = !!item.submenu?.length;

            return (
              <div key={idx}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => isOpen ? toggleMenu(item.label) : onToggle()}
                      className={`w-full flex items-center ${isOpen ? 'justify-between px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-all duration-200 group cursor-pointer ${isExpanded ? 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400' : `text-gray-700 dark:text-gray-300 ${isOpen ? 'hover:bg-gray-100 dark:hover:bg-dark-700' : ''}`}`}
                    >
                      <div className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                        <Icon className={`w-5 h-5 ${isExpanded ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500'}`} />
                        <span className={`font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} ${isExpanded ? 'rotate-180 text-red-500' : 'text-gray-400'}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-3 mt-1 mb-1 border-l-2 border-red-200 dark:border-red-900/30 pl-3 space-y-0.5">
                        {item.submenu!.map((sub, subIdx) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={subIdx}
                              to={sub.path}
                              onClick={handleItemClick}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(sub.path) ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-gray-200'}`}
                            >
                              {SubIcon && <SubIcon className="w-4 h-4 opacity-60" />}
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={handleItemClick}
                    className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${isActive(item.path) ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' : `text-gray-700 dark:text-gray-300 ${isOpen ? 'hover:bg-gray-100 dark:hover:bg-dark-700' : ''}`}`}
                  >
                    <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="sticky bottom-0 p-3 border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
          <button
            onClick={logout}
            className={`w-full flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-2.5 rounded-lg font-medium text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200`}
          >
            <LogOut className="w-5 h-5" />
            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
