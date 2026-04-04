import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden flex flex-col">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-accent-lavender/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-accent-sky/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl shadow-glow mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">ChildBloom</h1>
            <p className="text-sm text-gray-500 mt-1.5">Growing together, week by week</p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="py-4 text-center relative z-10">
        <p className="text-xs text-gray-400 max-w-md mx-auto px-4">
          ChildBloom is an informational tool and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
}
