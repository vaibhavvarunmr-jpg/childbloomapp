export default function Card({ children, className = '', hover = false, onClick, gradient = false, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-3xl border border-gray-100/80 shadow-soft
        ${hover ? 'hover-lift cursor-pointer press-effect hover:border-gray-200/80 hover:shadow-soft-md' : ''}
        ${gradient ? 'bg-gradient-to-br' : ''}
        transition-all duration-300
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
