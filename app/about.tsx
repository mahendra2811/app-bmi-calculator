import React from 'react';
import { View, Text } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import AnimatedCard from '../components/ui/AnimatedCard';
import FadeIn from '../components/animations/FadeIn';
import StaggerList from '../components/animations/StaggerList';

const features = [
  { emoji: '📐', title: 'Precise Calculations', desc: '11 health metrics including BMI, BMR, body fat %' },
  { emoji: '📈', title: 'Track Progress', desc: 'Save history and visualize your health journey' },
  { emoji: '💡', title: 'Health Tips', desc: '30+ personalized tips for better health' },
  { emoji: '🔒', title: 'Privacy First', desc: 'All data stored locally on your device' },
];

const techStack = ['Expo', 'React Native', 'TypeScript', 'NativeWind', 'Reanimated'];

export default function AboutScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="About" />

        <FadeIn>
          <View className="items-center mb-8">
            <Text className="text-6xl mb-4">📊</Text>
            <Text className="text-white text-3xl font-bold">BMI Calculator</Text>
            <Text className="text-white/50 text-sm mt-1">v1.0.0</Text>
            <Text className="text-white/70 text-base mt-2">Your personal health companion</Text>
          </View>
        </FadeIn>

        <StaggerList staggerDelay={100}>
          {features.map((f) => (
            <AnimatedCard key={f.title} className="mb-3">
              <View className="flex-row items-center">
                <Text className="text-3xl mr-4">{f.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-white font-bold">{f.title}</Text>
                  <Text className="text-white/60 text-sm">{f.desc}</Text>
                </View>
              </View>
            </AnimatedCard>
          ))}
        </StaggerList>

        <FadeIn delay={500}>
          <View className="items-center mt-6">
            <Text className="text-white/50 text-sm">Made with ❤️ by Mahendra</Text>
            <Text className="text-white/40 text-xs mt-1">Built with React Native & Expo</Text>

            <View className="flex-row flex-wrap justify-center gap-2 mt-4">
              {techStack.map((tech) => (
                <View key={tech} className="bg-white/10 rounded-full px-3 py-1">
                  <Text className="text-white/70 text-xs">{tech}</Text>
                </View>
              ))}
            </View>

            <Text className="text-white/30 text-xs mt-6">
              © 2024 BMI Calculator. All rights reserved.
            </Text>
          </View>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
