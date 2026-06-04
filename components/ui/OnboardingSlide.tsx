import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FadeIn from '../animations/FadeIn';
import BounceDrop from '../animations/BounceDrop';

interface OnboardingSlideProps {
  title: string;
  subtitle: string;
  emoji: string;
  gradientColors: string[];
}

const { width } = Dimensions.get('window');

export default function OnboardingSlide({ title, subtitle, emoji, gradientColors }: OnboardingSlideProps) {
  return (
    <LinearGradient colors={gradientColors} style={{ width, flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
      <BounceDrop>
        <Text className="text-8xl mb-8">{emoji}</Text>
      </BounceDrop>
      <FadeIn delay={200}>
        <Text className="text-white text-3xl font-bold text-center mb-4">{title}</Text>
      </FadeIn>
      <FadeIn delay={400}>
        <Text className="text-white/80 text-lg text-center leading-7">{subtitle}</Text>
      </FadeIn>
    </LinearGradient>
  );
}
