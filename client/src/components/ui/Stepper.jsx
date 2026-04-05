export default function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 mb-6 sm:mb-8 px-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={() => onStepClick?.(index)}
            disabled={index > currentStep}
            className={`relative w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 flex-shrink-0 ${
              index < currentStep
                ? 'bg-forest-600 text-white'
                : index === currentStep
                ? 'bg-terracotta-400 text-white ring-2 sm:ring-[3px] ring-terracotta-50'
                : 'bg-cream-200 text-gray-400'
            }`}
            aria-label={`Step ${index + 1}: ${step}`}
          >
            {index < currentStep ? (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              index + 1
            )}
          </button>
          {index < steps.length - 1 && (
            <div className="w-4 sm:w-10 h-[2px] mx-0.5">
              <div className={`h-full rounded-full transition-all duration-500 ${
                index < currentStep ? 'bg-forest-400' : 'bg-cream-300'
              }`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
