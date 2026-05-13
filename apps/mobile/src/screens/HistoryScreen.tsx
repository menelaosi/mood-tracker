import { DAY_MS, MONTH_MS, MoodEntry, TimeFilter, WEEK_MS, removeEntry, useAppDispatch, useAppSelector } from '@mood-tracker/store';
import { ColorTheme, radii, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodCard } from '../components/MoodCard';
import { TextView } from '../components/TextView';
import { useTheme } from '../context/ThemeContext';

const FILTERS: { key: TimeFilter; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'all', label: 'All' },
];

interface Section {
  title: string;
  data: MoodEntry[];
}


export function HistoryScreen() {
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.mood.entries);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [filter, setFilter] = useState<TimeFilter>('all');

  const filtered = useMemo(() => {
    const now = Date.now();
    const boundaries: Record<TimeFilter, number> = {
      today: now - DAY_MS,
      week: now - WEEK_MS,
      month: now - MONTH_MS,
      all: 0,
    };
    return entries.filter((e) => new Date(e.timestamp).getTime() >= boundaries[filter]);
  }, [entries, filter]);

  const sections = useMemo<Section[]>(() => {
    const groups: Record<string, MoodEntry[]> = {};
    for (const entry of filtered) {
      const key = new Date(entry.timestamp).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
    }
    return Object.entries(groups).map(([title, data]) => ({ title, data }));
  }, [filtered]);

  type ListItem = { type: 'header'; title: string } | { type: 'entry'; entry: MoodEntry };

  const listData = useMemo<ListItem[]>(() => {
    const items: ListItem[] = [];
    for (const section of sections) {
      items.push({ type: 'header', title: section.title });
      for (const entry of section.data) {
        items.push({ type: 'entry', entry });
      }
    }
    return items;
  }, [sections]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete entry', 'Remove this mood log?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeEntry(id)) },
    ]);
  };

  const formatSectionTitle = (dateString: string) => {
    const d = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (d.toDateString() === today) return 'Today';
    if (d.toDateString() === yesterday) return 'Yesterday';
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.filterBar}>
        {FILTERS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.chip, filter === key && styles.chipActive]}
            onPress={() => setFilter(key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, filter === key && styles.chipTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {listData.length === 0 ? (
        <TextView
          viewStyle={styles.empty}
          texts={[
            { label: '📋', style: styles.emptyEmoji },
            { label: 'No entries yet.', style: styles.emptyText },
            { label: 'Log your first mood from the Log tab.', style: styles.emptySubtext },
          ]}
        />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item, idx) =>
            item.type === 'header' ? `h-${item.title}` : `e-${item.entry.id}-${idx}`
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return <Text style={styles.sectionHeader}>{formatSectionTitle(item.title)}</Text>;
            }
            return <MoodCard entry={item.entry} onDelete={() => handleDelete(item.entry.id)} />;
          }}
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    filterBar: {
      flexDirection: 'row',
      gap: spacing.xs,
      padding: spacing.md,
      paddingBottom: spacing.sm,
    },
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radii.full,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
    chipText: { ...typography.label, color: colors.textSecondary },
    chipTextActive: { color: colors.primary },
    listContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
    sectionHeader: {
      ...typography.label,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
    },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    emptyEmoji: { fontSize: 48, marginBottom: spacing.md },
    emptyText: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.xs },
    emptySubtext: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  });
