import { useMemo } from 'react';
import { BMIResult } from '../types';
import {
  calculateBMI, getBMICategory, calculateBMIPrime, calculatePonderalIndex,
  calculateBodyFatPercentage, calculateBMR, calculateIdealWeight,
  calculateHealthyWeightRange, calculateWeightToChange,
} from '../utils/bmiCalculator';

export function useBMI(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female'): BMIResult {
  return useMemo(() => {
    const bmi = calculateBMI(weightKg, heightCm);
    const category = getBMICategory(bmi);
    const bmiPrime = calculateBMIPrime(bmi);
    const ponderalIndex = calculatePonderalIndex(weightKg, heightCm);
    const bodyFatPercentage = calculateBodyFatPercentage(bmi, age, gender);
    const bmr = calculateBMR(weightKg, heightCm, age, gender);
    const idealWeight = calculateIdealWeight(heightCm, gender);
    const healthyWeightRange = calculateHealthyWeightRange(heightCm);
    const weightToChange = calculateWeightToChange(weightKg, heightCm);

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      bmiPrime: Math.round(bmiPrime * 100) / 100,
      ponderalIndex: Math.round(ponderalIndex * 10) / 10,
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      bmr: Math.round(bmr),
      idealWeight: {
        devine: Math.round(idealWeight.devine * 10) / 10,
        robinson: Math.round(idealWeight.robinson * 10) / 10,
        miller: Math.round(idealWeight.miller * 10) / 10,
      },
      healthyWeightRange: {
        min: Math.round(healthyWeightRange.min * 10) / 10,
        max: Math.round(healthyWeightRange.max * 10) / 10,
      },
      weightToChange,
    };
  }, [weightKg, heightCm, age, gender]);
}
