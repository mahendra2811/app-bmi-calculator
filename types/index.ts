export interface BMIResult {
  bmi: number;
  category: BMICategory;
  bmiPrime: number;
  ponderalIndex: number;
  bodyFatPercentage: number;
  bmr: number;
  idealWeight: { devine: number; robinson: number; miller: number };
  healthyWeightRange: { min: number; max: number };
  weightToChange: { amount: number; direction: 'lose' | 'gain' | 'none' };
}

export interface BMICategory {
  name: string;
  color: string;
  emoji: string;
  description: string;
  range: { min: number; max: number };
}

export interface HistoryEntry {
  id: string;
  date: string;
  bmi: number;
  category: string;
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export interface UserSettings {
  name: string;
  unitSystem: 'metric' | 'imperial';
  theme: 'dark' | 'light';
  hapticEnabled: boolean;
  reminderEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  fullText: string;
  category: 'diet' | 'exercise' | 'lifestyle' | 'mental_health' | 'sleep';
  emoji: string;
  bmiCategories: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OnboardingSlide {
  title: string;
  subtitle: string;
  emoji: string;
  gradientColors: string[];
}
