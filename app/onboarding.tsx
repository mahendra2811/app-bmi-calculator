import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingSlide from '../components/ui/OnboardingSlide';
import GradientButton from '../components/ui/GradientButton';
import { useOnboarding } from '../hooks/useOnboarding';
import { onboardingSlides } from '../utils/onboardingData';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleComplete = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0C29' }}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <OnboardingSlide
            title={item.title}
            subtitle={item.subtitle}
            emoji={item.emoji}
            gradientColors={item.gradientColors}
          />
        )}
      />

      <View className="absolute bottom-16 left-0 right-0 items-center px-8">
        <View className="flex-row mb-6">
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              className="h-2 rounded-full mx-1"
              style={{
                width: currentIndex === i ? 24 : 8,
                backgroundColor: currentIndex === i ? '#FFF' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </View>

        <View className="w-full flex-row justify-between items-center">
          {currentIndex < onboardingSlides.length - 1 ? (
            <>
              <Pressable onPress={handleComplete}>
                <Text className="text-white/50 text-base">Skip</Text>
              </Pressable>
              <GradientButton title="Next →" onPress={handleNext} />
            </>
          ) : (
            <View className="w-full">
              <GradientButton title="Get Started 🚀" onPress={handleComplete} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
