 import React, { useState } from 'react';
import { 
  Plus, X, Edit, Trash2, 
  ShieldAlert, ShieldCheck, UserPlus,
  Mail, Briefcase, UserCog
} from 'lucide-react';

interface AdminAccessItem {
  id: string;
  name: string;
  email: string;
  role: string;
  accessLevel: 'Full Access' | 'Restricted' | 'View Only';
  status: 'Active' | 'Pending' | 'Inactive';
  assignedDate: string;
}

const AdminAccess: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [accessList, setAccessList] = useState<AdminAccessItem[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@hito.com',
      role: 'System Administrator',
      accessLevel: 'Full Access',
      status: 'Active',
      assignedDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.w@hito.com',
      role: 'HR Manager',
      accessLevel: 'Restricted',
      status: 'Active',
      assignedDate: '2024-02-15'
    }
  ]);

  const emptyForm = {
    name: '',
    email: '',
    role: '',
    accessLevel: 'View Only' as AdminAccessItem['accessLevel'],
    status: 'Active' as AdminAccessItem['status']
  };

  const [formData, setFormData] = useState(emptyForm);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminAccessItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      email: item.email,
      role: item.role,
      accessLevel: item.accessLevel,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAccessList(prev => prev.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      ));
    } else {
      const newItem: AdminAccessItem = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        assignedDate: new Date().toISOString().split('T')[0]
      };
      setAccessList([newItem, ...accessList]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to revoke this admin access?')) {
      setAccessList(prev => prev.filter(item => item.id !== id));
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <UserCog className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            Admin Access Control
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">Manage administrative roles and system permissions</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 active:scale-95"
        >
          <Plus size={20} />
          Grant Admin Access
        </button>

      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-700/50 border-b border-gray-200 dark:border-dark-700 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Administrator</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
              {accessList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-600 dark:to-dark-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold border border-gray-200 dark:border-dark-600">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                          <Mail size={12} /> {item.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <Briefcase size={14} className="text-gray-400" />
                      {item.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      item.accessLevel === 'Full Access' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-100 dark:border-purple-800' :
                      item.accessLevel === 'Restricted' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800' :
                      'bg-gray-50 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 border border-gray-200 dark:border-dark-600'
                    }`}>
                      {item.accessLevel === 'Full Access' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                      {item.accessLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"><Edit size={16} /></button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />
          <div className="relative bg-white dark:bg-dark-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-dark-700 flex items-center justify-between bg-gray-50/50 dark:bg-dark-700/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl"><UserPlus className="w-5 h-5 text-red-600 dark:text-red-400" /></div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingId ? 'Edit Admin Access' : 'Grant Admin Access'}</h2>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700 rounded-xl transition-all"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white placeholder:text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" placeholder="Enter administrator's  name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white placeholder:text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">System Role</label>
                  <input type="text" name="role" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" placeholder="e.g. HR Admin" value={formData.role} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Access Level</label>
                  <select name="accessLevel" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" value={formData.accessLevel} onChange={handleInputChange}>
                    <option value="Full Access">Full Access</option>
                    <option value="Restricted">Restricted</option>
                    <option value="View Only">View Only</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Status</label>
                <select name="status" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-6 flex gap-4">
                <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700 font-bold transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">{editingId ? 'Update Access' : 'Confirm & Grant'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAccess;