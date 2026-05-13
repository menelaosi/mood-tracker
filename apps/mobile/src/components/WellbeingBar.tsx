import { ColorTheme, radii, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface WellbeingBarProps {
  label: string;
  icon: string;
  value: number;
  invert?: boolean;
}

function getBarColor(value: number, invert: boolean, colors: ColorTheme): string {
  const score = invert ? 6 - value : value;
  if (score >= 4) return colors.great;
  if (score >= 3) return colors.good;
  if (score >= 2) return colors.neutral;
  return colors.bad;
}

export function WellbeingBar({ label, icon, value, invert = false }: WellbeingBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const backgroundColor = getBarColor(value, invert, colors);

  return (
    <View style={styles.row}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(value / 5) * 100}%` as any, backgroundColor }]} />
      </View>
      <Text style={styles.value}>{value.toFixed(1)}</Text>
    </View>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
    icon: { fontSize: 16, marginRight: spacing.xs },
    label: { ...typography.bodySmall, color: colors.textSecondary, width: 52 },
    track: {
      flex: 1,
      height: 8,
      borderRadius: radii.full,
      overflow: 'hidden',
      marginHorizontal: spacing.sm,
      backgroundColor: colors.border,
    },
    fill: { height: '100%', borderRadius: radii.full },
    value: { ...typography.label, color: colors.textPrimary, width: 28, textAlign: 'right' },
  });
