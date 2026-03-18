import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  className?: string;
}

export default function SafeContainer({ children, scrollable = true, className = '' }: SafeContainerProps) {
  if (scrollable) {
    return (
      <SafeAreaView style={{ flex: 1 }} className={className}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} className={className}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {children}
      </View>
    </SafeAreaView>
  );
}
