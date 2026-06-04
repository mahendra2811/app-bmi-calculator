import { useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function useHaptics() {
  const lightHaptic = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const mediumHaptic = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const heavyHaptic = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, []);

  const selectionHaptic = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  }, []);

  return { lightHaptic, mediumHaptic, heavyHaptic, selectionHaptic };
}
