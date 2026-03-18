import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { PanResponder } from 'react-native';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  altUnit?: string;
  onValueChange: (v: number) => void;
  onUnitToggle?: () => void;
  showUnitToggle?: boolean;
}

export default function SliderInput({
  label, value, min, max, step, unit, altUnit, onValueChange, onUnitToggle, showUnitToggle = false,
}: SliderInputProps) {
  const progress = (value - min) / (max - min);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const { locationX } = evt.nativeEvent;
          updateValue(locationX);
        },
        onPanResponderMove: (evt) => {
          const { locationX } = evt.nativeEvent;
          updateValue(locationX);
        },
      }),
    [min, max, step, onValueChange]
  );

  const updateValue = (locationX: number) => {
    const trackWidth = 300;
    const ratio = Math.max(0, Math.min(1, locationX / trackWidth));
    const rawValue = min + ratio * (max - min);
    const stepped = Math.round(rawValue / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    onValueChange(clamped);
  };

  return (
    <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl p-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white/70 text-sm">{label}</Text>
        {showUnitToggle && altUnit && (
          <Pressable onPress={onUnitToggle} className="bg-white/10 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-medium">{unit} | {altUnit}</Text>
          </Pressable>
        )}
      </View>
      <Text className="text-white text-4xl font-bold text-center mb-4">
        {Math.round(value * 10) / 10}
        <Text className="text-white/50 text-lg"> {unit}</Text>
      </Text>
      <View className="h-8 justify-center" {...panResponder.panHandlers}>
        <View className="h-2 bg-white/10 rounded-full overflow-hidden">
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: '100%', width: `${progress * 100}%`, borderRadius: 9999 }}
          />
        </View>
        <View
          style={{ left: `${progress * 100}%`, marginLeft: -12 }}
          className="absolute w-6 h-6 rounded-full bg-white border-2 border-primary-500 shadow-lg"
        />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-white/40 text-xs">{min}</Text>
        <Text className="text-white/40 text-xs">{max}</Text>
      </View>
    </View>
  );
}
