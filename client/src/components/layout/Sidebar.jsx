import { NavLink } from 'react-router-dom';
import { useSelectedChild } from '../../hooks/useChild';
import useUiStore from '../../stores/uiStore';
import ChildSwitcher from '../shared/ChildSwitcher';
import { DashboardIcon, GrowthIcon, FoodIcon, BookIcon, ChatIcon, HealthIcon, SettingsIcon, ClipboardIcon, LogoutIcon } from '../../assets/icons';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const child = useSelectedChild();
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  const { signOut } = useAuth();

  const childId = child?.id;

  const navItems = [
    { to: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    ...(childId ? [
      { to: `/child/${childId}/weekly-update`, icon: ClipboardIcon, label: 'Weekly Update' },
      { to: `/child/${childId}/growth`, icon: GrowthIcon, label: 'Growth' },
      { to: `/child/${childId}/food`, icon: FoodIcon, label: 'Food Tracker' },
      { to: `/child/${childId}/health`, icon: HealthIcon, label: 'Health' },
    ] : []),
    { to: '/guides', icon: BookIcon, label: 'Guides' },
    { to: '/ask', icon: ChatIcon, label: 'Ask AI' },
    { to: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-gray-100/50 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow/50">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold text-gray-900">ChildBloom</h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Growing Together</p>
              </div>
            </div>
          </div>

          {/* Child Switcher */}
          <div className="px-4 pb-3">
            <ChildSwitcher />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-emerald-50/50 text-primary-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
                    )}
                    <div className={`p-1 rounded-xl transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-3 border-t border-gray-100/50">
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200"
            >
              <LogoutIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
