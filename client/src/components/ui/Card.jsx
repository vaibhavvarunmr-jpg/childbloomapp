// 30% color (#E8C4B8) — cards, sections
export default function Card({ children, className = '', hover = false, onClick, accent, ...props }) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-300 ease-out
        ${hover ? 'cursor-pointer hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(232, 196, 184, 0.38)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.65)',
        boxShadow: hover
          ? undefined
          : '0 2px 12px rgba(61,43,35,0.05), 0 0 0 1px rgba(255,255,255,0.5)',
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(61,43,35,0.08), 0 0 0 1px rgba(255,255,255,0.7)';
        e.currentTarget.style.borderColor = 'rgba(143,186,200,0.35)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(61,43,35,0.05), 0 0 0 1px rgba(255,255,255,0.5)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)';
      } : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
