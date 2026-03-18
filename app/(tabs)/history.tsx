import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
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

export default function HistoryScreen() {
  const router = useRouter();
  const { history, loading, deleteEntry, clearHistory } = useHistory();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [clearConfirm, setClearConfirm] = useState(false);

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
              clearConfirm ? (
                <View className="flex-row items-center gap-3">
                  <Pressable onPress={() => setClearConfirm(false)}>
                    <Text className="text-white/50 text-sm">Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => { clearHistory(); setClearConfirm(false); }}
                    className="bg-red-500/20 rounded-lg px-3 py-1"
                  >
                    <Text className="text-red-400 text-sm font-bold">Clear All</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable onPress={() => setClearConfirm(true)}>
                  <Text className="text-red-400/70 text-sm">Clear All</Text>
                </Pressable>
              )
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
              const isPending = pendingDelete === item.id;
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
                      {isPending ? (
                        <View className="flex-row items-center gap-2 mt-2">
                          <Pressable onPress={() => setPendingDelete(null)}>
                            <Text className="text-white/40 text-xs">Cancel</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => { deleteEntry(item.id); setPendingDelete(null); }}
                            className="bg-red-500/20 rounded-lg px-2 py-1"
                          >
                            <Text className="text-red-400 text-xs font-bold">Remove</Text>
                          </Pressable>
                        </View>
                      ) : (
                        <Pressable onPress={() => setPendingDelete(item.id)} className="mt-2">
                          <Text className="text-red-400/50 text-xs">Delete</Text>
                        </Pressable>
                      )}
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
