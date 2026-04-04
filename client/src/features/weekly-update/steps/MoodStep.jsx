import { MOODS, SLEEP_QUALITY } from '../../../lib/constants';

export default function MoodStep({ formData, updateField }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-serif font-semibold text-gray-900">How were they this week?</h3>
        <p className="text-sm text-gray-500 mt-1">Select the overall mood</p>
      </div>

      {/* Mood Selector */}
      <div className="grid grid-cols-5 gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            onClick={() => updateField('mood', mood.value)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
              formData.mood === mood.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: mood.color + '20' }}
            >
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: mood.color }} />
            </div>
            <span className="text-xs font-medium text-gray-700">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Sleep Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Average sleep per day: <span className="text-primary-600">{formData.sleep_hours}h</span>
        </label>
        <input
          type="range"
          min="0"
          max="18"
          step="0.5"
          value={formData.sleep_hours}
          onChange={(e) => updateField('sleep_hours', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0h</span>
          <span>18h</span>
        </div>
      </div>

      {/* Sleep Quality */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Sleep quality</label>
        <div className="flex gap-3">
          {SLEEP_QUALITY.map((sq) => (
            <button
              key={sq.value}
              onClick={() => updateField('sleep_quality', sq.value)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                formData.sleep_quality === sq.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {sq.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
