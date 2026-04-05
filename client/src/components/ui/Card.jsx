export default function Card({ children, className = '', hover = false, onClick, accent, ...props }) {
  return (
    <div
      className={`
        rounded-3xl border transition-all duration-300
        ${hover
          ? 'cursor-pointer active:scale-[0.98] hover:-translate-y-0.5'
          : ''
        }
        ${accent === 'terracotta' || accent === 'rose' ? 'border-l-[3px] border-l-rose-400' : ''}
        ${accent === 'green' ? 'border-l-[3px] border-l-forest-400' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: hover
          ? undefined
          : 'rgba(255, 255, 255, 0.65)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.055), 0 0 0 1px rgba(255,255,255,0.7)',
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(255,255,255,0.75)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.055), 0 0 0 1px rgba(255,255,255,0.7)';
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
