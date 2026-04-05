import Button from '../ui/Button';

export default function EmptyState({ title, description, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in-up">
      {icon && (
        <div className="w-16 h-16 bg-forest-50 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-forest-500">{icon}</div>
        </div>
      )}
      <h3 className="text-h3 font-serif text-forest-700 mb-2">{title}</h3>
      <p className="text-body text-gray-500 max-w-sm mb-8 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg">{actionLabel}</Button>
      )}
    </div>
  );
}
