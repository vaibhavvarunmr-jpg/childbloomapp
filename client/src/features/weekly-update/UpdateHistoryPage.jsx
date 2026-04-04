import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { SkeletonList } from '../../components/ui/Skeleton';
import EmptyState from '../../components/shared/EmptyState';
import { formatDate, formatWeight, formatHeight } from '../../lib/formatters';
import { ClipboardIcon, ChevronRightIcon } from '../../assets/icons';

export default function UpdateHistoryPage() {
  const { id: childId } = useParams();
  const navigate = useNavigate();

  const { data: updates, isLoading } = useQuery({
    queryKey: ['weekly-updates', childId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weekly_updates')
        .select('*')
        .eq('child_id', childId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return <SkeletonList count={4} />;

  if (!updates?.length) {
    return (
      <EmptyState
        title="No updates yet"
        description="Start your weekly check-in to track your child's development."
        actionLabel="Log This Week"
        onAction={() => navigate(`/child/${childId}/weekly-update`)}
        icon={<ClipboardIcon className="w-8 h-8" />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Weekly Updates</h1>
        <Button onClick={() => navigate(`/child/${childId}/weekly-update`)} size="sm">
          New Update
        </Button>
      </div>

      <div className="space-y-3">
        {updates.map((update) => (
          <Card key={update.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">{formatDate(update.week_date || update.created_at)}</p>
                  {update.mood && (
                    <Badge variant="primary" className="capitalize">{update.mood.replace('_', ' ')}</Badge>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  {update.weight_kg && <span>{formatWeight(update.weight_kg)}</span>}
                  {update.height_cm && <span>{formatHeight(update.height_cm)}</span>}
                  {update.sleep_hours && <span>{update.sleep_hours}h sleep</span>}
                </div>
                {update.ai_insight && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{update.ai_insight}</p>
                )}
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
