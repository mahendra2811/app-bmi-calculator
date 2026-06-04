import React from 'react';
import { View, Text, Pressable } from 'react-native';
import ScalePress from '../animations/ScalePress';

interface AgeWheelProps {
  value: number;
  onChange: (age: number) => void;
}

export default function AgeWheel({ value, onChange }: AgeWheelProps) {
  return (
    <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl p-5">
      <Text className="text-white/70 text-sm mb-2">Age</Text>
      <View className="flex-row items-center justify-center gap-6">
        <ScalePress onPress={() => onChange(Math.max(2, value - 1))}>
          <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center">
            <Text className="text-white text-2xl font-bold">−</Text>
          </View>
        </ScalePress>
        <Text className="text-white text-5xl font-bold min-w-[80px] text-center">{value}</Text>
        <ScalePress onPress={() => onChange(Math.min(120, value + 1))}>
          <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center">
            <Text className="text-white text-2xl font-bold">+</Text>
          </View>
        </ScalePress>
      </View>
      <Text className="text-white/40 text-xs text-center mt-2">years</Text>
    </View>
  );
}
