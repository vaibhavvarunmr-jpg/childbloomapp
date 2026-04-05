export default function Card({ children, className = '', hover = false, onClick, accent, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-cream-300/80 shadow-card
        ${hover ? 'hover-lift cursor-pointer hover:border-cream-300 hover:shadow-elevated active:scale-[0.98] transition-all duration-250' : 'transition-all duration-200'}
        ${accent === 'terracotta' ? 'accent-left' : ''}
        ${accent === 'green' ? 'accent-left-green' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
