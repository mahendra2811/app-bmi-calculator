import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { storeData, getData } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

interface ThemeContextType {
  theme: 'dark' | 'light';
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    getData<'dark' | 'light'>(STORAGE_KEYS.THEME).then((saved) => {
      if (saved) setTheme(saved);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      storeData(STORAGE_KEYS.THEME, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
