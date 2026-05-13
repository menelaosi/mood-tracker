import { MOOD_LEVELS, MOODS, MoodLevel } from '@mood-tracker/store';
import { ColorTheme, radii, shadows, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TextView } from './TextView';

interface MoodSelectorProps {
  selected: MoodLevel | null;
  onSelect: (mood: MoodLevel) => void;
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <Text style={styles.prompt}>How are you feeling right now?</Text>
      <View style={styles.row}>
        {MOOD_LEVELS.map((mood) => {
          const isSelected = selected === mood;
          const { emoji, label, color } = MOODS[mood];
          return (
            <TouchableOpacity
              key={mood}
              style={[
                styles.button,
                isSelected && { borderColor: color, backgroundColor: color + '22' },
              ]}
              onPress={() => onSelect(mood)}
              activeOpacity={0.7}
            >
              <TextView
                viewStyle={styles.moodItem}
                texts={[
                  { label: emoji, style: styles.emoji },
                  {
                    label: label,
                    style: [
                      styles.label,
                      isSelected && { color, fontWeight: '700' as const },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      ...shadows.sm,
    },
    prompt: {
      ...typography.h3,
      color: colors.textPrimary,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderRadius: radii.md,
      borderWidth: 2,
      borderColor: colors.border,
    },
    moodItem: { alignItems: 'center' },
    emoji: { fontSize: 28 },
    label: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: 4,
      textAlign: 'center',
    },
  });
