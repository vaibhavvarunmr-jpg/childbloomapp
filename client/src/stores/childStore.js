import { create } from 'zustand';

const useChildStore = create((set) => ({
  selectedChildId: null,
  children: [],

  setSelectedChildId: (id) => set({ selectedChildId: id }),
  setChildren: (children) => set({ children }),

  getSelectedChild: () => {
    const state = useChildStore.getState();
    return state.children.find(c => c.id === state.selectedChildId) || state.children[0] || null;
  },
}));

export default useChildStore;
