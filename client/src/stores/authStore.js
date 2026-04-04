import { create } from 'zustand';

const useAuthStore = create((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: true,

  setSession: (session) => set({
    session,
    user: session?.user || null,
    isLoading: false,
  }),

  setProfile: (profile) => set({ profile }),

  clearSession: () => set({
    session: null,
    user: null,
    profile: null,
    isLoading: false,
  }),

  setLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;
