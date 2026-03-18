import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
}

export default function PageHeader({ title, showBack = true }: PageHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center py-4 mb-2">
      {showBack && (
        <Pressable
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          className="w-10 h-10 items-center justify-center rounded-full bg-white/10 mr-3"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Text className="text-white text-lg">←</Text>
        </Pressable>
      )}
      <Text className="text-white text-xl font-bold flex-1">{title}</Text>
    </View>
  );
}
