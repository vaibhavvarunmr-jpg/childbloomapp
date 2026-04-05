export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex bg-cream-200/60 rounded-xl p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 px-4 py-2.5 text-caption font-semibold rounded-lg transition-all duration-200 ${
            activeTab === tab.value
              ? 'bg-white text-forest-700 shadow-card'
              : 'text-gray-500 hover:text-forest-600 hover:bg-white/40'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
