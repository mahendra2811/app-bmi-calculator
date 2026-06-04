import React from 'react';
import { View, Text } from 'react-native';

export default function AdBannerPlaceholder() {
  return (
    <View className="h-[50px] bg-white/[0.05] border border-white/10 rounded-xl items-center justify-center mt-4">
      <Text className="text-white/30 text-xs">Ad Space</Text>
    </View>
  );
}
