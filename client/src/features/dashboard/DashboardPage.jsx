import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useSelectedChild } from '../../hooks/useChild';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { SkeletonCard } from '../../components/ui/Skeleton';
import ChildSwitcher from '../../components/shared/ChildSwitcher';
import AgeDisplay from '../../components/shared/AgeDisplay';
import EmptyState from '../../components/shared/EmptyState';
import { formatAge, formatWeight, formatHeight, formatDate, formatPregnancyWeek } from '../../lib/formatters';
import { ClipboardIcon, GrowthIcon, FoodIcon, BookIcon, ChatIcon, HealthIcon, ChevronRightIcon, BabyIcon } from '../../assets/icons';
import { differenceInDays } from 'date-fns';

export default function DashboardPage() {
  const navigate = useNavigate();
  const child = useSelectedChild();
  const profile = useAuthStore((s) => s.profile);

  const { data: latestUpdate, isLoading: updateLoading } = useQuery({
    queryKey: ['latest-update', child?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('weekly_updates')
        .select('*')
        .eq('child_id', child.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      return data;
    },
    enabled: !!child?.id,
  });

  const { data: latestGrowth } = useQuery({
    queryKey: ['latest-growth', child?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('growth_records')
        .select('*')
        .eq('child_id', child.id)
        .order('record_date', { ascending: false })
        .limit(1)
        .single();
      return data;
    },
    enabled: !!child?.id,
  });

  if (!child) {
    return (
      <EmptyState
        title="No children added yet"
        description="Add your child or pregnancy to get started with tracking."
        actionLabel="Go to Settings"
        onAction={() => navigate('/settings')}
        icon={<BabyIcon className="w-8 h-8" />}
      />
    );
  }

  const quickLinks = [
    { label: 'Weekly Update', icon: ClipboardIcon, to: `/child/${child.id}/weekly-update`, color: 'from-primary-50 to-emerald-50', iconColor: 'text-primary-600' },
    { label: 'Growth Chart', icon: GrowthIcon, to: `/child/${child.id}/growth`, color: 'from-sky-50 to-blue-50', iconColor: 'text-sky-600' },
    { label: 'Food Tracker', icon: FoodIcon, to: `/child/${child.id}/food`, color: 'from-amber-50 to-orange-50', iconColor: 'text-amber-600' },
    { label: 'Health Records', icon: HealthIcon, to: `/child/${child.id}/health`, color: 'from-rose-50 to-pink-50', iconColor: 'text-rose-600' },
    { label: 'Guides', icon: BookIcon, to: '/guides', color: 'from-violet-50 to-purple-50', iconColor: 'text-violet-600' },
    { label: 'Ask AI', icon: ChatIcon, to: '/ask', color: 'from-teal-50 to-cyan-50', iconColor: 'text-teal-600' },
  ];

  if (child.is_pregnant) {
    return <PregnancyDashboard child={child} profile={profile} navigate={navigate} quickLinks={quickLinks} />;
  }

  return (
    <div className="space-y-6 stagger-children">
      <ChildSwitcher />

      {/* Hero Card */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-white via-primary-50/30 to-emerald-50/40 border-primary-100/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-200/20 to-emerald-200/20 rounded-full blur-2xl -translate-y-8 translate-x-8" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 truncate">{child.name}</h2>
            <AgeDisplay child={child} />
            {latestUpdate && (
              <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                Last update: {formatDate(latestUpdate.created_at)}
              </p>
            )}
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-soft animate-float flex-shrink-0">
            <BabyIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      {(latestGrowth || latestUpdate) && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'Weight', value: formatWeight(latestGrowth?.weight_kg || latestUpdate?.weight_kg), gradient: 'from-sky-50 to-blue-50', dot: 'bg-sky-400' },
            { label: 'Height', value: formatHeight(latestGrowth?.height_cm || latestUpdate?.height_cm), gradient: 'from-violet-50 to-purple-50', dot: 'bg-violet-400' },
            { label: 'Mood', value: latestUpdate?.mood?.replace('_', ' ') || '—', gradient: 'from-amber-50 to-orange-50', dot: 'bg-amber-400' },
          ].map((stat) => (
            <Card key={stat.label} className={`p-3 sm:p-4 text-center bg-gradient-to-br ${stat.gradient} border-transparent`}>
              <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1 sm:mb-1.5 flex items-center justify-center gap-1">
                <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${stat.dot} rounded-full`} />
                {stat.label}
              </p>
              <p className="text-base sm:text-lg font-bold text-gray-900 capitalize truncate">{stat.value}</p>
            </Card>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <Button
        onClick={() => navigate(`/child/${child.id}/weekly-update`)}
        className="w-full shadow-glow"
        size="lg"
      >
        <ClipboardIcon className="w-5 h-5 mr-2" />
        Log This Week
      </Button>

      {/* AI Tip */}
      {latestUpdate?.ai_insight && (
        <Card className="p-6 bg-gradient-to-br from-primary-50/80 via-emerald-50/50 to-teal-50/30 border-primary-100/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary-200/20 rounded-full blur-xl" />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600/70 mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Insight for {child.name}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{latestUpdate.ai_insight}</p>
          </div>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {quickLinks.map((link) => (
          <Card
            key={link.to}
            hover
            className="p-3 sm:p-4 group active:scale-95 transition-transform"
            onClick={() => navigate(link.to)}
          >
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 bg-gradient-to-br ${link.color} group-hover:scale-105 transition-transform duration-300`}>
              <link.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${link.iconColor}`} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">{link.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PregnancyDashboard({ child, profile, navigate, quickLinks }) {
  const pregnancy = formatPregnancyWeek(child.due_date);
  const daysUntilDue = differenceInDays(new Date(child.due_date), new Date());
  const progress = Math.min((pregnancy.weeks / 40) * 100, 100);

  return (
    <div className="space-y-6 stagger-children">
      <ChildSwitcher />

      {/* Pregnancy Hero */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary-50 via-emerald-50/60 to-teal-50/40 border-primary-100/50 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-primary-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-emerald-200/15 rounded-full blur-2xl" />
        <div className="relative">
          <Badge variant="primary" className="mb-2 sm:mb-3">Trimester {pregnancy.trimester}</Badge>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Week {pregnancy.weeks}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {daysUntilDue > 0 ? `${daysUntilDue} days until due date` : 'Due date has passed'}
          </p>

          {/* Progress Bar */}
          <div className="mt-5 bg-white/60 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span className="font-medium">Progress</span>
              <span className="font-bold text-primary-600">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner-soft">
              <div
                className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-emerald-400 rounded-full transition-all duration-1000 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse-soft rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Button
        onClick={() => navigate(`/child/${child.id}/weekly-update`)}
        className="w-full shadow-glow"
        size="lg"
      >
        <ClipboardIcon className="w-5 h-5 mr-2" />
        Weekly Check-in
      </Button>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {quickLinks.map((link) => (
          <Card key={link.to} hover className="p-3 sm:p-4 group active:scale-95 transition-transform" onClick={() => navigate(link.to)}>
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 bg-gradient-to-br ${link.color} group-hover:scale-105 transition-transform duration-300`}>
              <link.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${link.iconColor}`} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">{link.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
