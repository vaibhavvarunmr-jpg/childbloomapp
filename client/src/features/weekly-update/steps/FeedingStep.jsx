import { getAgeInMonths } from '../../../lib/formatters';

export default function FeedingStep({ formData, updateField, child }) {
  const ageMonths = child?.date_of_birth ? getAgeInMonths(child.date_of_birth) : 6;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-semibold text-gray-900">Feeding</h3>
        <p className="text-sm text-gray-500 mt-1">How was feeding this week?</p>
      </div>

      {/* Feeding Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Feeding type</label>
        <div className="grid grid-cols-2 gap-2">
          {['Breast milk', 'Formula', 'Mixed', 'Solids only'].map((type) => (
            <button
              key={type}
              onClick={() => updateField('feeding_type', type)}
              className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                formData.feeding_type === type
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Breastfeed frequency */}
      {(formData.feeding_type === 'Breast milk' || formData.feeding_type === 'Mixed') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breastfeeding sessions per day
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={formData.breastfeed_times}
            onChange={(e) => updateField('breastfeed_times', e.target.value)}
            className="input-field"
            placeholder="e.g. 8"
          />
        </div>
      )}

      {/* Solid foods */}
      {ageMonths >= 4 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Solid foods this week
          </label>
          <textarea
            value={formData.solid_foods}
            onChange={(e) => updateField('solid_foods', e.target.value)}
            placeholder="e.g. Ragi porridge, mashed banana, dal water..."
            className="input-field min-h-[80px] resize-none"
            rows={3}
          />
        </div>
      )}

      {/* Food reactions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Any food reactions or concerns?
        </label>
        <textarea
          value={formData.food_reactions}
          onChange={(e) => updateField('food_reactions', e.target.value)}
          placeholder="Any allergies, rashes, digestion issues..."
          className="input-field min-h-[60px] resize-none"
          rows={2}
        />
      </div>

      {/* Water intake for 6m+ */}
      {ageMonths >= 6 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Water intake</label>
          <input
            type="text"
            value={formData.water_intake}
            onChange={(e) => updateField('water_intake', e.target.value)}
            className="input-field"
            placeholder="e.g. 2-3 sips with meals"
          />
        </div>
      )}
    </div>
  );
}
