import { ColorTheme, radii, shadows, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TextView } from './TextView';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  style?: ViewStyle;
}

export function StatCard({ label, value, icon, style }: StatCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TextView
      viewStyle={[styles.card, style]}
      texts={[
        { label: icon, style: styles.icon },
        { label: value, style: styles.value },
        { label: label, style: styles.label },
      ]}
    />
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      alignItems: 'center',
      ...shadows.sm,
    },
    icon: { fontSize: 22, marginBottom: spacing.xs },
    value: { ...typography.h2, color: colors.textPrimary },
    label: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: 2,
      textAlign: 'center',
    },
  });
