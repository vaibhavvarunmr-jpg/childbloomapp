import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelectedChild } from '../../hooks/useChild';
import { LayoutDashboard, TrendingUp, BookOpen, MessageCircle, Settings } from 'lucide-react';

export default function MobileNav() {
  const { t } = useTranslation();
  const child = useSelectedChild();
  const [hoveredItem, setHoveredItem] = useState(null);

  const items = [
    { id: 'dashboard', to: '/dashboard',                                         icon: <LayoutDashboard size={20} />, label: t('nav.home') },
    { id: 'growth',    to: child ? `/child/${child.id}/growth` : '/dashboard',   icon: <TrendingUp size={20} />,     label: t('nav.growth') },
    { id: 'guides',    to: '/guides',                                             icon: <BookOpen size={20} />,       label: t('nav.guides') },
    { id: 'ask',       to: '/ask',                                                icon: <MessageCircle size={20} />,  label: t('nav.askAi') },
    { id: 'settings',  to: '/settings',                                           icon: <Settings size={20} />,       label: t('nav.more') },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end lg:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)' }}
    >
      {/* Dock container — 30% color, exact from prompt */}
      <div
        className={`
          flex items-end gap-3 px-6 py-4
          rounded-2xl backdrop-blur-xl border shadow-2xl
          transition-all duration-500 ease-out
          ${hoveredItem ? 'scale-105' : ''}
        `}
        style={{
          background: 'rgba(232, 196, 184, 0.70)',  // 30% blush
          borderColor: 'rgba(255, 255, 255, 0.75)',
          boxShadow: '0 8px 32px rgba(61,43,35,0.12), 0 2px 8px rgba(61,43,35,0.07)',
        }}
      >
        {items.map((item) => (
          <NavLink key={item.id} to={item.to}>
            {({ isActive }) => (
              <div
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onTouchStart={() => setHoveredItem(item.id)}
                onTouchEnd={() => setTimeout(() => setHoveredItem(null), 400)}
              >
                {/* Exact DockItem from prompt — palette applied */}
                <div
                  className={`
                    relative flex items-center justify-center
                    w-11 h-11 rounded-lg backdrop-blur-[2px] border
                    transition-all duration-300 ease-out cursor-pointer
                    ${(hoveredItem === item.id || isActive)
                      ? 'scale-110 -translate-y-1'
                      : 'hover:scale-105 hover:-translate-y-0.5'
                    }
                  `}
                  style={{
                    background: isActive
                      ? 'rgba(143,186,200,0.30)'
                      : hoveredItem === item.id
                        ? 'rgba(143,186,200,0.18)'
                        : 'rgba(247,244,239,0.60)',
                    borderColor: isActive
                      ? 'rgba(143,186,200,0.55)'
                      : hoveredItem === item.id
                        ? 'rgba(143,186,200,0.35)'
                        : 'rgba(255,255,255,0.80)',
                    boxShadow: (hoveredItem === item.id || isActive)
                      ? '0 4px 16px rgba(143,186,200,0.22)'
                      : undefined,
                    transitionProperty: 'box-shadow, transform, background, border-color',
                  }}
                >
                  <div
                    className="transition-all duration-300"
                    style={{
                      color: isActive
                        ? '#8FBAC8'
                        : hoveredItem === item.id
                          ? '#7AAEC0'
                          : 'rgba(61,43,35,0.55)',
                      transform: (hoveredItem === item.id || isActive) ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Tooltip — above for mobile */}
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs font-normal whitespace-nowrap pointer-events-none border transition-all duration-200"
                  style={{
                    background: 'rgba(42,28,21,0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#F7F4EF',
                    borderColor: 'rgba(255,255,255,0.08)',
                    opacity: hoveredItem === item.id ? 1 : 0,
                    transform: `translateX(-50%) translateY(${hoveredItem === item.id ? '0' : '4px'})`,
                  }}
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2">
                    <div className="w-2 h-2 rotate-45" style={{ background: 'rgba(42,28,21,0.85)' }} />
                  </div>
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Reflection — exact from prompt */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] h-12 overflow-hidden pointer-events-none">
        <div
          className={`
            flex items-start gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border
            opacity-20 transform scale-y-[-1]
            transition-all duration-500 ease-out
            ${hoveredItem ? 'scale-105 scale-y-[-1.05]' : ''}
          `}
          style={{ background: 'rgba(232,196,184,0.40)', borderColor: 'rgba(255,255,255,0.50)' }}
        >
          {items.map((item) => (
            <div
              key={`r-${item.id}`}
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ background: 'rgba(247,244,239,0.45)' }}
            >
              <div style={{ color: 'rgba(61,43,35,0.30)' }}>{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
