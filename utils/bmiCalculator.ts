import { BMICategory } from '../types';

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 16.0) {
    return { name: 'Severe Thinness', color: '#60A5FA', emoji: '🔵', description: 'Your BMI indicates severe thinness. This can be associated with serious health risks. Please consult a healthcare provider.', range: { min: 0, max: 16.0 } };
  } else if (bmi < 17.0) {
    return { name: 'Moderate Thinness', color: '#60A5FA', emoji: '🔵', description: 'Your BMI indicates moderate thinness. Consider consulting a healthcare provider about healthy weight gain strategies.', range: { min: 16.0, max: 17.0 } };
  } else if (bmi < 18.5) {
    return { name: 'Mild Thinness', color: '#93C5FD', emoji: '💙', description: 'Your BMI indicates you are slightly underweight. A balanced diet with adequate calories can help you reach a healthier weight.', range: { min: 17.0, max: 18.5 } };
  } else if (bmi < 25.0) {
    return { name: 'Normal', color: '#34D399', emoji: '✅', description: 'Your BMI is within the normal range. Keep maintaining your healthy lifestyle with balanced nutrition and regular exercise.', range: { min: 18.5, max: 25.0 } };
  } else if (bmi < 30.0) {
    return { name: 'Overweight', color: '#FBBF24', emoji: '⚠️', description: 'Your BMI indicates you are overweight. Consider adopting healthier eating habits and increasing physical activity.', range: { min: 25.0, max: 30.0 } };
  } else if (bmi < 35.0) {
    return { name: 'Obese Class I', color: '#FB923C', emoji: '🟠', description: 'Your BMI indicates Class I obesity. This increases health risks. Consult a healthcare provider for personalized guidance.', range: { min: 30.0, max: 35.0 } };
  } else if (bmi < 40.0) {
    return { name: 'Obese Class II', color: '#F87171', emoji: '🔴', description: 'Your BMI indicates Class II obesity. This significantly increases health risks. Please seek medical advice.', range: { min: 35.0, max: 40.0 } };
  } else {
    return { name: 'Obese Class III', color: '#EF4444', emoji: '🚨', description: 'Your BMI indicates Class III obesity. This is associated with very high health risks. Please consult a healthcare provider immediately.', range: { min: 40.0, max: 100.0 } };
  }
}

export function calculateBMIPrime(bmi: number): number {
  return bmi / 25;
}

export function calculatePonderalIndex(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM * heightM);
}

export function calculateBodyFatPercentage(bmi: number, age: number, gender: 'male' | 'female'): number {
  const genderVal = gender === 'male' ? 1 : 0;
  return (1.20 * bmi) + (0.23 * age) - (10.8 * genderVal) - 5.4;
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
}

export function calculateIdealWeight(heightCm: number, gender: 'male' | 'female'): { devine: number; robinson: number; miller: number } {
  const inches = heightCm / 2.54;
  const over60 = Math.max(0, inches - 60);

  if (gender === 'male') {
    return {
      devine: 50 + 2.3 * over60,
      robinson: 52 + 1.9 * over60,
      miller: 56.2 + 1.41 * over60,
    };
  } else {
    return {
      devine: 45.5 + 2.3 * over60,
      robinson: 49 + 1.7 * over60,
      miller: 53.1 + 1.36 * over60,
    };
  }
}

export function calculateHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: 18.5 * heightM * heightM,
    max: 24.9 * heightM * heightM,
  };
}

export function calculateWeightToChange(weightKg: number, heightCm: number): { amount: number; direction: 'lose' | 'gain' | 'none' } {
  const bmi = calculateBMI(weightKg, heightCm);
  const range = calculateHealthyWeightRange(heightCm);

  if (bmi < 18.5) {
    return { amount: Math.round((range.min - weightKg) * 10) / 10, direction: 'gain' };
  } else if (bmi > 24.9) {
    return { amount: Math.round((weightKg - range.max) * 10) / 10, direction: 'lose' };
  }
  return { amount: 0, direction: 'none' };
}

export function calculateDailyCalories(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return bmr * (multipliers[activityLevel] || 1.2);
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

export function lbsToKg(lbs: number): number {
  return lbs / 2.20462;
}
