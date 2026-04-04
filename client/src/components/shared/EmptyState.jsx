import Button from '../ui/Button';

export default function EmptyState({ title, description, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in-up">
      {icon && (
        <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-3xl flex items-center justify-center mb-6 animate-float">
          <div className="text-primary-500">{icon}</div>
        </div>
      )}
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg">{actionLabel}</Button>
      )}
    </div>
  );
}
