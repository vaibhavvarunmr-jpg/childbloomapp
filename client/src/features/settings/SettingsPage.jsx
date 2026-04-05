import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import useAuthStore from '../../stores/authStore';
import useChildStore from '../../stores/childStore';
import { useAuth } from '../../hooks/useAuth';
import { useChildren } from '../../hooks/useChild';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { UserIcon, BabyIcon, PlusIcon, TrashIcon, LogoutIcon, SettingsIcon } from '../../assets/icons';
import { formatAge, formatDate } from '../../lib/formatters';
import { GENDERS } from '../../lib/constants';

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { signOut, updateProfile } = useAuth();
  const { data: children } = useChildren();
  const { setSelectedChildId } = useChildStore();
  const queryClient = useQueryClient();

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(profile?.full_name || '');
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({
    name: '',
    childType: 'born',
    date_of_birth: '',
    gender: 'male',
    due_date: '',
  });

  const profileMutation = useMutation({
    mutationFn: () => updateProfile({ full_name: profileName }),
    onSuccess: () => setEditingProfile(false),
  });

  const addChildMutation = useMutation({
    mutationFn: async () => {
      const data = {
        user_id: user.id,
        name: childForm.name || (childForm.childType === 'pregnant' ? 'Baby' : 'My Child'),
        is_pregnant: childForm.childType === 'pregnant',
        gender: childForm.childType === 'born' ? childForm.gender : null,
        date_of_birth: childForm.childType === 'born' ? childForm.date_of_birth : null,
        due_date: childForm.childType === 'pregnant' ? childForm.due_date : null,
      };
      const { error } = await supabase.from('children').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
      setShowAddChild(false);
      setChildForm({ name: '', childType: 'born', date_of_birth: '', gender: 'male', due_date: '' });
    },
  });

  const deleteChildMutation = useMutation({
    mutationFn: async (childId) => {
      const { error } = await supabase.from('children').delete().eq('id', childId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    },
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-h1 font-serif text-forest-700">Settings</h1>

      {/* Profile Section */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-forest-600" />
          </div>
          <h2 className="text-h3 font-serif text-forest-700">Profile</h2>
        </div>

        {editingProfile ? (
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={() => profileMutation.mutate()} loading={profileMutation.isPending} size="sm">
                Save
              </Button>
              <Button variant="ghost" onClick={() => setEditingProfile(false)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-micro text-gray-400 uppercase tracking-wider">Name</p>
                <p className="text-caption font-medium text-forest-700">{profile?.full_name || 'Not set'}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setProfileName(profile?.full_name || ''); setEditingProfile(true); }}>
                Edit
              </Button>
            </div>
            <div>
              <p className="text-micro text-gray-400 uppercase tracking-wider">Email</p>
              <p className="text-caption font-medium text-forest-700">{user?.email}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Children Section */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <BabyIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-h3 font-serif text-forest-700">Children</h2>
          </div>
          <Button size="sm" onClick={() => setShowAddChild(true)}>
            <PlusIcon className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3">
          {(children || []).map((child) => (
            <div key={child.id} className="flex items-center justify-between p-3.5 bg-cream-100 rounded-xl">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => { setSelectedChildId(child.id); navigate('/dashboard'); }}
              >
                <div className="flex items-center gap-2">
                  <p className="text-caption font-semibold text-forest-700">{child.name}</p>
                  {child.is_pregnant && <Badge variant="primary">Expecting</Badge>}
                </div>
                <p className="text-micro text-gray-400">
                  {child.is_pregnant
                    ? `Due: ${formatDate(child.due_date)}`
                    : `${formatAge(child.date_of_birth)} — ${child.gender || 'Unknown'}`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Remove ${child.name}? This will also delete their records.`)) {
                    deleteChildMutation.mutate(child.id);
                  }
                }}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
          {(!children || children.length === 0) && (
            <p className="text-caption text-gray-400 text-center py-4">No children added yet.</p>
          )}
        </div>
      </Card>

      {/* About */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-cream-200 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-gray-500" />
          </div>
          <h2 className="text-h3 font-serif text-forest-700">About</h2>
        </div>
        <div className="space-y-2 text-caption text-gray-500">
          <p>ChildBloom v1.0.0</p>
          <p>A child development companion for Indian parents.</p>
          <p className="text-micro text-gray-400">
            This app provides general guidance based on WHO and IAP recommendations.
            It is not a substitute for professional medical advice.
          </p>
        </div>
      </Card>

      {/* Sign Out */}
      <Button variant="danger" onClick={handleSignOut} className="w-full" size="lg">
        <LogoutIcon className="w-5 h-5 mr-2" /> Sign Out
      </Button>

      {/* Add Child Modal */}
      <Modal isOpen={showAddChild} onClose={() => setShowAddChild(false)} title="Add a Child">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setChildForm({ ...childForm, childType: 'born' })}
              className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                childForm.childType === 'born' ? 'border-forest-500 bg-forest-50' : 'border-cream-300'
              }`}
            >
              <p className="text-caption font-semibold text-forest-700">Born child</p>
            </button>
            <button
              onClick={() => setChildForm({ ...childForm, childType: 'pregnant' })}
              className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                childForm.childType === 'pregnant' ? 'border-forest-500 bg-forest-50' : 'border-cream-300'
              }`}
            >
              <p className="text-caption font-semibold text-forest-700">Expecting</p>
            </button>
          </div>
          <Input
            label="Name"
            placeholder="Child's name"
            value={childForm.name}
            onChange={(e) => setChildForm({ ...childForm, name: e.target.value })}
          />
          {childForm.childType === 'born' ? (
            <>
              <Input
                label="Date of Birth"
                type="date"
                value={childForm.date_of_birth}
                onChange={(e) => setChildForm({ ...childForm, date_of_birth: e.target.value })}
              />
              <div className="space-y-1.5">
                <label className="block text-caption font-semibold text-forest-700">Gender</label>
                <div className="flex gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setChildForm({ ...childForm, gender: g.value })}
                      className={`flex-1 py-2.5 rounded-xl text-caption font-medium border-2 transition-all duration-200 ${
                        childForm.gender === g.value
                          ? 'border-forest-500 bg-forest-50 text-forest-700'
                          : 'border-cream-300 text-gray-600'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Input
              label="Expected Due Date"
              type="date"
              value={childForm.due_date}
              onChange={(e) => setChildForm({ ...childForm, due_date: e.target.value })}
            />
          )}
          <Button
            onClick={() => addChildMutation.mutate()}
            loading={addChildMutation.isPending}
            disabled={childForm.childType === 'born' ? !childForm.date_of_birth : !childForm.due_date}
            className="w-full"
          >
            Add Child
          </Button>
        </div>
      </Modal>
    </div>
  );
}
