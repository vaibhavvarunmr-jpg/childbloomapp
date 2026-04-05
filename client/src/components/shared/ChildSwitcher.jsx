import useChildStore from '../../stores/childStore';
import { BabyIcon } from '../../assets/icons';

export default function ChildSwitcher() {
  const { children, selectedChildId, setSelectedChildId } = useChildStore();

  if (children.length <= 1) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {children.map((child) => (
        <button
          key={child.id}
          onClick={() => setSelectedChildId(child.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-caption font-semibold transition-all duration-200 ${
            selectedChildId === child.id
              ? 'bg-forest-700 text-white shadow-subtle'
              : 'bg-white text-gray-600 border border-cream-300 hover:border-forest-200'
          }`}
        >
          <BabyIcon className="w-4 h-4" />
          {child.name || 'Baby'}
        </button>
      ))}
    </div>
  );
}
