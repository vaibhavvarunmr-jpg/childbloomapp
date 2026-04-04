import { AlertIcon } from '../../assets/icons';

export default function MedicalDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs text-gray-400 text-center">
        ChildBloom is an informational tool and does not replace professional medical advice.
      </p>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
      <AlertIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-amber-800">Medical Disclaimer</p>
        <p className="text-xs text-amber-600 mt-1">
          ChildBloom is an informational tool and does not replace professional medical advice. Always consult your pediatrician for health concerns.
        </p>
      </div>
    </div>
  );
}
