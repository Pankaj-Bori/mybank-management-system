
import React, { useState } from 'react';
import { globalBank } from '../services/bankLogic';

interface LoginProps {
  onLoginSuccess: (id: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [accId, setAccId] = useState('1234567890');
  const [pin, setPin] = useState('mybank@123');
  const [name, setName] = useState('');
  const [initialBalance, setInitialBalance] = useState('1000');
  const [error, setError] = useState('');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      const balance = parseFloat(initialBalance);
      if (!name || isNaN(balance)) {
        setError('Please fill all fields correctly');
        return;
      }
      const newAcc = globalBank.createAccount(accId, name, balance, pin, 'SAVINGS');
      if (newAcc) {
        onLoginSuccess(accId);
      } else {
        setError('Account ID already exists');
      }
    } else {
      const account = globalBank.getAccount(accId);
      if (account && account.getDetails().pin === pin) {
        onLoginSuccess(accId);
      } else {
        setError('Invalid Account ID or PIN');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">MyBank</h2>
          <p className="text-slate-500 mt-2">{isRegister ? 'Create your account' : 'Welcome back to your vault'}</p>
        </div>

        <form onSubmit={handleAction} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 animate-pulse">
              {error}
            </div>
          )}
          
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account ID</label>
            <input 
              type="text" 
              value={accId}
              onChange={(e) => setAccId(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Account ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Secure PIN</label>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••"
              required
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initial Deposit ($)</label>
              <input 
                type="number" 
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1000"
                required
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg mt-4 active:scale-95"
          >
            {isRegister ? 'Register Account' : 'Access My Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 font-semibold hover:underline text-sm"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register now"}
          </button>
        </div>

        {!isRegister && (
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            <p>Demo: 1234567890 / mybank@123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
