const isAnalyticsEnabled = (): boolean => {
  return !!(process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID);
};

export function trackEvent(name: string, _params?: Record<string, unknown>): void {
  if (!isAnalyticsEnabled()) return;
  // Phase 2: Firebase Analytics logEvent
}

export function setUserProperty(_name: string, _value: string): void {
  if (!isAnalyticsEnabled()) return;
  // Phase 2: Firebase Analytics setUserProperty
}

export function trackScreen(_screenName: string): void {
  if (!isAnalyticsEnabled()) return;
  // Phase 2: Firebase Analytics logScreenView
}
