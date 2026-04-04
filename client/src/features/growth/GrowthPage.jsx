import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useChildById } from '../../hooks/useChild';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Modal from '../../components/ui/Modal';
import { SkeletonCard } from '../../components/ui/Skeleton';
import EmptyState from '../../components/shared/EmptyState';
import { formatDate, formatWeight, formatHeight } from '../../lib/formatters';
import { GrowthIcon, PlusIcon } from '../../assets/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import whoWeightBoys from '../../data/who-growth/weight-for-age-boys.json';
import whoWeightGirls from '../../data/who-growth/weight-for-age-girls.json';
import whoHeightBoys from '../../data/who-growth/height-for-age-boys.json';
import whoHeightGirls from '../../data/who-growth/height-for-age-girls.json';

const TABS = [
  { value: 'weight', label: 'Weight' },
  { value: 'height', label: 'Height' },
];

export default function GrowthPage() {
  const { id: childId } = useParams();
  const { data: child } = useChildById(childId);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('weight');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ record_date: new Date().toISOString().split('T')[0], weight_kg: '', height_cm: '', head_circumference_cm: '' });

  const { data: records, isLoading } = useQuery({
    queryKey: ['growth-records', childId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('growth_records')
        .select('*')
        .eq('child_id', childId)
        .order('record_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('growth_records').insert({
        child_id: childId,
        user_id: user.id,
        record_date: formData.record_date,
        weight_kg: formData.weight_kg || null,
        height_cm: formData.height_cm || null,
        head_circumference_cm: formData.head_circumference_cm || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growth-records'] });
      setShowForm(false);
      setFormData({ record_date: new Date().toISOString().split('T')[0], weight_kg: '', height_cm: '', head_circumference_cm: '' });
    },
  });

  const gender = child?.gender || 'male';
  const whoWeight = gender === 'female' ? whoWeightGirls : whoWeightBoys;
  const whoHeight = gender === 'female' ? whoHeightGirls : whoHeightBoys;

  const chartData = (records || []).map((r, i) => ({
    name: formatDate(r.record_date),
    month: i,
    weight: r.weight_kg ? parseFloat(r.weight_kg) : null,
    height: r.height_cm ? parseFloat(r.height_cm) : null,
  }));

  if (isLoading) return <SkeletonCard />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Growth Chart</h1>
        <Button onClick={() => setShowForm(true)} size="sm" className="flex-shrink-0">
          <PlusIcon className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Chart */}
      {chartData.length > 0 ? (
        <Card className="p-3 sm:p-4 -mx-1 sm:mx-0">
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} width={35} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px', padding: '8px 12px' }}
              />
              <Line
                type="monotone"
                dataKey={activeTab}
                stroke="#1D9E75"
                strokeWidth={2}
                dot={{ fill: '#1D9E75', r: 3 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      ) : (
        <EmptyState
          title="No growth data yet"
          description="Add your first measurement to start tracking growth."
          actionLabel="Add Measurement"
          onAction={() => setShowForm(true)}
          icon={<GrowthIcon className="w-8 h-8" />}
        />
      )}

      {/* Records Table */}
      {records && records.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full text-xs sm:text-sm min-w-[320px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-2.5 sm:p-4 font-medium text-gray-500">Date</th>
                  <th className="text-left p-2.5 sm:p-4 font-medium text-gray-500">Weight</th>
                  <th className="text-left p-2.5 sm:p-4 font-medium text-gray-500">Height</th>
                  <th className="text-left p-2.5 sm:p-4 font-medium text-gray-500">Head</th>
                </tr>
              </thead>
              <tbody>
                {[...records].reverse().map((r) => (
                  <tr key={r.id} className="border-b border-gray-50">
                    <td className="p-2.5 sm:p-4 text-gray-900 whitespace-nowrap">{formatDate(r.record_date)}</td>
                    <td className="p-2.5 sm:p-4 text-gray-600">{formatWeight(r.weight_kg)}</td>
                    <td className="p-2.5 sm:p-4 text-gray-600">{formatHeight(r.height_cm)}</td>
                    <td className="p-2.5 sm:p-4 text-gray-600">{r.head_circumference_cm ? `${r.head_circumference_cm} cm` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Measurement Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Measurement">
        <div className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={formData.record_date}
            onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
          />
          <Input
            label="Weight (kg)"
            type="number"
            step="0.1"
            value={formData.weight_kg}
            onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
            placeholder="e.g. 7.5"
          />
          <Input
            label="Height (cm)"
            type="number"
            step="0.1"
            value={formData.height_cm}
            onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
            placeholder="e.g. 68.0"
          />
          <Input
            label="Head Circumference (cm)"
            type="number"
            step="0.1"
            value={formData.head_circumference_cm}
            onChange={(e) => setFormData({ ...formData, head_circumference_cm: e.target.value })}
            placeholder="e.g. 43.0"
          />
          <Button
            onClick={() => addMutation.mutate()}
            loading={addMutation.isPending}
            className="w-full"
          >
            Save Measurement
          </Button>
        </div>
      </Modal>
    </div>
  );
}
