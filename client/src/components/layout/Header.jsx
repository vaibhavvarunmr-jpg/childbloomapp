import { useTranslation } from 'react-i18next';
import useUiStore from '../../stores/uiStore';
import useAuthStore from '../../stores/authStore';
import { MenuIcon } from '../../assets/icons';
import { format } from 'date-fns';

export default function Header() {
  const { t } = useTranslation();
  const { toggleSidebar } = useUiStore();
  const profile = useAuthStore((s) => s.profile);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greeting.morning');
    if (hour < 17) return t('greeting.afternoon');
    return t('greeting.evening');
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <header
      className="sticky top-0 z-30 safe-area-top"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-5 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full active:scale-95 transition-transform"
            style={{
              background: 'rgba(255,255,255,0.85)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.9)',
            }}
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-4 h-4" style={{ color: '#3C3C43' }} />
          </button>

          <div className="min-w-0">
            <h2 className="text-body-lg font-serif font-semibold truncate" style={{ color: '#1C1C1E' }}>
              {greeting()},{' '}
              <span style={{ background: 'linear-gradient(135deg, #FB7185, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {firstName}
              </span>
            </h2>
            <p className="text-micro text-gray-400 mt-0.5 uppercase tracking-wider">
              {format(new Date(), 'EEE, MMM d')}
              <span className="hidden sm:inline">, {format(new Date(), 'yyyy')}</span>
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)',
            boxShadow: '0 2px 10px rgba(244,63,94,0.32)',
          }}
        >
          <span className="text-xs sm:text-sm font-bold text-white">
            {firstName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
