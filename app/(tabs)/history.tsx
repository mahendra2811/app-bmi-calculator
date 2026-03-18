import React from 'react';
import { View, Text, FlatList, Alert, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '../../components/layout/GradientBackground';
import SafeContainer from '../../components/layout/SafeContainer';
import HistoryChart from '../../components/ui/HistoryChart';
import CategoryBadge from '../../components/ui/CategoryBadge';
import EmptyState from '../../components/ui/EmptyState';
import AnimatedCard from '../../components/ui/AnimatedCard';
import FadeIn from '../../components/animations/FadeIn';
import { useHistory } from '../../hooks/useHistory';
import { getBMICategory } from '../../utils/bmiCalculator';
import { format } from 'date-fns';

function confirm(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: onConfirm },
    ]);
  }
}

export default function HistoryScreen() {
  const router = useRouter();
  const { history, loading, deleteEntry, clearHistory } = useHistory();

  if (loading) {
    return (
      <GradientBackground>
        <SafeContainer>
          <Text className="text-white text-center mt-10">Loading...</Text>
        </SafeContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeContainer scrollable={false}>
        <FadeIn>
          <View className="flex-row justify-between items-center py-4 px-4">
            <Text className="text-white text-2xl font-bold">History</Text>
            {history.length > 0 && (
              <Pressable
                onPress={() => confirm('Clear History', 'Delete all history entries?', clearHistory)}
              >
                <Text className="text-red-400 text-sm">Clear All</Text>
              </Pressable>
            )}
          </View>
        </FadeIn>

        {history.length === 0 ? (
          <EmptyState
            emoji="📊"
            title="No History Yet"
            subtitle="Calculate your BMI to start tracking your progress"
            actionLabel="Calculate Now"
            onAction={() => router.push('/(tabs)')}
          />
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <HistoryChart data={history.map((h) => ({ date: h.date, bmi: h.bmi }))} />
            }
            renderItem={({ item, index }) => {
              const cat = getBMICategory(item.bmi);
              return (
                <AnimatedCard delay={index * 50} className="mb-3 mx-4">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-white/50 text-xs">
                        {format(new Date(item.date), 'MMM dd, yyyy')}
                      </Text>
                      <Text className="text-white text-2xl font-bold mt-1">{item.bmi.toFixed(1)}</Text>
                      <Text className="text-white/50 text-xs mt-1">
                        {item.weight}kg · {item.height}cm
                      </Text>
                    </View>
                    <View className="items-end">
                      <CategoryBadge name={cat.name} color={cat.color} emoji={cat.emoji} />
                      <Pressable
                        onPress={() => confirm('Delete', 'Remove this entry?', () => deleteEntry(item.id))}
                        className="mt-2"
                      >
                        <Text className="text-red-400/60 text-xs">Delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </AnimatedCard>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </SafeContainer>
    </GradientBackground>
  );
}
