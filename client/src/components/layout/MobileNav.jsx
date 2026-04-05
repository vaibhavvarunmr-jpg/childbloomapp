import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelectedChild } from '../../hooks/useChild';
import { DashboardIcon, GrowthIcon, BookIcon, ChatIcon, SettingsIcon } from '../../assets/icons';

export default function MobileNav() {
  const { t } = useTranslation();
  const child = useSelectedChild();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = [
    { to: '/dashboard', icon: DashboardIcon, label: t('nav.home') },
    { to: child ? `/child/${child.id}/growth` : '/dashboard', icon: GrowthIcon, label: t('nav.growth') },
    { to: '/guides', icon: BookIcon, label: t('nav.guides') },
    { to: '/ask', icon: ChatIcon, label: t('nav.askAi') },
    { to: '/settings', icon: SettingsIcon, label: t('nav.more') },
  ];

  // Dock magnification: hovered = 1.4, adjacent = 1.15, rest = 1
  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const d = Math.abs(index - hoveredIndex);
    if (d === 0) return 1.42;
    if (d === 1) return 1.16;
    return 1;
  };

  const getTranslateY = (index) => {
    if (hoveredIndex === null) return 0;
    const d = Math.abs(index - hoveredIndex);
    if (d === 0) return -10;
    if (d === 1) return -5;
    return 0;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end lg:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)' }}
    >
      {/* Dock container */}
      <div
        className="relative flex items-end gap-1 px-4 py-2.5"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.9)',
        }}
      >
        {items.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(index)}
            onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 300)}
          >
            {({ isActive }) => (
              <div
                className="relative flex flex-col items-center"
                style={{
                  transform: `scale(${getScale(index)}) translateY(${getTranslateY(index)}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Tooltip */}
                <div
                  className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap pointer-events-none transition-all duration-200"
                  style={{
                    background: 'rgba(28,28,30,0.8)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: `translateX(-50%) translateY(${hoveredIndex === index ? '0' : '4px'})`,
                  }}
                >
                  {item.label}
                  {/* Tooltip arrow */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid rgba(28,28,30,0.8)' }}
                  />
                </div>

                {/* Icon pill */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-[14px] transition-all duration-200"
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)',
                    boxShadow: '0 4px 16px rgba(244,63,94,0.38)',
                  } : {
                    background: 'rgba(255,255,255,0.01)',
                  }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: isActive ? '#fff' : '#8E8E93' }}
                  />
                </div>

                {/* Active dot */}
                {isActive && (
                  <div
                    className="mt-0.5 w-1 h-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FB7185, #F43F5E)' }}
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Subtle reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '260px',
          height: '20px',
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          borderRadius: '0 0 28px 28px',
          filter: 'blur(3px)',
        }}
      />
    </nav>
  );
}
