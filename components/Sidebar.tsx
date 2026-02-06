
import React from 'react';

interface SidebarProps {
  currentView: 'dashboard' | 'transactions';
  onViewChange: (view: 'dashboard' | 'transactions') => void;
  onLogout: () => void;
  accountName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout, accountName }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
    )},
    { id: 'transactions', label: 'History', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
    )},
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-xl text-slate-800">MyBank</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
              ? 'bg-indigo-50 text-indigo-600 font-semibold' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
