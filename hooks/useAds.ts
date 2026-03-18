import { useState, useCallback } from 'react';

export function useAds() {
  const [calculationCount, setCalculationCount] = useState(0);
  const showBanner = !!(process.env.EXPO_PUBLIC_ADMOB_BANNER_ID);
  const isAdReady = false;

  const incrementCalculationCount = useCallback(() => {
    setCalculationCount((prev) => prev + 1);
  }, []);

  const showInterstitial = useCallback(() => {
    // Phase 2: Show real interstitial ad
  }, []);

  return { showBanner, showInterstitial, isAdReady, calculationCount, incrementCalculationCount };
}
