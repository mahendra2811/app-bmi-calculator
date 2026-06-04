import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScalePress from '../animations/ScalePress';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[];
  disabled?: boolean;
  className?: string;
  icon?: string;
}

export default function GradientButton({
  title, onPress, colors = ['#667EEA', '#764BA2'], disabled = false, className = '', icon,
}: GradientButtonProps) {
  return (
    <ScalePress onPress={onPress} disabled={disabled} className={className}>
      <LinearGradient
        colors={disabled ? ['#555', '#444'] : colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 9999, paddingHorizontal: 32, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text className="text-white text-lg font-bold text-center">
          {icon ? `${icon} ` : ''}{title}
        </Text>
      </LinearGradient>
    </ScalePress>
  );
}
