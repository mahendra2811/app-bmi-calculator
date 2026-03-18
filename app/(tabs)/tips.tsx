import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import GradientBackground from '../../components/layout/GradientBackground';
import SafeContainer from '../../components/layout/SafeContainer';
import TipCard from '../../components/ui/TipCard';
import FilterChip from '../../components/ui/FilterChip';
import AnimatedCard from '../../components/ui/AnimatedCard';
import FadeIn from '../../components/animations/FadeIn';
import { healthTips } from '../../utils/healthTips';

const CATEGORIES = ['all', 'diet', 'exercise', 'lifestyle', 'mental_health', 'sleep'] as const;
const LABELS: Record<string, string> = {
  all: 'All', diet: 'Diet', exercise: 'Exercise',
  lifestyle: 'Lifestyle', mental_health: 'Mental Health', sleep: 'Sleep',
};

export default function TipsScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tipOfDay = healthTips[dayOfYear % healthTips.length];

  const filteredTips = useMemo(() => {
    if (activeFilter === 'all') return healthTips;
    return healthTips.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedTip((prev) => (prev === id ? null : id));
  }, []);

  return (
    <GradientBackground>
      <SafeContainer scrollable={false}>
        <FadeIn>
          <Text className="text-white text-2xl font-bold py-4 px-4">Health Tips</Text>
        </FadeIn>

        <FlatList
          data={filteredTips}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          ListHeaderComponent={
            <View>
              <AnimatedCard className="mb-4 border-primary-500/30">
                <View className="flex-row items-center mb-2">
                  <Text className="text-yellow-400 text-sm font-bold">⭐ Tip of the Day</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-3">{tipOfDay.emoji}</Text>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-base">{tipOfDay.title}</Text>
                    <Text className="text-white/60 text-sm mt-1">{tipOfDay.description}</Text>
                  </View>
                </View>
              </AnimatedCard>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat}
                    label={LABELS[cat]}
                    active={activeFilter === cat}
                    onPress={() => setActiveFilter(cat)}
                  />
                ))}
              </ScrollView>
            </View>
          }
          renderItem={({ item, index }) => (
            <View>
              <TipCard
                tip={item}
                delay={index * 50}
                onPress={() => toggleExpand(item.id)}
              />
              {expandedTip === item.id && (
                <FadeIn>
                  <View className="bg-white/[0.05] rounded-2xl p-4 mb-3 -mt-1">
                    <Text className="text-white/70 text-sm leading-6">{item.fullText}</Text>
                  </View>
                </FadeIn>
              )}
            </View>
          )}
        />
      </SafeContainer>
    </GradientBackground>
  );
}
