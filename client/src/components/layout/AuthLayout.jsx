import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    // 60% (#F7F4EF) — warm cream canvas
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: '#F7F4EF' }}>
      {/* Soft ambient shapes using 30% blush */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(232,196,184,0.6) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(143,186,200,0.20) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(232,196,184,0.45) 0%, transparent 70%)' }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-12 relative z-10">
        <div className="w-full max-w-sm">

          {/* Brand */}
          <div className="text-center mb-10 animate-fade-in-up">
            {/* App icon — 10% teal */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 border"
              style={{
                background: 'rgba(143, 186, 200, 0.20)',
                borderColor: 'rgba(143, 186, 200, 0.40)',
                boxShadow: '0 4px 20px rgba(143,186,200,0.18)',
              }}
            >
              <svg className="w-8 h-8" style={{ color: '#8FBAC8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-display font-serif" style={{ color: '#2A1C15' }}>{t('app.name')}</h1>
            <p className="text-body mt-2" style={{ color: 'rgba(61,43,35,0.50)' }}>{t('app.tagline')}</p>
          </div>

          {/* Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="py-5 text-center relative z-10">
        <p className="text-micro max-w-sm mx-auto px-4 uppercase tracking-wider" style={{ color: 'rgba(61,43,35,0.30)' }}>
          {t('app.disclaimer')}
        </p>
      </footer>
    </div>
  );
}
