import React from 'react';
import { Text } from 'react-native';
import ScalePress from '../animations/ScalePress';

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <ScalePress onPress={onPress}>
      <Text
        className={`rounded-full px-4 py-2 text-sm mr-2 overflow-hidden ${
          active ? 'bg-primary-500 text-white font-bold' : 'bg-white/10 text-white/70'
        }`}
      >
        {label}
      </Text>
    </ScalePress>
  );
}
