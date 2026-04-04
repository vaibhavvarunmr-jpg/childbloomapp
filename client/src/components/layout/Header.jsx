import useUiStore from '../../stores/uiStore';
import useAuthStore from '../../stores/authStore';
import { MenuIcon, UserIcon } from '../../assets/icons';
import { format } from 'date-fns';

export default function Header() {
  const { toggleSidebar } = useUiStore();
  const profile = useAuthStore((s) => s.profile);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-2xl border-b border-gray-100/50 safe-area-top">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2.5 hover:bg-white/80 rounded-2xl transition-all duration-200 active:scale-90 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-gray-900 truncate">
              {greeting()}, <span className="text-gradient">{firstName}</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{format(new Date(), 'EEE, MMM d')}<span className="hidden sm:inline">, {format(new Date(), 'yyyy')}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-soft cursor-pointer active:scale-95 transition-transform">
            <span className="text-xs sm:text-sm font-bold text-primary-700">
              {firstName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
