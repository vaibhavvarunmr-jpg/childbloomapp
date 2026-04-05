import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/authStore';
import { format } from 'date-fns';

export default function Header() {
  const { t } = useTranslation();
  const profile = useAuthStore((s) => s.profile);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greeting.morning');
    if (hour < 17) return t('greeting.afternoon');
    return t('greeting.evening');
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    // 30% (#E8C4B8) — header surface, blush tint
    <header
      className="sticky top-0 z-30 safe-area-top"
      style={{
        background: 'rgba(232, 196, 184, 0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.70)',
        boxShadow: '0 1px 0 rgba(61,43,35,0.04)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="min-w-0">
          <h2 className="text-body-lg font-serif font-semibold truncate" style={{ color: '#2A1C15' }}>
            {greeting()},{' '}
            <span style={{ color: '#8FBAC8' }}>{firstName}</span>
          </h2>
          <p className="text-micro mt-0.5 uppercase tracking-wider" style={{ color: 'rgba(61,43,35,0.40)' }}>
            {format(new Date(), 'EEE, MMM d, yyyy')}
          </p>
        </div>

        {/* Avatar — 10% teal */}
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform flex-shrink-0 border"
          style={{
            background: 'rgba(143, 186, 200, 0.25)',
            borderColor: 'rgba(143, 186, 200, 0.45)',
          }}
        >
          <span className="text-xs sm:text-sm font-bold" style={{ color: '#8FBAC8' }}>
            {firstName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
