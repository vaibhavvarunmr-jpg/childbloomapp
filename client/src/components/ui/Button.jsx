export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, className = '', ...props }) {
  const base = `
    inline-flex items-center justify-center font-semibold tracking-tight
    rounded-xl transition-all duration-250 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden select-none
  `;

  const variants = {
    primary: `
      bg-terracotta-400 text-white shadow-btn
      hover:bg-terracotta-500 hover:shadow-btn-hover hover:-translate-y-0.5
      active:translate-y-0 active:shadow-btn active:scale-[0.98]
      focus-visible:ring-terracotta-400
    `,
    secondary: `
      bg-white text-forest-600 border-2 border-forest-100
      hover:bg-forest-50 hover:border-forest-200 hover:-translate-y-0.5
      active:translate-y-0 active:scale-[0.98]
      focus-visible:ring-forest-400
    `,
    ghost: `
      bg-transparent text-forest-600
      hover:bg-cream-200 hover:text-forest-700
      active:bg-cream-300 active:scale-[0.98]
      focus-visible:ring-forest-400
    `,
    danger: `
      bg-red-500 text-white shadow-subtle
      hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-elevated
      active:translate-y-0 active:scale-[0.98]
      focus-visible:ring-red-400
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-caption gap-1.5',
    md: 'px-5 py-2.5 text-body gap-2',
    lg: 'px-7 py-3.5 text-body-lg gap-2',
    icon: 'p-2.5',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
      {/* Shine effect on hover for primary */}
      {variant === 'primary' && !disabled && !loading && (
        <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <span className="absolute top-0 -left-[75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] transition-all duration-500 group-hover:left-[125%]" />
        </span>
      )}
    </button>
  );
}
