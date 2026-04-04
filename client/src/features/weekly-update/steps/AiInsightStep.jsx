import Button from '../../../components/ui/Button';

export default function AiInsightStep({ insight, loading, childName, onRetry }) {
  if (loading) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-primary-400 rounded-full thinking-dot" />
          <div className="w-3 h-3 bg-primary-400 rounded-full thinking-dot" />
          <div className="w-3 h-3 bg-primary-400 rounded-full thinking-dot" />
        </div>
        <p className="text-sm text-gray-500">
          Thinking about {childName || 'your child'}'s week...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-semibold text-gray-900">Your Weekly Insight</h3>
        <p className="text-sm text-gray-500 mt-1">Here's what we observed this week</p>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {insight}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="ghost" size="sm" onClick={onRetry}>
          Regenerate
        </Button>
      </div>
    </div>
  );
}
