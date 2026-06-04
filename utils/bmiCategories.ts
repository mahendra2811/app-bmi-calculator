import { BMICategory } from '../types';

export const BMI_CATEGORIES: BMICategory[] = [
  { name: 'Severe Thinness', color: '#60A5FA', emoji: '🔵', description: 'Severe thinness — serious health risks', range: { min: 0, max: 16.0 } },
  { name: 'Moderate Thinness', color: '#60A5FA', emoji: '🔵', description: 'Moderate thinness — consider weight gain', range: { min: 16.0, max: 17.0 } },
  { name: 'Mild Thinness', color: '#93C5FD', emoji: '💙', description: 'Slightly underweight', range: { min: 17.0, max: 18.5 } },
  { name: 'Normal', color: '#34D399', emoji: '✅', description: 'Healthy weight range', range: { min: 18.5, max: 25.0 } },
  { name: 'Overweight', color: '#FBBF24', emoji: '⚠️', description: 'Slightly above healthy range', range: { min: 25.0, max: 30.0 } },
  { name: 'Obese Class I', color: '#FB923C', emoji: '🟠', description: 'Moderate obesity', range: { min: 30.0, max: 35.0 } },
  { name: 'Obese Class II', color: '#F87171', emoji: '🔴', description: 'Severe obesity', range: { min: 35.0, max: 40.0 } },
  { name: 'Obese Class III', color: '#EF4444', emoji: '🚨', description: 'Very severe obesity', range: { min: 40.0, max: 100.0 } },
];

export const BMI_COLORS = {
  underweight: '#60A5FA',
  normal: '#34D399',
  overweight: '#FBBF24',
  obese1: '#FB923C',
  obese2: '#F87171',
  obese3: '#EF4444',
};
