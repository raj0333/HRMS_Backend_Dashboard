import React, { useState } from 'react';
import { CheckCircle, Laptop, Shield, Key } from 'lucide-react';

const initialAssets = [
  { id: '1', employee: 'Bob Smith', dept: 'Design', assets: [{ name: 'MacBook Pro', issued: true }, { name: 'Monitor', issued: true }, { name: 'Keyboard & Mouse', issued: true }, { name: 'Headphones', issued: false }], status: 'in_progress' },
  { id: '2', employee: 'Carol Davis', dept: 'Product', assets: [{ name: 'Laptop', issued: false }, { name: 'Monitor', issued: false }, { name: 'Keyboard & Mouse', issued: false }, { name: 'VPN Setup', issued: false }], status: 'pending' },
];

export function AssetSetup() {
  const [assets, setAssets] = useState(initialAssets);

  const toggleAsset = (empId: string, assetName: string) => {
    setAssets(prev => prev.map(a => a.id === empId ? {
      ...a,
      assets: a.assets.map(ast => ast.name === assetName ? { ...ast, issued: !ast.issued } : ast),
      status: a.assets.every(ast => ast.issued) ? 'completed' : 'in_progress'
    } : a));
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Asset Setup</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Allocate hardware and software to new employees</p>
      </div>

      <div className="space-y-4">
        {assets.map(a => {
          const issuedCount = a.assets.filter(ast => ast.issued).length;
          return (
            <div key={a.id} className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{a.employee}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{a.dept} Department</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[a.status]}`}>{a.status.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Assets Assigned: {issuedCount}/{a.assets.length}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round((issuedCount / a.assets.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: `${(issuedCount / a.assets.length) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {a.assets.map((ast, i) => (
                  <button
                    key={i}
                    onClick={() => toggleAsset(a.id, ast.name)}
                    className={`p-3 rounded-lg text-xs font-medium transition text-center ${ast.issued ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                  >
                    {ast.issued ? <CheckCircle className="w-4 h-4 mx-auto mb-1" /> : <Laptop className="w-4 h-4 mx-auto mb-1 opacity-40" />}
                    {ast.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
