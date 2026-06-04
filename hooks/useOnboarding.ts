import { useState, useEffect, useCallback } from 'react';
import { storeData, getData } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

export function useOnboarding() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData<boolean>(STORAGE_KEYS.ONBOARDING).then((completed) => {
      setIsFirstLaunch(!completed);
      setLoading(false);
    });
  }, []);

  const completeOnboarding = useCallback(async () => {
    await storeData(STORAGE_KEYS.ONBOARDING, true);
    setIsFirstLaunch(false);
  }, []);

  return { isFirstLaunch, loading, completeOnboarding };
}
