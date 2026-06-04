import React, { ReactNode } from 'react';
import { View } from 'react-native';
import FadeIn from '../animations/FadeIn';
import ScalePress from '../animations/ScalePress';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  onPress?: () => void;
}

export default function AnimatedCard({ children, delay = 0, className = '', onPress }: AnimatedCardProps) {
  const cardContent = (
    <View className={`bg-white/[0.08] border border-white/[0.12] rounded-3xl p-5 ${className}`}>
      {children}
    </View>
  );

  return (
    <FadeIn delay={delay}>
      {onPress ? (
        <ScalePress onPress={onPress}>{cardContent}</ScalePress>
      ) : (
        cardContent
      )}
    </FadeIn>
  );
}
