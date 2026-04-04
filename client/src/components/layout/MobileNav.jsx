import { NavLink } from 'react-router-dom';
import { useSelectedChild } from '../../hooks/useChild';
import { DashboardIcon, GrowthIcon, BookIcon, ChatIcon, SettingsIcon } from '../../assets/icons';

export default function MobileNav() {
  const child = useSelectedChild();

  const items = [
    { to: '/dashboard', icon: DashboardIcon, label: 'Home' },
    { to: child ? `/child/${child.id}/growth` : '/dashboard', icon: GrowthIcon, label: 'Growth' },
    { to: '/guides', icon: BookIcon, label: 'Guides' },
    { to: '/ask', icon: ChatIcon, label: 'Ask AI' },
    { to: '/settings', icon: SettingsIcon, label: 'More' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-gray-100/50 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      <div className="flex items-center justify-around py-1.5 px-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-2xl min-w-[60px] transition-all duration-200 ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-400 active:scale-90 active:text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`relative p-1.5 transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                  <item.icon className={`w-5.5 h-5.5 ${isActive ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold transition-all duration-200 ${isActive ? 'text-primary-600' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
