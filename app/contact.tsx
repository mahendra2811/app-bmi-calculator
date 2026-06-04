import React, { useState, useCallback } from 'react';
import { View, Text, Linking, Pressable } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import AnimatedCard from '../components/ui/AnimatedCard';
import GradientButton from '../components/ui/GradientButton';
import FadeIn from '../components/animations/FadeIn';
import { storeData, getData } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function ContactScreen() {
  const [rating, setRating] = useState(0);

  React.useEffect(() => {
    getData<number>(STORAGE_KEYS.RATING).then((r) => { if (r) setRating(r); });
  }, []);

  const handleRate = useCallback((stars: number) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRating(stars);
    storeData(STORAGE_KEYS.RATING, stars);
  }, []);

  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="Contact" />

        <FadeIn>
          <View className="items-center mb-6">
            <Text className="text-5xl mb-3">📱</Text>
            <Text className="text-white text-xl font-bold">We'd love to hear from you!</Text>
            <Text className="text-white/60 text-sm mt-1">Your feedback helps us improve</Text>
          </View>
        </FadeIn>

        <FadeIn delay={100}>
          <AnimatedCard className="mb-4" onPress={() => Linking.openURL('mailto:support@bmicalculator.app?subject=BMI Calculator Feedback')}>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">✉️</Text>
              <View>
                <Text className="text-white font-bold">Send Feedback</Text>
                <Text className="text-white/50 text-xs">support@bmicalculator.app</Text>
              </View>
            </View>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={200}>
          <AnimatedCard className="mb-4" onPress={() => Linking.openURL('mailto:support@bmicalculator.app?subject=Bug Report - BMI Calculator')}>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🐛</Text>
              <View>
                <Text className="text-white font-bold">Report a Bug</Text>
                <Text className="text-white/50 text-xs">Help us fix issues</Text>
              </View>
            </View>
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={300}>
          <AnimatedCard className="mb-4">
            <Text className="text-white font-bold text-center mb-3">Rate this App</Text>
            <View className="flex-row justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => handleRate(star)}>
                  <Text className="text-3xl">{star <= rating ? '⭐' : '☆'}</Text>
                </Pressable>
              ))}
            </View>
            {rating > 0 && (
              <Text className="text-white/50 text-xs text-center mt-2">
                Thanks for rating us {rating}/5!
              </Text>
            )}
          </AnimatedCard>
        </FadeIn>

        <FadeIn delay={400}>
          <Text className="text-white/50 text-sm text-center mt-4">
            If you enjoy the app, please rate us on the Play Store!
          </Text>
          <View className="mt-4">
            <GradientButton title="Rate on Play Store ⭐" onPress={() => Linking.openURL('https://play.google.com/store')} />
          </View>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
