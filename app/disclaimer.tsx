import React from 'react';
import { View, Text } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { medicalDisclaimer } from '../utils/legalContent';

export default function DisclaimerScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="Medical Disclaimer" />
        <FadeIn>
          <View className="bg-accent-500/20 border border-accent-500/30 rounded-2xl p-4 mb-6">
            <Text className="text-accent-400 text-lg font-bold text-center">⚠️ Important</Text>
            <Text className="text-white/80 text-sm text-center mt-2">
              This app is for informational purposes only and is not a substitute for professional medical advice.
            </Text>
          </View>
        </FadeIn>
        {medicalDisclaimer.sections.map((section, index) => (
          <FadeIn key={index} delay={index * 50}>
            <View className="mb-5">
              <Text className="text-white text-lg font-bold mb-2">{section.title}</Text>
              <Text className="text-white/70 text-sm leading-6">{section.content}</Text>
            </View>
          </FadeIn>
        ))}
      </SafeContainer>
    </GradientBackground>
  );
}
