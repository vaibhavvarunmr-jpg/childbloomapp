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
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedChildId === child.id
              ? 'bg-primary-500 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <BabyIcon className="w-4 h-4" />
          {child.name || 'Baby'}
        </button>
      ))}
    </div>
  );
}
