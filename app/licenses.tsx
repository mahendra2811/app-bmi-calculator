import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';

const licenses = [
  { name: 'expo', version: '~55.0.0', license: 'MIT' },
  { name: 'react-native', version: '0.83.x', license: 'MIT' },
  { name: 'nativewind', version: '^4.0', license: 'MIT' },
  { name: 'react-native-reanimated', version: '4.x', license: 'MIT' },
  { name: 'react-native-gesture-handler', version: '~2.30.0', license: 'MIT' },
  { name: 'react-native-svg', version: '15.x', license: 'MIT' },
  { name: 'react-native-chart-kit', version: '^6.12.0', license: 'MIT' },
  { name: '@react-native-async-storage/async-storage', version: '2.x', license: 'MIT' },
  { name: 'expo-haptics', version: '~55.0.0', license: 'MIT' },
  { name: 'expo-linear-gradient', version: '~55.0.0', license: 'MIT' },
  { name: 'expo-router', version: '~55.0.0', license: 'MIT' },
  { name: 'expo-sharing', version: '~55.0.0', license: 'MIT' },
  { name: 'date-fns', version: '^4.1.0', license: 'MIT' },
  { name: 'tailwindcss', version: '^3.4.0', license: 'MIT' },
];

const MIT_TEXT = 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.';

export default function LicensesScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <GradientBackground>
      <SafeContainer scrollable={false}>
        <PageHeader title="Open Source Licenses" />

        <FadeIn>
          <Text className="text-white/60 text-sm mb-4 px-4">
            This app is built with amazing open source software. Thank you to all contributors!
          </Text>
        </FadeIn>

        <FlatList
          data={licenses}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item, index }) => (
            <FadeIn delay={index * 30}>
              <Pressable onPress={() => setExpanded((p) => p === item.name ? null : item.name)}>
                <View className="bg-white/[0.08] border border-white/[0.12] rounded-2xl mb-2 overflow-hidden mx-4">
                  <View className="p-4 flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-sm">{item.name}</Text>
                      <Text className="text-white/40 text-xs">{item.version}</Text>
                    </View>
                    <View className="bg-primary-500/20 rounded-full px-2 py-1">
                      <Text className="text-primary-300 text-xs">{item.license}</Text>
                    </View>
                  </View>
                  {expanded === item.name && (
                    <View className="px-4 pb-4">
                      <View className="h-px bg-white/10 mb-2" />
                      <Text className="text-white/50 text-xs leading-5">{MIT_TEXT}</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </FadeIn>
          )}
        />
      </SafeContainer>
    </GradientBackground>
  );
}
