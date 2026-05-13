import {
  loadSeedData,
  MOODS,
  WEEK_MS,
  useAppDispatch,
  useAppSelector,
} from '@mood-tracker/store';
import { ColorTheme, radii, shadows, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodChart } from '../components/MoodChart';
import { StatCard } from '../components/StatCard';
import { TextView } from '../components/TextView';
import { WellbeingBar } from '../components/WellbeingBar';
import { useTheme } from '../context/ThemeContext';
import { SEED_ENTRIES } from '../data/seed';

export function DashboardScreen() {
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.mood.entries);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const todayEntry = useMemo(() => {
    const today = new Date().toDateString();
    return entries.find((e) => new Date(e.timestamp).toDateString() === today);
  }, [entries]);

  const weekEntries = useMemo(() => {
    const cutoff = Date.now() - WEEK_MS;
    return entries.filter((e) => new Date(e.timestamp).getTime() >= cutoff);
  }, [entries]);

  const weeklyAvg = useMemo(() => {
    if (weekEntries.length === 0) return null;
    return weekEntries.reduce((sum, e) => sum + e.moodScore, 0) / weekEntries.length;
  }, [weekEntries]);

  const streak = useMemo(() => {
    let count = 0;
    const checked = new Set<string>();
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      if (checked.has(key)) continue;
      checked.add(key);
      const hasEntry = entries.some((e) => new Date(e.timestamp).toDateString() === key);
      if (hasEntry) count++;
      else if (i > 0) break;
    }
    return count;
  }, [entries]);

  const wellbeingAverages = useMemo(() => {
    const withWb = weekEntries.filter((e) => e.wellbeing);
    if (withWb.length === 0) return null;
    const avg = (key: keyof NonNullable<(typeof withWb)[0]['wellbeing']>) =>
      withWb.reduce((s, e) => s + (e.wellbeing![key] ?? 0), 0) / withWb.length;
    return {
      sleepQuality: avg('sleepQuality'),
      energyLevel: avg('energyLevel'),
      stressLevel: avg('stressLevel'),
      socialConnection: avg('socialConnection'),
    };
  }, [weekEntries]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return `Good ${hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'}`;
  }, []);

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <TextView
          viewStyle={styles.header}
          texts={[
            { label: `${greeting} 👋`, style: styles.greeting },
            { label: dateLabel, style: styles.date },
          ]}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Mood</Text>
          {todayEntry ? (
            <View style={styles.todayMood}>
              <Text style={styles.todayEmoji}>{MOODS[todayEntry.mood].emoji}</Text>
              <TextView
                texts={[
                  {
                    label: MOODS[todayEntry.mood].label,
                    style: [styles.todayLabel, { color: MOODS[todayEntry.mood].color }],
                  },
                  {
                    label: new Date(todayEntry.timestamp).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    }),
                    style: styles.todayTime,
                  },
                ]}
              />
            </View>
          ) : (
            <Text style={styles.emptyText}>No mood logged yet today.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last 7 Days</Text>
          <MoodChart entries={entries} />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            label="Streak"
            value={streak > 0 ? `${streak}d` : '—'}
            icon="🔥"
            style={styles.statFlex}
          />
          <StatCard
            label="Avg Mood"
            value={weeklyAvg !== null ? weeklyAvg.toFixed(1) : '—'}
            icon="📊"
            style={styles.statFlex}
          />
          <StatCard
            label="This Week"
            value={`${weekEntries.length}`}
            icon="📅"
            style={styles.statFlex}
          />
        </View>

        {wellbeingAverages && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Wellbeing</Text>
            {(
              [
                { key: 'sleepQuality', label: 'Sleep', icon: '🌙' },
                { key: 'energyLevel', label: 'Energy', icon: '⚡' },
                { key: 'stressLevel', label: 'Stress', icon: '🌀' },
                { key: 'socialConnection', label: 'Social', icon: '🤝' },
              ] as const
            ).map(({ key, label, icon }) => (
              <WellbeingBar
                key={key}
                label={label}
                icon={icon}
                value={wellbeingAverages[key]}
                invert={key === 'stressLevel'}
              />
            ))}
          </View>
        )}

        {entries.length === 0 && (
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => dispatch(loadSeedData(SEED_ENTRIES))}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>Load Demo Data</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    scroll: { flex: 1 },
    content: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xxl },
    header: { paddingVertical: spacing.xs },
    greeting: { ...typography.h2, color: colors.textPrimary },
    date: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      ...shadows.sm,
    },
    cardTitle: {
      ...typography.label,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    todayMood: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    todayEmoji: { fontSize: 48 },
    todayLabel: { ...typography.h3 },
    todayTime: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
    emptyText: { ...typography.body, color: colors.textTertiary, fontStyle: 'italic' },
    statsRow: { flexDirection: 'row', gap: spacing.sm },
    statFlex: { flex: 1 },
    demoButton: {
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    demoButtonText: { ...typography.bodyMedium, color: colors.primary },
  });
