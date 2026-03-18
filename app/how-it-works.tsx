import React from 'react';
import { View, Text } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import AnimatedCard from '../components/ui/AnimatedCard';

const categories = [
  { name: 'Severe Thinness', range: '< 16.0', color: '#60A5FA' },
  { name: 'Moderate Thinness', range: '16.0 - 16.9', color: '#60A5FA' },
  { name: 'Mild Thinness', range: '17.0 - 18.4', color: '#93C5FD' },
  { name: 'Normal', range: '18.5 - 24.9', color: '#34D399' },
  { name: 'Overweight', range: '25.0 - 29.9', color: '#FBBF24' },
  { name: 'Obese Class I', range: '30.0 - 34.9', color: '#FB923C' },
  { name: 'Obese Class II', range: '35.0 - 39.9', color: '#F87171' },
  { name: 'Obese Class III', range: '≥ 40.0', color: '#EF4444' },
];

export default function HowItWorksScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="How BMI Works" />

        <FadeIn>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">What is BMI?</Text>
            <Text className="text-white/70 text-sm leading-6">
              Body Mass Index (BMI) is a simple calculation using a person's height and weight. It provides a reliable indicator of body fatness for most people and is used to screen for weight categories that may lead to health problems.
            </Text>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={100}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">The Formula</Text>
            <View className="bg-white/10 rounded-2xl p-4 items-center my-2">
              <Text className="text-primary-300 text-lg font-mono font-bold">BMI = weight(kg) / height(m)²</Text>
            </View>
            <Text className="text-white/70 text-sm leading-6 mt-2">
              For example, a person weighing 70kg with a height of 1.75m would have a BMI of 70 / (1.75 × 1.75) = 22.9.
            </Text>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={200}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">History of BMI</Text>
            <Text className="text-white/70 text-sm leading-6">
              BMI was devised by Belgian mathematician Adolphe Quetelet between 1830 and 1850. Originally called the "Quetelet Index," it was designed as a quick and simple way to measure the degree of obesity in the general population to assist the government in allocating resources. The modern term "Body Mass Index" was coined in 1972 by Ancel Keys.
            </Text>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={300}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-3">BMI Categories (WHO)</Text>
            {categories.map((cat, i) => (
              <View key={i} className="flex-row items-center py-2 border-b border-white/10">
                <View style={{ backgroundColor: cat.color, width: 4, height: 24, borderRadius: 2, marginRight: 12 }} />
                <Text className="text-white flex-1 text-sm">{cat.name}</Text>
                <Text className="text-white/60 text-sm">{cat.range}</Text>
              </View>
            ))}
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={400}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">Limitations of BMI</Text>
            <Text className="text-white/70 text-sm leading-6">
              {`• Does not distinguish between muscle mass and fat mass\n• May overestimate body fat in athletes\n• May underestimate body fat in older persons\n• Does not account for bone density differences\n• Does not consider fat distribution patterns\n• May not apply equally across all ethnic groups\n• Not suitable for children without age-specific charts`}
            </Text>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={500}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">Alternatives to BMI</Text>
            <Text className="text-white/70 text-sm leading-6">
              {`• Waist circumference: measures central obesity\n• Waist-to-hip ratio: compares waist and hip measurements\n• Body fat percentage: via calipers, BIA, or DEXA scans\n• Waist-to-height ratio: simple and effective predictor`}
            </Text>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={600}>
          <AnimatedCard className="mb-4">
            <Text className="text-white text-lg font-bold mb-2">When to See a Doctor</Text>
            <Text className="text-white/70 text-sm leading-6">
              Consult a healthcare professional if your BMI falls outside the normal range, if you have concerns about your weight or body composition, if you are planning significant dietary or exercise changes, or if you have existing health conditions that may be affected by your weight.
            </Text>
          </AnimatedCard>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
