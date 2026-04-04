import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, format, formatDistanceToNow } from 'date-fns';

export function formatAge(dateOfBirth) {
  if (!dateOfBirth) return '';
  const now = new Date();
  const dob = new Date(dateOfBirth);
  const days = differenceInDays(now, dob);
  const weeks = differenceInWeeks(now, dob);
  const months = differenceInMonths(now, dob);
  const years = differenceInYears(now, dob);

  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} old`;
  if (weeks < 8) return `${weeks} week${weeks !== 1 ? 's' : ''} old`;
  if (months < 24) return `${months} month${months !== 1 ? 's' : ''} old`;
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''} old`;
  return `${years}y ${remainingMonths}m old`;
}

export function formatAgeInDays(dateOfBirth) {
  if (!dateOfBirth) return 0;
  return differenceInDays(new Date(), new Date(dateOfBirth));
}

export function formatPregnancyWeek(dueDate) {
  if (!dueDate) return '';
  const due = new Date(dueDate);
  const now = new Date();
  const totalDays = 280;
  const daysUntilDue = differenceInDays(due, now);
  const daysPassed = totalDays - daysUntilDue;
  const weeks = Math.floor(daysPassed / 7);
  const days = daysPassed % 7;
  return { weeks: Math.max(0, weeks), days: Math.max(0, days), trimester: weeks < 13 ? 1 : weeks < 27 ? 2 : 3 };
}

export function formatDate(date) {
  if (!date) return '';
  return format(new Date(date), 'MMM d, yyyy');
}

export function formatRelativeDate(date) {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatWeight(kg) {
  if (!kg) return '—';
  return `${Number(kg).toFixed(1)} kg`;
}

export function formatHeight(cm) {
  if (!cm) return '—';
  return `${Number(cm).toFixed(1)} cm`;
}

export function getAgeStage(dateOfBirth) {
  if (!dateOfBirth) return 'newborn';
  const months = differenceInMonths(new Date(), new Date(dateOfBirth));
  if (months < 3) return 'newborn';
  if (months < 12) return 'infant';
  if (months < 36) return 'toddler';
  if (months < 60) return 'preschool';
  return 'early-childhood';
}

export function getAgeInMonths(dateOfBirth) {
  if (!dateOfBirth) return 0;
  return differenceInMonths(new Date(), new Date(dateOfBirth));
}
