import React, { ReactNode } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring, useReducedMotion,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ScalePressProps {
  children: ReactNode;
  onPress?: () => void;
  scale?: number;
  disabled?: boolean;
  style?: ViewStyle;
  className?: string;
}

export default function ScalePress({
  children, onPress, scale = 0.96, disabled = false, style, className,
}: ScalePressProps) {
  const reduceMotion = useReducedMotion();
  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        if (!reduceMotion) {
          scaleValue.value = withTiming(scale, { duration: 100 });
        }
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      onPressOut={() => {
        scaleValue.value = withSpring(1, { damping: 15, stiffness: 150 });
      }}
      onPress={disabled ? undefined : onPress}
      style={[animatedStyle, style]}
      className={className}
      disabled={disabled}
      accessibilityRole="button"
    >
      {children}
    </AnimatedPressable>
  );
}
