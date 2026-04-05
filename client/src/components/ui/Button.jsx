export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, className = '', ...props }) {
  const base = `
    inline-flex items-center justify-center font-semibold tracking-tight
    rounded-2xl transition-all duration-250 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden select-none
  `;

  const variants = {
    primary: `
      text-white
      hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
      focus-visible:ring-rose-400
    `,
    secondary: `
      text-gray-700 border border-gray-200/80
      hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
      focus-visible:ring-gray-300
    `,
    ghost: `
      bg-transparent text-gray-600
      hover:text-gray-800
      active:scale-[0.98]
      focus-visible:ring-gray-300
    `,
    danger: `
      text-white
      hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
      focus-visible:ring-red-400
    `,
  };

  const sizes = {
    sm:   'px-4 py-2 text-caption gap-1.5',
    md:   'px-5 py-2.5 text-body gap-2',
    lg:   'px-7 py-3.5 text-body-lg gap-2',
    icon: 'p-2.5',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #E11D48 100%)',
      boxShadow: '0 4px 16px rgba(244,63,94,0.28), 0 1px 4px rgba(244,63,94,0.2)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.7)',
    },
    ghost: {
      background: 'transparent',
    },
    danger: {
      background: 'linear-gradient(135deg, #F87171 0%, #EF4444 50%, #DC2626 100%)',
      boxShadow: '0 4px 16px rgba(239,68,68,0.28), 0 1px 4px rgba(239,68,68,0.2)',
    },
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variantStyles[variant]}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(244,63,94,0.38), 0 2px 8px rgba(244,63,94,0.26)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8)';
        }
      }}
      onMouseLeave={(e) => {
        if (disabled || loading) return;
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(244,63,94,0.28), 0 1px 4px rgba(244,63,94,0.2)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.7)';
        }
      }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
      {/* Subtle shine for primary */}
      {variant === 'primary' && !disabled && !loading && (
        <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
        </span>
      )}
    </button>
  );
}
