import React from 'react';
import { View, Text } from 'react-native';
import FadeIn from '../animations/FadeIn';

interface CategoryBadgeProps {
  name: string;
  color: string;
  emoji: string;
}

export default function CategoryBadge({ name, color, emoji }: CategoryBadgeProps) {
  return (
    <FadeIn>
      <View
        className="rounded-full px-4 py-2 flex-row items-center self-center"
        style={{ backgroundColor: color + '25' }}
      >
        <Text className="text-base mr-2">{emoji}</Text>
        <Text style={{ color }} className="font-bold text-sm">{name}</Text>
      </View>
    </FadeIn>
  );
}
