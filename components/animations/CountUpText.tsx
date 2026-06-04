import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

interface CountUpTextProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUpText({
  value, decimals = 1, prefix = '', suffix = '', duration = 1000, className = '',
}: CountUpTextProps) {
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }
    const startTime = Date.now();
    const startValue = 0;
    const diff = value - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + diff * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration, reduceMotion]);

  return (
    <Text className={className}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </Text>
  );
}
