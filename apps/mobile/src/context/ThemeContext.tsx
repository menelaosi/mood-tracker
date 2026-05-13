import { ColorTheme, darkColors, lightColors } from '@mood-tracker/ui';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextValue {
  colors: ColorTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [override, setOverride] = useState<'light' | 'dark' | null>(null);

  const isDark = (override ?? system) === 'dark';
  const toggleTheme = useCallback(
    () => setOverride(isDark ? 'light' : 'dark'),
    [isDark]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ colors: isDark ? darkColors : lightColors, isDark, toggleTheme }),
    [isDark, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
