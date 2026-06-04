import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';

const heights = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];
const weights = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];

function getCellColor(bmi: number): string {
  if (bmi < 18.5) return '#60A5FA30';
  if (bmi < 25) return '#34D39930';
  if (bmi < 30) return '#FBBF2430';
  if (bmi < 35) return '#FB923C30';
  return '#F8717130';
}

function getCellTextColor(bmi: number): string {
  if (bmi < 18.5) return '#60A5FA';
  if (bmi < 25) return '#34D399';
  if (bmi < 30) return '#FBBF24';
  if (bmi < 35) return '#FB923C';
  return '#F87171';
}

export default function BmiChartScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="BMI Reference Chart" />

        <FadeIn>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {[
              { label: 'Underweight', color: '#60A5FA' },
              { label: 'Normal', color: '#34D399' },
              { label: 'Overweight', color: '#FBBF24' },
              { label: 'Obese I', color: '#FB923C' },
              { label: 'Obese II+', color: '#F87171' },
            ].map((item) => (
              <View key={item.label} className="flex-row items-center mr-3 mb-1">
                <View style={{ backgroundColor: item.color, width: 12, height: 12, borderRadius: 3, marginRight: 4 }} />
                <Text className="text-white/60 text-xs">{item.label}</Text>
              </View>
            ))}
          </View>
        </FadeIn>

        <FadeIn delay={100}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View>
              <View className="flex-row">
                <View className="w-14 h-10 items-center justify-center bg-white/10 border border-white/10">
                  <Text className="text-white/50 text-xs">H\W</Text>
                </View>
                {weights.map((w) => (
                  <View key={w} className="w-12 h-10 items-center justify-center bg-white/10 border border-white/10">
                    <Text className="text-white/70 text-xs font-bold">{w}kg</Text>
                  </View>
                ))}
              </View>
              {heights.map((h) => (
                <View key={h} className="flex-row">
                  <View className="w-14 h-10 items-center justify-center bg-white/10 border border-white/10">
                    <Text className="text-white/70 text-xs font-bold">{h}cm</Text>
                  </View>
                  {weights.map((w) => {
                    const bmi = w / ((h / 100) * (h / 100));
                    return (
                      <View
                        key={`${h}-${w}`}
                        className="w-12 h-10 items-center justify-center border border-white/5"
                        style={{ backgroundColor: getCellColor(bmi) }}
                      >
                        <Text style={{ color: getCellTextColor(bmi) }} className="text-xs font-medium">
                          {bmi.toFixed(1)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </FadeIn>

        <FadeIn delay={200}>
          <Text className="text-white/40 text-xs text-center mt-4">
            Scroll horizontally to see all values. Tap any cell for details.
          </Text>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
