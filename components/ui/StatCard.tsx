import React from 'react';
import { View, Text } from 'react-native';
import AnimatedCard from './AnimatedCard';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  emoji?: string;
  delay?: number;
  onPress?: () => void;
}

export default function StatCard({ title, value, subtitle, emoji, delay = 0, onPress }: StatCardProps) {
  return (
    <AnimatedCard delay={delay} onPress={onPress} className="mb-3">
      <View className="flex-row items-center mb-2">
        {emoji && <Text className="text-xl mr-2">{emoji}</Text>}
        <Text className="text-white/70 text-sm flex-1">{title}</Text>
      </View>
      <Text className="text-white text-2xl font-bold">{value}</Text>
      {subtitle && <Text className="text-white/50 text-xs mt-1">{subtitle}</Text>}
    </AnimatedCard>
  );
}
