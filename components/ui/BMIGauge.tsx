import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Line, G } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withSpring } from 'react-native-reanimated';

interface BMIGaugeProps {
  bmi: number;
  category: { name: string; color: string; emoji: string };
}

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function BMIGauge({ bmi, category }: BMIGaugeProps) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2 + 20;
  const radius = 110;

  const segments = [
    { min: 0, max: 16, color: '#60A5FA' },
    { min: 16, max: 18.5, color: '#93C5FD' },
    { min: 18.5, max: 25, color: '#34D399' },
    { min: 25, max: 30, color: '#FBBF24' },
    { min: 30, max: 35, color: '#FB923C' },
    { min: 35, max: 40, color: '#F87171' },
    { min: 40, max: 50, color: '#EF4444' },
  ];

  const bmiToAngle = (val: number): number => {
    const clamped = Math.max(10, Math.min(50, val));
    return ((clamped - 10) / 40) * 180;
  };

  const needleAngle = useSharedValue(0);

  useEffect(() => {
    needleAngle.value = withSpring(bmiToAngle(bmi), { damping: 12, stiffness: 80 });
  }, [bmi, needleAngle]);

  const describeArc = (startAngle: number, endAngle: number, r: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const animatedNeedleProps = useAnimatedProps(() => {
    const angle = ((needleAngle.value - 180) * Math.PI) / 180;
    const tipX = cx + (radius - 20) * Math.cos(angle);
    const tipY = cy + (radius - 20) * Math.sin(angle);
    return { x1: String(cx), y1: String(cy), x2: String(tipX), y2: String(tipY) };
  });

  return (
    <View className="items-center">
      <Svg width={size} height={size / 2 + 50} viewBox={`0 0 ${size} ${size / 2 + 50}`}>
        {segments.map((seg, i) => {
          const startAngle = ((seg.min - 10) / 40) * 180;
          const endAngle = ((seg.max - 10) / 40) * 180;
          return (
            <Path
              key={i}
              d={describeArc(startAngle, endAngle, radius)}
              stroke={seg.color}
              strokeWidth={20}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
        <Circle cx={cx} cy={cy} r={6} fill="#FFF" />
        <AnimatedLine
          animatedProps={animatedNeedleProps}
          stroke="#FFF"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </Svg>
      <View className="items-center -mt-6">
        <Text className="text-white text-5xl font-bold">{bmi.toFixed(1)}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-2xl mr-2">{category.emoji}</Text>
          <Text style={{ color: category.color }} className="text-lg font-bold">{category.name}</Text>
        </View>
      </View>
    </View>
  );
}
