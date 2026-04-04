export default function Skeleton({ className = '', variant = 'rect' }) {
  const variants = {
    rect: 'rounded-2xl',
    circle: 'rounded-full',
    text: 'rounded-lg h-4',
  };

  return (
    <div className={`skeleton ${variants[variant]} ${className}`} aria-hidden="true" />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100/80 p-6 space-y-4 shadow-soft">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-10 w-24 rounded-2xl" />
        <Skeleton className="h-10 w-24 rounded-2xl" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-4 stagger-children">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
