import React, { useEffect, ReactNode } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withDelay,
  Easing, useReducedMotion,
} from 'react-native-reanimated';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export default function FadeIn({ children, delay = 0, duration = 600 }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(reduceMotion ? 1 : 0);
  const translateY = useSharedValue(reduceMotion ? 0 : 20);

  useEffect(() => {
    if (!reduceMotion) {
      opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
      translateY.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.cubic) }));
    }
  }, [delay, duration, reduceMotion, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
