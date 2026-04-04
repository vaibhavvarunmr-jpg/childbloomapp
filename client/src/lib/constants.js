export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  AUTH_CALLBACK: '/auth/callback',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  CHILD: '/child/:id',
  WEEKLY_UPDATE: '/child/:id/weekly-update',
  UPDATE_HISTORY: '/child/:id/updates',
  GROWTH: '/child/:id/growth',
  FOOD: '/child/:id/food',
  HEALTH: '/child/:id/health',
  GUIDES: '/guides',
  GUIDE_DETAIL: '/guides/:stage',
  ASK: '/ask',
  SETTINGS: '/settings',
};

export const MOODS = [
  { value: 'very_happy', label: 'Very Happy', color: '#10B981' },
  { value: 'happy', label: 'Happy', color: '#34D399' },
  { value: 'neutral', label: 'Okay', color: '#FBBF24' },
  { value: 'cranky', label: 'Cranky', color: '#F97316' },
  { value: 'crying', label: 'Lots of Crying', color: '#EF4444' },
];

export const SLEEP_QUALITY = [
  { value: 'great', label: 'Great' },
  { value: 'okay', label: 'Okay' },
  { value: 'poor', label: 'Poor' },
];

export const MEAL_TYPES = [
  { value: 'breast_milk', label: 'Breast Milk' },
  { value: 'formula', label: 'Formula' },
  { value: 'solid', label: 'Solid Food' },
  { value: 'snack', label: 'Snack' },
];

export const RECORD_TYPES = [
  { value: 'vaccination', label: 'Vaccination' },
  { value: 'checkup', label: 'Checkup' },
  { value: 'illness', label: 'Illness' },
  { value: 'milestone', label: 'Milestone' },
];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const GUIDE_STAGES = [
  { slug: 'pregnancy', title: 'Pregnancy', ageRange: 'Prenatal', description: 'Nutrition, bonding, and prenatal development week by week' },
  { slug: 'newborn', title: 'Newborn', ageRange: '0–3 months', description: 'Feeding, sleep, brain development, and what to expect' },
  { slug: 'infant', title: 'Infant', ageRange: '3–12 months', description: 'Milestones, solid food introduction, and attachment' },
  { slug: 'toddler', title: 'Toddler', ageRange: '1–3 years', description: 'Language explosion, emotional development, and discipline' },
  { slug: 'preschool', title: 'Preschool', ageRange: '3–5 years', description: 'Social skills, school readiness, and play-based learning' },
  { slug: 'early-childhood', title: 'Early Childhood', ageRange: '5–7 years', description: 'Moral development, reading, and independence' },
];
