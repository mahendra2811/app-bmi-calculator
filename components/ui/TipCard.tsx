import React from 'react';
import { View, Text } from 'react-native';
import AnimatedCard from './AnimatedCard';

interface TipCardProps {
  tip: { id: string; title: string; description: string; emoji: string; category: string };
  delay?: number;
  onPress?: () => void;
}

export default function TipCard({ tip, delay = 0, onPress }: TipCardProps) {
  return (
    <AnimatedCard delay={delay} onPress={onPress} className="mb-3">
      <View className="flex-row items-center">
        <Text className="text-3xl mr-4">{tip.emoji}</Text>
        <View className="flex-1">
          <Text className="text-white font-bold text-base">{tip.title}</Text>
          <Text className="text-white/60 text-sm mt-1" numberOfLines={2}>{tip.description}</Text>
        </View>
      </View>
    </AnimatedCard>
  );
}
