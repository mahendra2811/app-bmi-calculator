import React, { useEffect, ReactNode } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withDelay, useReducedMotion,
} from 'react-native-reanimated';

interface BounceDropProps {
  children: ReactNode;
  delay?: number;
}

export default function BounceDrop({ children, delay = 0 }: BounceDropProps) {
  const reduceMotion = useReducedMotion();
  const translateY = useSharedValue(reduceMotion ? 0 : -50);

  useEffect(() => {
    if (!reduceMotion) {
      translateY.value = withDelay(delay, withSpring(0, { damping: 8, stiffness: 200 }));
    }
  }, [delay, reduceMotion, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
