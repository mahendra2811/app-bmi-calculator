import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface SettingsRowProps {
  label: string;
  emoji?: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

export default function SettingsRow({ label, emoji, value, onPress, showChevron = false, danger = false }: SettingsRowProps) {
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      className="flex-row items-center py-4 border-b border-white/10"
      accessibilityRole="button"
    >
      {emoji && <Text className="text-lg mr-3">{emoji}</Text>}
      <Text className={`flex-1 text-base ${danger ? 'text-red-400' : 'text-white'}`}>{label}</Text>
      {value && <Text className="text-white/50 text-sm mr-2">{value}</Text>}
      {showChevron && <Text className="text-white/40 text-base">›</Text>}
    </Pressable>
  );
}
