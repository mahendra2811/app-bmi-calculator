import React from 'react';
import { View, Text } from 'react-native';
import FadeIn from '../animations/FadeIn';
import GradientButton from './GradientButton';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ emoji, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <FadeIn>
      <View className="items-center justify-center py-16">
        <Text className="text-6xl mb-6">{emoji}</Text>
        <Text className="text-white text-xl font-bold text-center mb-2">{title}</Text>
        <Text className="text-white/60 text-center text-sm mb-6 px-8">{subtitle}</Text>
        {actionLabel && onAction && (
          <GradientButton title={actionLabel} onPress={onAction} />
        )}
      </View>
    </FadeIn>
  );
}
