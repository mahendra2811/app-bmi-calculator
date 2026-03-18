import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: (val: boolean) => void;
  label?: string;
}

export default function ToggleSwitch({ value, onToggle, label }: ToggleSwitchProps) {
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(value ? 22 : 0, { duration: 200 }) }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(value ? '#667EEA' : 'rgba(255,255,255,0.2)', { duration: 200 }),
  }));

  return (
    <View className="flex-row items-center justify-between">
      {label && <Text className="text-white text-base flex-1">{label}</Text>}
      <Pressable
        onPress={() => {
          if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onToggle(!value);
        }}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      >
        <Animated.View style={[trackStyle, { width: 50, height: 28, borderRadius: 14, padding: 2, justifyContent: 'center' }]}>
          <Animated.View style={[thumbStyle, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFF' }]} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
