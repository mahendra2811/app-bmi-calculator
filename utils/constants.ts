import { UserSettings } from '../types';

export const STORAGE_KEYS = {
  HISTORY: '@bmi_history',
  SETTINGS: '@bmi_settings',
  THEME: '@bmi_theme',
  ONBOARDING: '@bmi_onboarding_completed',
  RATING: '@bmi_app_rating',
} as const;

export const DEFAULT_SETTINGS: UserSettings = {
  name: '',
  unitSystem: 'metric',
  theme: 'dark',
  hapticEnabled: true,
  reminderEnabled: false,
  onboardingCompleted: false,
};

export const BMI_RANGES = {
  MIN: 10,
  MAX: 50,
  NORMAL_MIN: 18.5,
  NORMAL_MAX: 24.9,
} as const;

export const ACTIVITY_LEVELS = [
  { key: 'sedentary', label: 'Sedentary', description: 'Little or no exercise', multiplier: 1.2 },
  { key: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week', multiplier: 1.375 },
  { key: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
  { key: 'active', label: 'Active', description: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
  { key: 'very_active', label: 'Very Active', description: 'Very hard exercise, physical job', multiplier: 1.9 },
] as const;

export const APP_CONFIG = {
  name: 'BMI Calculator',
  version: '1.0.0',
  supportEmail: 'support@bmicalculator.app',
} as const;
