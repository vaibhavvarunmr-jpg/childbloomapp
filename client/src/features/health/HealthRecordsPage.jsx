import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useChildById } from '../../hooks/useChild';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import { SkeletonList } from '../../components/ui/Skeleton';
import EmptyState from '../../components/shared/EmptyState';
import { formatDate } from '../../lib/formatters';
import { HealthIcon, PlusIcon, TrashIcon } from '../../assets/icons';
import { RECORD_TYPES } from '../../lib/constants';

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'vaccination', label: 'Vaccines' },
  { value: 'checkup', label: 'Checkups' },
  { value: 'illness', label: 'Illness' },
];

export default function HealthRecordsPage() {
  const { id: childId } = useParams();
  const { data: child } = useChildById(childId);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    record_date: new Date().toISOString().split('T')[0],
    record_type: 'vaccination',
    title: '',
    doctor_name: '',
    clinic_name: '',
    notes: '',
    next_due_date: '',
  });

  const { data: records, isLoading } = useQuery({
    queryKey: ['health-records', childId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .eq('child_id', childId)
        .order('record_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('health_records').insert({
        child_id: childId,
        user_id: user.id,
        record_date: formData.record_date,
        record_type: formData.record_type,
        title: formData.title,
        doctor_name: formData.doctor_name || null,
        clinic_name: formData.clinic_name || null,
        notes: formData.notes || null,
        next_due_date: formData.next_due_date || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-records'] });
      setShowForm(false);
      setFormData({ record_date: new Date().toISOString().split('T')[0], record_type: 'vaccination', title: '', doctor_name: '', clinic_name: '', notes: '', next_due_date: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('health_records').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['health-records'] }),
  });

  if (isLoading) return <SkeletonList count={4} />;

  const filtered = activeTab === 'all'
    ? (records || [])
    : (records || []).filter((r) => r.record_type === activeTab);

  const typeBadgeVariant = (type) => {
    const map = { vaccination: 'info', checkup: 'primary', illness: 'danger', milestone: 'success' };
    return map[type] || 'default';
  };

  const typeLabel = (type) => RECORD_TYPES.find((r) => r.value === type)?.label || type;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Health Records</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">{child?.name || 'Your child'}'s medical history</p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm" className="flex-shrink-0">
          <PlusIcon className="w-4 h-4 sm:mr-1" /> <span className="hidden sm:inline">Add Record</span><span className="sm:hidden">Add</span>
        </Button>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {filtered.length === 0 ? (
        <EmptyState
          title="No health records yet"
          description="Keep track of vaccinations, doctor visits, and health events."
          actionLabel="Add Record"
          onAction={() => setShowForm(true)}
          icon={<HealthIcon className="w-8 h-8" />}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((record) => (
            <Card key={record.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{record.title}</p>
                    <Badge variant={typeBadgeVariant(record.record_type)}>
                      {typeLabel(record.record_type)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(record.record_date)}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    {record.doctor_name && <span>Dr. {record.doctor_name}</span>}
                    {record.clinic_name && <span>{record.clinic_name}</span>}
                  </div>
                  {record.notes && (
                    <p className="text-xs text-gray-500 mt-2">{record.notes}</p>
                  )}
                  {record.next_due_date && (
                    <p className="text-xs text-primary-600 mt-1">Next due: {formatDate(record.next_due_date)}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteMutation.mutate(record.id)}
                  className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Health Record">
        <div className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={formData.record_date}
            onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Record Type</label>
            <div className="grid grid-cols-2 gap-2">
              {RECORD_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, record_type: type.value })}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                    formData.record_type === type.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Title"
            placeholder="e.g. BCG Vaccine, 6-month checkup"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            label="Doctor Name (optional)"
            placeholder="e.g. Dr. Sharma"
            value={formData.doctor_name}
            onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
          />
          <Input
            label="Clinic / Hospital (optional)"
            placeholder="e.g. Apollo Clinic"
            value={formData.clinic_name}
            onChange={(e) => setFormData({ ...formData, clinic_name: e.target.value })}
          />
          <Input
            label="Notes (optional)"
            placeholder="Any observations or instructions"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <Input
            label="Next Due Date (optional)"
            type="date"
            value={formData.next_due_date}
            onChange={(e) => setFormData({ ...formData, next_due_date: e.target.value })}
          />
          <Button
            onClick={() => addMutation.mutate()}
            loading={addMutation.isPending}
            disabled={!formData.title.trim()}
            className="w-full"
          >
            Save Record
          </Button>
        </div>
      </Modal>
    </div>
  );
}
