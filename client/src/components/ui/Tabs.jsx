export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex bg-gray-100/80 rounded-2xl p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
            activeTab === tab.value
              ? 'bg-white text-gray-900 shadow-soft'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/40'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
