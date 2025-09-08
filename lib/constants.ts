export const APP_CONFIG = {
  name: 'RightCheck',
  tagline: 'Know Your Rights, Instantly',
  description: 'On-demand legal checklists and emergency rights alerts for common life situations.',
  version: '1.0.0',
};

export const CATEGORIES = {
  TRAFFIC_POLICE: 'Traffic & Police',
  HOUSING_TENANTS: 'Housing & Tenants',
  EMPLOYMENT: 'Employment',
  CRIMINAL_LAW: 'Criminal Law',
  HOUSING_LAW: 'Housing Law',
  EMPLOYMENT_LAW: 'Employment Law',
} as const;

export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const PREMIUM_PRICES = {
  BASIC: '0.001',
  STANDARD: '0.002',
  PREMIUM: '0.005',
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Shield' },
  { id: 'search', label: 'Search', icon: 'BookOpen' },
  { id: 'alerts', label: 'Alerts', icon: 'Bell' },
  { id: 'profile', label: 'Profile', icon: 'User' },
] as const;
