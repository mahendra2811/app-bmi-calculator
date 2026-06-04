import React, { useEffect, ReactNode } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withDelay, useReducedMotion,
} from 'react-native-reanimated';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
}

export default function SlideUp({ children, delay = 0 }: SlideUpProps) {
  const reduceMotion = useReducedMotion();
  const translateY = useSharedValue(reduceMotion ? 0 : 100);

  useEffect(() => {
    if (!reduceMotion) {
      translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100, mass: 1 }));
    }
  }, [delay, reduceMotion, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
