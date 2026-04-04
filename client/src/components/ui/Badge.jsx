export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200/50',
    primary: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200/50',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50',
    danger: 'bg-red-50 text-red-700 ring-1 ring-red-200/50',
    info: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
