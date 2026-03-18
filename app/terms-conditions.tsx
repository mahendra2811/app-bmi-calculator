import React from 'react';
import { View, Text } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { termsAndConditions } from '../utils/legalContent';

export default function TermsConditionsScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="Terms & Conditions" />
        <FadeIn>
          <Text className="text-white/40 text-xs mb-4">Last Updated: {termsAndConditions.lastUpdated}</Text>
        </FadeIn>
        {termsAndConditions.sections.map((section, index) => (
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
