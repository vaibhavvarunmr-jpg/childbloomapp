import { formatAge, formatPregnancyWeek } from '../../lib/formatters';

export default function AgeDisplay({ child }) {
  if (!child) return null;

  if (child.is_pregnant) {
    const { weeks, days, trimester } = formatPregnancyWeek(child.due_date);
    return (
      <div>
        <span className="text-lg font-semibold text-gray-900">Week {weeks}</span>
        <span className="text-sm text-gray-500 ml-2">Day {days}</span>
        <span className="text-xs text-primary-600 ml-2 bg-primary-50 px-2 py-0.5 rounded-full">
          Trimester {trimester}
        </span>
      </div>
    );
  }

  return (
    <span className="text-lg font-semibold text-gray-900">
      {formatAge(child.date_of_birth)}
    </span>
  );
}
