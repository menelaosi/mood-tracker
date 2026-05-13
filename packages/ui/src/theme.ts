export interface ColorTheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  great: string;
  good: string;
  neutral: string;
  bad: string;
  terrible: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderFocus: string;
  white: string;
  black: string;
}

export const lightColors: ColorTheme = {
  primary: '#3B82F6',
  primaryLight: '#EFF6FF',
  primaryDark: '#1D4ED8',

  great: '#22C55E',
  good: '#84CC16',
  neutral: '#F59E0B',
  bad: '#F97316',
  terrible: '#EF4444',

  background: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',

  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',

  border: '#E2E8F0',
  borderFocus: '#3B82F6',

  white: '#FFFFFF',
  black: '#000000',
};

export const darkColors: ColorTheme = {
  primary: '#60A5FA',
  primaryLight: '#1E3A5F',
  primaryDark: '#93C5FD',

  great: '#22C55E',
  good: '#84CC16',
  neutral: '#F59E0B',
  bad: '#F97316',
  terrible: '#EF4444',

  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#162032',

  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',

  border: '#334155',
  borderFocus: '#60A5FA',

  white: '#FFFFFF',
  black: '#000000',
};

// Keep `colors` as a convenience export (light theme); prefer useTheme() in components
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 30 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  label: { fontSize: 13, fontWeight: '600' as const, lineHeight: 18 },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export function getMoodColor(score: number | null, c: ColorTheme): string {
  if (score === null) return c.border;
  if (score >= 4.5) return c.great;
  if (score >= 3.5) return c.good;
  if (score >= 2.5) return c.neutral;
  if (score >= 1.5) return c.bad;
  return c.terrible;
}
