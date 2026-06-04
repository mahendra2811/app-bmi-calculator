import React, { useMemo, useCallback, useState } from 'react';
import { View, Text, Alert, Share, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import BMIGauge from '../components/ui/BMIGauge';
import StatCard from '../components/ui/StatCard';
import GradientButton from '../components/ui/GradientButton';
// Phase 2: import AdBannerPlaceholder from '../components/ui/AdBannerPlaceholder';
import FadeIn from '../components/animations/FadeIn';
import StaggerList from '../components/animations/StaggerList';
import { useHistory } from '../hooks/useHistory';
import {
  calculateBMI, getBMICategory, calculateBMIPrime, calculatePonderalIndex,
  calculateBodyFatPercentage, calculateBMR, calculateIdealWeight,
  calculateHealthyWeightRange, calculateWeightToChange,
} from '../utils/bmiCalculator';

export default function ResultScreen() {
  const params = useLocalSearchParams<{ gender: string; age: string; height: string; weight: string }>();
  const router = useRouter();
  const { addEntry } = useHistory();
  const [saved, setSaved] = useState(false);

  const gender = (params.gender as 'male' | 'female') || 'male';
  const age = Number(params.age) || 25;
  const heightCm = Number(params.height) || 170;
  const weightKg = Number(params.weight) || 70;

  const result = useMemo(() => {
    const bmi = calculateBMI(weightKg, heightCm);
    const category = getBMICategory(bmi);
    const bmiPrime = calculateBMIPrime(bmi);
    const ponderalIndex = calculatePonderalIndex(weightKg, heightCm);
    const bodyFat = calculateBodyFatPercentage(bmi, age, gender);
    const bmr = calculateBMR(weightKg, heightCm, age, gender);
    const idealWeight = calculateIdealWeight(heightCm, gender);
    const healthyRange = calculateHealthyWeightRange(heightCm);
    const weightChange = calculateWeightToChange(weightKg, heightCm);
    return { bmi: Math.round(bmi * 10) / 10, category, bmiPrime: Math.round(bmiPrime * 100) / 100, ponderalIndex: Math.round(ponderalIndex * 10) / 10, bodyFat: Math.round(bodyFat * 10) / 10, bmr: Math.round(bmr), idealWeight, healthyRange, weightChange };
  }, [weightKg, heightCm, age, gender]);

  const handleSave = useCallback(async () => {
    if (saved) return;
    try {
      await addEntry({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        bmi: result.bmi,
        category: result.category.name,
        weight: weightKg,
        height: heightCm,
        age,
        gender,
        unit: 'metric',
      });
      setSaved(true);
      Alert.alert('Saved!', 'Your BMI result has been saved to history.');
    } catch {
      Alert.alert('Error', 'Failed to save. Please try again.');
    }
  }, [addEntry, result, weightKg, heightCm, age, gender, saved]);

  const handleShare = useCallback(async () => {
    const message = `My BMI Results:\nBMI: ${result.bmi} (${result.category.name})\nBody Fat: ${result.bodyFat}%\nBMR: ${result.bmr} cal/day\n\nCalculated with BMI Calculator App`;
    try {
      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' && navigator.share) {
          await navigator.share({ text: message });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(message);
          Alert.alert('Copied!', 'Results copied to clipboard.');
        } else {
          Alert.alert('Share', message);
        }
      } else {
        await Share.share({ message });
      }
    } catch {
      // User cancelled share — do nothing
    }
  }, [result]);

  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="Your Results" />

        <FadeIn>
          <BMIGauge bmi={result.bmi} category={result.category} />
        </FadeIn>

        <View className="mt-6">
          <StaggerList staggerDelay={80}>
            <StatCard emoji="📊" title="Your BMI" value={result.bmi} subtitle={result.category.description} delay={0} />
            <StatCard emoji="⚖️" title="Healthy Weight Range" value={`${result.healthyRange.min.toFixed(1)} - ${result.healthyRange.max.toFixed(1)} kg`} delay={80} />
            <StatCard emoji="📈" title="BMI Prime" value={result.bmiPrime} subtitle="Ratio to upper normal limit (1.0)" delay={160} />
            <StatCard emoji="📐" title="Ponderal Index" value={`${result.ponderalIndex} kg/m³`} subtitle="Height-normalized body mass" delay={240} />
            <StatCard emoji="🔬" title="Body Fat % Estimate" value={`${result.bodyFat}%`} subtitle="Deurenberg formula estimate" delay={320} />
            <StatCard emoji="🔥" title="Daily Calorie Needs (BMR)" value={`${result.bmr} cal`} subtitle="Basal metabolic rate at rest" delay={400} />
            <StatCard emoji="🎯" title="Ideal Weight (Devine)" value={`${result.idealWeight.devine.toFixed(1)} kg`} subtitle={`Robinson: ${result.idealWeight.robinson.toFixed(1)}kg · Miller: ${result.idealWeight.miller.toFixed(1)}kg`} delay={480} />
            <StatCard
              emoji={result.weightChange.direction === 'none' ? '✅' : '🔄'}
              title="Weight to Change"
              value={result.weightChange.direction === 'none' ? 'You are in healthy range!' : `${result.weightChange.direction === 'lose' ? 'Lose' : 'Gain'} ${result.weightChange.amount.toFixed(1)} kg`}
              delay={560}
            />
          </StaggerList>
        </View>

        <FadeIn delay={700}>
          <View className="flex-row gap-3 mt-6">
            <View className="flex-1">
              <GradientButton title={saved ? '✅ Saved' : '💾 Save'} onPress={handleSave} colors={saved ? ['#6B7280', '#4B5563'] : ['#10B981', '#059669']} />
            </View>
            <View className="flex-1">
              <GradientButton title="📤 Share" onPress={handleShare} colors={['#4FACFE', '#00F2FE']} />
            </View>
          </View>
          <View className="mt-3">
            <GradientButton title="← Recalculate" onPress={() => router.back()} colors={['#667EEA', '#764BA2']} />
          </View>
        </FadeIn>

        {/* Phase 2: <AdBannerPlaceholder /> */}
      </SafeContainer>
    </GradientBackground>
  );
}
