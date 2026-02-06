
import React, { useState, useEffect } from 'react';
import { globalBank } from './services/bankLogic';
import { AccountData } from './types';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TransactionsList from './components/TransactionsList';

const App: React.FC = () => {
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [view, setView] = useState<'dashboard' | 'transactions'>('dashboard');

  // Sync UI state with Bank class data
  const refreshAccountData = () => {
    if (currentAccountId) {
      const account = globalBank.getAccount(currentAccountId);
      if (account) {
        setAccountData(account.getDetails());
      }
    }
  };

  useEffect(() => {
    refreshAccountData();
  }, [currentAccountId]);

  const handleLogout = () => {
    setCurrentAccountId(null);
    setAccountData(null);
  };

  if (!currentAccountId || !accountData) {
    return <Login onLoginSuccess={setCurrentAccountId} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={view} 
        onViewChange={setView} 
        onLogout={handleLogout} 
        accountName={accountData.ownerName}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back, {accountData.ownerName}</h1>
            <p className="text-slate-500">Manage your finances securely</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="text-sm text-slate-500 block">Current Balance</span>
            <span className="text-xl font-bold text-indigo-600">${accountData.balance.toLocaleString()}</span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto space-y-6">
          {view === 'dashboard' && (
            <Dashboard 
              account={accountData} 
              onTransaction={refreshAccountData} 
            />
          )}
          
          {view === 'transactions' && (
            <TransactionsList transactions={accountData.transactions} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
