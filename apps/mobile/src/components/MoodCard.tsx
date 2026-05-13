import { MOODS, MoodEntry } from '@mood-tracker/store';
import { ColorTheme, radii, shadows, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TextView } from './TextView';

interface MoodCardProps {
  entry: MoodEntry;
  onDelete?: () => void;
}

export function MoodCard({ entry, onDelete }: MoodCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const time = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const { emoji, label, color } = MOODS[entry.mood];

  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: color }]} />

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <TextView
            viewStyle={styles.moodInfo}
            texts={[
              { label, style: [styles.moodLabel, { color }] },
              { label: time, style: styles.time },
            ]}
          />
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
            >
              <Text style={styles.deleteIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {entry.note ? (
          <Text style={styles.note} numberOfLines={2}>
            {entry.note}
          </Text>
        ) : null}

        <View style={styles.tagsRow}>
          {entry.wellbeing && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>📋 Wellbeing logged</Text>
            </View>
          )}
          {entry.location && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                📍{' '}
                {entry.location.city ??
                  `${entry.location.latitude.toFixed(2)}, ${entry.location.longitude.toFixed(2)}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      marginBottom: spacing.sm,
      overflow: 'hidden',
      ...shadows.sm,
    },
    accent: { width: 4 },
    body: { flex: 1, padding: spacing.md },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    emoji: { fontSize: 32 },
    moodInfo: { flex: 1 },
    moodLabel: { ...typography.bodyMedium },
    time: { ...typography.caption, color: colors.textTertiary, marginTop: 2 },
    deleteIcon: { fontSize: 14, color: colors.textTertiary },
    note: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
    tagsRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.sm, flexWrap: 'wrap' },
    tag: {
      backgroundColor: colors.background,
      borderRadius: radii.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
    },
    tagText: { ...typography.caption, color: colors.textSecondary },
  });
