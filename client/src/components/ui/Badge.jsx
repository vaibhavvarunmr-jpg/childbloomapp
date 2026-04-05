export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-cream-200 text-gray-600 ring-1 ring-cream-300/50',
    primary: 'bg-forest-50 text-forest-700 ring-1 ring-forest-200/50',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50',
    danger: 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
    info: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-micro font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
