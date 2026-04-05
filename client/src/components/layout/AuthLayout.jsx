import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FFF5F7 0%, #FFF0FB 35%, #F5F0FF 65%, #EEF5FF 100%)' }}
    >
      {/* Animated background blobs — convey warmth and wonder */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large pink blob — top right */}
        <div
          className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.42) 0%, transparent 68%)', animationDelay: '0s' }}
        />
        {/* Lavender blob — left */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.38) 0%, transparent 65%)', animationDelay: '2.5s' }}
        />
        {/* Sky blue blob — bottom right */}
        <div
          className="absolute bottom-16 right-0 w-80 h-80 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(186,230,253,0.38) 0%, transparent 65%)', animationDelay: '1.2s' }}
        />
        {/* Peach blob — bottom left */}
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.28) 0%, transparent 65%)', animationDelay: '3.8s' }}
        />
        {/* Mint — center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(110,231,183,0.18) 0%, transparent 65%)', animationDelay: '5s' }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-12 relative z-10">
        <div className="w-full max-w-sm">

          {/* Brand mark */}
          <div className="text-center mb-10 animate-fade-in-up">
            {/* App icon */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-[26px] mb-5"
              style={{
                background: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #C026D3 100%)',
                boxShadow: '0 12px 40px rgba(244,63,94,0.35), 0 4px 12px rgba(244,63,94,0.2)',
              }}
            >
              {/* Leaf / growth icon */}
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <h1
              className="text-display font-serif"
              style={{ color: '#1C1C1E' }}
            >
              {t('app.name')}
            </h1>
            <p className="text-body mt-2" style={{ color: '#8E8E93' }}>
              {t('app.tagline')}
            </p>

            {/* Emotional tagline decoration */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {['🌱', '✨', '💛'].map((e, i) => (
                <span
                  key={i}
                  className="text-lg animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="py-5 text-center relative z-10">
        <p className="text-micro max-w-sm mx-auto px-4 uppercase tracking-wider" style={{ color: '#AEAEB2' }}>
          {t('app.disclaimer')}
        </p>
      </footer>
    </div>
  );
}
