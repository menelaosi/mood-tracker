import { DayData, MoodEntry } from '@mood-tracker/store';
import { ColorTheme, getMoodColor, radii, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface MoodChartProps {
  entries: MoodEntry[];
}

const CHART_HEIGHT = 80;

export function MoodChart({ entries }: MoodChartProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const days = useMemo<DayData[]>(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toDateString();

      const dayEntries = entries.filter((e) => new Date(e.timestamp).toDateString() === dateStr);

      const score =
        dayEntries.length > 0
          ? dayEntries.reduce((sum, e) => sum + e.moodScore, 0) / dayEntries.length
          : null;

      return {
        label: i === 6 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        score,
      };
    });
  }, [entries]);

  return (
    <View style={styles.container}>
      <View style={styles.barsRow}>
        {days.map((day, idx) => {
          const barHeight = day.score !== null ? (day.score / 5) * CHART_HEIGHT : 0;
          const barColor = getMoodColor(day.score, colors);
          const isToday = idx === 6;

          return (
            <View key={idx} style={styles.barColumn}>
              <View style={styles.barTrack}>
                {day.score !== null ? (
                  <View
                    style={[
                      styles.barFill,
                      { height: barHeight, backgroundColor: barColor },
                      isToday && styles.barToday,
                    ]}
                  />
                ) : (
                  <View style={styles.barEmpty} />
                )}
              </View>
              {day.score !== null && (
                <Text style={[styles.scoreLabel, { color: barColor }]}>{day.score.toFixed(1)}</Text>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.labelsRow}>
        {days.map((day, idx) => (
          <Text
            key={idx}
            style={[styles.dayLabel, idx === 6 && { color: colors.primary, fontWeight: '700' }]}
            numberOfLines={1}
          >
            {day.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: { marginTop: spacing.xs },
    barsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: CHART_HEIGHT + 20,
      gap: 6,
    },
    barColumn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: CHART_HEIGHT + 20,
    },
    barTrack: {
      width: '100%',
      height: CHART_HEIGHT,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    barFill: { width: '80%', borderRadius: radii.sm, minHeight: 4 },
    barEmpty: {
      width: '80%',
      height: 4,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.border,
    },
    barToday: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    scoreLabel: { ...typography.caption, marginTop: 2, fontWeight: '600' },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
    labelsRow: { flexDirection: 'row', gap: 6 },
    dayLabel: { flex: 1, ...typography.caption, color: colors.textTertiary, textAlign: 'center' },
  });
