import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { storeData, getData } from '../utils/storage';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../utils/constants';
import { UserSettings } from '../types';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  resetSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    getData<UserSettings>(STORAGE_KEYS.SETTINGS).then((saved) => {
      if (saved) setSettings({ ...DEFAULT_SETTINGS, ...saved });
    });
  }, []);

  const updateSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      storeData(STORAGE_KEYS.SETTINGS, next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    storeData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
