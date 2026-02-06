
import React, { useState } from 'react';
import { AccountData, TransactionType } from '../types';
import { globalBank } from '../services/bankLogic';

interface DashboardProps {
  account: AccountData;
  onTransaction: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ account, onTransaction }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [targetId, setTargetId] = useState('');
  const [action, setAction] = useState<TransactionType | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const bankAcc = globalBank.getAccount(account.id);
    if (!bankAcc) return;

    let success = false;
    if (action === TransactionType.DEPOSIT) {
      success = bankAcc.deposit(val, desc || 'Manual Deposit');
    } else if (action === TransactionType.WITHDRAWAL) {
      success = bankAcc.withdraw(val, desc || 'Manual Withdrawal');
    } else if (action === TransactionType.TRANSFER) {
      if (!targetId) {
        setError('Target Account ID required');
        return;
      }
      success = globalBank.transfer(account.id, targetId, val, desc || 'Inter-account Transfer');
    }

    if (success) {
      setAmount('');
      setDesc('');
      setTargetId('');
      setAction(null);
      onTransaction();
    } else {
      setError("Operation failed. Insufficient funds or invalid target.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-slate-400 text-sm uppercase tracking-wider font-medium">Available Balance</span>
              <h3 className="text-3xl font-bold mt-1">${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <p className="text-slate-400 text-xs uppercase">Account Identifier</p>
                  <p className="font-mono text-lg">{account.id}</p>
                </div>
                <div className="bg-indigo-500/20 px-3 py-1 rounded-full text-xs border border-indigo-400/30 uppercase tracking-widest">
                  {account.accountType}
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
               <svg width="200" height="200" viewBox="0 0 200 200"><path fill="#FFF" d="M40,-64C53.3,-58.1,66.6,-50.2,74.5,-38.7C82.4,-27.2,84.9,-12.1,83.4,2.5C81.8,17.1,76.2,31.2,67.3,43.2C58.4,55.2,46.1,65.1,32.5,71.2C18.9,77.3,4,79.5,-10.7,77.3C-25.5,75.1,-40.1,68.6,-52.1,59.1C-64.1,49.6,-73.4,37.1,-78.9,23.1C-84.4,9,-86,-6.6,-82.4,-20.5C-78.7,-34.5,-69.8,-46.8,-58.3,-53.2C-46.8,-59.6,-32.7,-60.1,-19.5,-64.5C-6.4,-68.9,5.7,-77.2,20,-79.6C34.3,-82,47.3,-78.4,40,-64Z" transform="translate(100 100)" /></svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
             <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Quick Actions</h4>
             <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setAction(TransactionType.DEPOSIT)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition border group ${action === TransactionType.DEPOSIT ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-slate-50 border-slate-100'}`}
                >
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-600">Deposit</span>
                </button>
                <button 
                  onClick={() => setAction(TransactionType.WITHDRAWAL)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition border group ${action === TransactionType.WITHDRAWAL ? 'bg-rose-50 border-rose-200' : 'hover:bg-slate-50 border-slate-100'}`}
                >
                  <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-600">Withdraw</span>
                </button>
                <button 
                  onClick={() => setAction(TransactionType.TRANSFER)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition border group ${action === TransactionType.TRANSFER ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-slate-50 border-slate-100'}`}
                >
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-600">Transfer</span>
                </button>
             </div>
          </div>
        </div>

        {action && (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {action === TransactionType.DEPOSIT ? 'Add Funds' : action === TransactionType.WITHDRAWAL ? 'Take Funds' : 'Transfer Funds'}
              </h3>
              <button onClick={() => setAction(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {error && <p className="mb-4 text-xs font-bold text-rose-500 bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`grid grid-cols-1 ${action === TransactionType.TRANSFER ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                {action === TransactionType.TRANSFER && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recipient ID</label>
                    <input 
                      type="text" 
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      placeholder="e.g. 999999"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div className={action === TransactionType.TRANSFER ? 'md:col-span-1' : ''}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Note</label>
                  <input 
                    type="text" 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    placeholder="e.g. Rent payment"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg active:scale-[0.98] ${
                  action === TransactionType.DEPOSIT 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' 
                  : action === TransactionType.WITHDRAWAL 
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                }`}
              >
                Confirm {action}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Recent Activity
          </h4>
          <div className="space-y-3">
            {account.transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === TransactionType.DEPOSIT ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.type === TransactionType.DEPOSIT 
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                    }
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{tx.description}</p>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">REF: {tx.id} • {new Date(tx.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className={`font-black text-right ${tx.type === TransactionType.DEPOSIT ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {tx.type === TransactionType.DEPOSIT ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
            {account.transactions.length === 0 && (
              <div className="text-center py-12">
                 <p className="text-slate-300 font-medium italic">Your financial story starts here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-1">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
           <h4 className="text-slate-800 font-bold mb-4 uppercase text-xs tracking-widest">Analytics</h4>
           <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-emerald-600 uppercase font-black mb-1">Inflow</p>
                <p className="text-xl font-black text-emerald-700">
                  ${account.transactions
                    .filter(t => t.type === TransactionType.DEPOSIT)
                    .reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="text-[10px] text-rose-600 uppercase font-black mb-1">Outflow</p>
                <p className="text-xl font-black text-rose-700">
                  ${account.transactions
                    .filter(t => t.type === TransactionType.WITHDRAWAL)
                    .reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </p>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
           <h4 className="font-black text-xs uppercase tracking-widest mb-4">Security Protocol</h4>
           <div className="space-y-4">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-300">Encryption Active</p>
                   <p className="text-[9px] text-slate-500">AES-256 local storage simulation active.</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-300">O(1) Access</p>
                   <p className="text-[9px] text-slate-500">Hash map indexing ensures zero latency.</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
