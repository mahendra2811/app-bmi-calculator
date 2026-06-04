// Phase 2: Uncomment when Firebase Analytics is integrated
/*
import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((_name: string, _params?: Record<string, unknown>) => {
    // Phase 2: Firebase Analytics logEvent
  }, []);

  const setUserProperty = useCallback((_name: string, _value: string) => {
    // Phase 2: Firebase Analytics setUserProperty
  }, []);

  const trackScreen = useCallback((_screenName: string) => {
    // Phase 2: Firebase Analytics logScreenView
  }, []);

  return { trackEvent, setUserProperty, trackScreen };
}
*/

export function useAnalytics() {
  return {
    trackEvent: (_name: string, _params?: Record<string, unknown>) => {},
    setUserProperty: (_name: string, _value: string) => {},
    trackScreen: (_screenName: string) => {},
  };
}
