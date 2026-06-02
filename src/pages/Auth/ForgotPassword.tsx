import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-4 shadow-xl">
            <DollarSign className="w-8 h-8 text-white" />
          </div> */}
           <div className="inline-block mb-4">
            <img src="/logo.png" alt="HITO HRMS" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4">Reset link sent! Check your email.</p>
              <Link to="/signin" className="text-red-600 font-medium hover:text-red-700">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg">Send Reset Link</button>
              <p className="text-center text-sm text-gray-600"><Link to="/signin" className="text-red-600 font-medium">Back to Sign In</Link></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
