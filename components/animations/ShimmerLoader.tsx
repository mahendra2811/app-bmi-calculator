import React, { useEffect } from 'react';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming,
  useReducedMotion,
} from 'react-native-reanimated';

interface ShimmerLoaderProps {
  width: number;
  height: number;
  borderRadius?: number;
}

export default function ShimmerLoader({ width, height, borderRadius = 12 }: ShimmerLoaderProps) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (!reduceMotion) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 800 }),
          withTiming(0.3, { duration: 800 }),
        ),
        -1, true,
      );
    }
  }, [reduceMotion, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width,
    height,
    borderRadius,
    backgroundColor: 'rgba(255,255,255,0.1)',
  }));

  return <Animated.View style={animatedStyle} />;
}
