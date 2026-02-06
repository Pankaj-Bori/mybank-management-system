
import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filterType === 'ALL' || tx.type === filterType;
      const txDate = new Date(tx.timestamp).getTime();
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

      const matchesStart = !start || txDate >= start;
      const matchesEnd = !end || txDate <= end;

      return matchesType && matchesStart && matchesEnd;
    });
  }, [transactions, filterType, startDate, endDate]);

  const resetFilters = () => {
    setFilterType('ALL');
    setStartDate('');
    setEndDate('');
    setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Transaction History</h3>
            <p className="text-slate-500 text-sm">Review and filter your account activity</p>
          </div>
          <button 
            onClick={resetFilters}
            className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reset Filters
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Type</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="ALL">All Types</option>
              <option value={TransactionType.DEPOSIT}>Deposits Only</option>
              <option value={TransactionType.WITHDRAWAL}>Withdrawals Only</option>
              <option value={TransactionType.TRANSFER}>Transfers Only</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">From</label>
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">To</label>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-10"></th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Balance After</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map((tx) => (
              <React.Fragment key={tx.id}>
                <tr 
                  onClick={() => toggleExpand(tx.id)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${expandedId === tx.id ? 'bg-indigo-50/30' : ''}`}
                >
                  <td className="px-6 py-4">
                    <svg 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedId === tx.id ? 'rotate-90 text-indigo-500' : ''}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(tx.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      tx.type === TransactionType.DEPOSIT 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : tx.type === TransactionType.WITHDRAWAL
                      ? 'bg-rose-50 text-rose-600 border border-rose-100'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${
                    tx.type === TransactionType.DEPOSIT ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === TransactionType.DEPOSIT ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    ${tx.balanceAfter.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                {expandedId === tx.id && (
                  <tr className="bg-indigo-50/20 border-l-4 border-indigo-500 animate-in fade-in zoom-in-95 duration-200">
                    <td colSpan={6} className="px-6 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest font-black text-indigo-600 mb-3">Transaction Summary</h5>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-slate-800">{tx.description}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              This {tx.type.toLowerCase()} of ${tx.amount.toLocaleString()} was successfully processed and updated your closing balance to ${tx.balanceAfter.toLocaleString()}.
                            </p>
                          </div>
                        </div>
                        <div className="border-l border-slate-200/50 md:pl-8">
                          <h5 className="text-[10px] uppercase tracking-widest font-black text-indigo-600 mb-3">System Metadata</h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Reference ID</p>
                              <p className="text-xs font-mono font-medium text-slate-700">{tx.id}</p>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Status</p>
                                <p className="text-xs font-bold text-emerald-600">COMPLETED</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Channel</p>
                                <p className="text-xs font-bold text-slate-700">ONLINE_VAULT</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-l border-slate-200/50 md:pl-8">
                          <h5 className="text-[10px] uppercase tracking-widest font-black text-indigo-600 mb-3">Timeline Details</h5>
                          <div className="space-y-3">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Processed Date</p>
                              <p className="text-xs font-medium text-slate-700">
                                {new Date(tx.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Exact Timestamp</p>
                              <p className="text-xs font-medium text-slate-700">
                                {new Date(tx.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} UTC
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-end gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm">
                          Download Receipt
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
                          Dispute Transaction
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <p className="font-medium">No transactions match your current filters.</p>
                    <button 
                      onClick={resetFilters}
                      className="mt-2 text-indigo-600 text-sm hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Displaying {filteredTransactions.length} of {transactions.length} records</span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
          Bank-Grade Security
        </span>
      </div>
    </div>
  );
};

export default TransactionsList;
