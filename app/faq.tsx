import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { faqData } from '../utils/faqData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function FAQScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded((prev) => (prev === index ? null : index));
  }, []);

  return (
    <GradientBackground>
      <SafeContainer scrollable={false}>
        <PageHeader title="FAQ" />
        <FlatList
          data={faqData}
          keyExtractor={(_, i) => String(i)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item, index }) => (
            <FadeIn delay={index * 30}>
              <View className="bg-white/[0.08] border border-white/[0.12] rounded-2xl mb-3 overflow-hidden">
                <Pressable onPress={() => toggle(index)} className="p-4 flex-row justify-between items-center">
                  <Text className="text-white font-semibold flex-1 pr-2">{item.question}</Text>
                  <Text className="text-white/40">{expanded === index ? '▲' : '▼'}</Text>
                </Pressable>
                {expanded === index && (
                  <FadeIn>
                    <View className="px-4 pb-4">
                      <View className="h-px bg-white/10 mb-3" />
                      <Text className="text-white/70 text-sm leading-6">{item.answer}</Text>
                    </View>
                  </FadeIn>
                )}
              </View>
            </FadeIn>
          )}
        />
      </SafeContainer>
    </GradientBackground>
  );
}
