// 10% color (#8FBAC8) — buttons, CTA, active states
export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, className = '', ...props }) {
  const base = `
    inline-flex items-center justify-center font-semibold tracking-tight
    rounded-xl transition-all duration-250 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden select-none border
  `;

  const sizes = {
    sm:   'px-4 py-2 text-caption gap-1.5',
    md:   'px-5 py-2.5 text-body gap-2',
    lg:   'px-7 py-3.5 text-body-lg gap-2',
    icon: 'p-2.5',
  };

  // Inline styles per variant so colors are explicit and exact
  const variantStyle = {
    primary: {
      background: '#8FBAC8',
      color: '#FFFFFF',
      borderColor: 'rgba(143,186,200,0.3)',
      boxShadow: '0 2px 12px rgba(143,186,200,0.35)',
    },
    secondary: {
      background: 'rgba(232,196,184,0.45)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#3D2B23',
      borderColor: 'rgba(255,255,255,0.7)',
      boxShadow: '0 1px 4px rgba(61,43,35,0.06)',
    },
    ghost: {
      background: 'transparent',
      color: '#5C3D30',
      borderColor: 'transparent',
    },
    danger: {
      background: 'rgba(220,53,69,0.12)',
      color: '#C0392B',
      borderColor: 'rgba(220,53,69,0.25)',
    },
  };

  const hoverStyle = {
    primary:   { background: '#7AAEC0', boxShadow: '0 4px 20px rgba(143,186,200,0.45)' },
    secondary: { background: 'rgba(232,196,184,0.65)', boxShadow: '0 4px 12px rgba(61,43,35,0.09)' },
    ghost:     { background: 'rgba(232,196,184,0.4)', borderColor: 'rgba(232,196,184,0.6)' },
    danger:    { background: 'rgba(220,53,69,0.2)' },
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${className} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]`}
      style={variantStyle[variant]}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        Object.assign(e.currentTarget.style, hoverStyle[variant]);
      }}
      onMouseLeave={(e) => {
        if (disabled || loading) return;
        Object.assign(e.currentTarget.style, variantStyle[variant]);
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
    </button>
  );
}
