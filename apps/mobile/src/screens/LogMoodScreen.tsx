import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import {
  MoodLevel,
  MOODS,
  WellbeingAnswers,
  addEntry,
  useAppDispatch,
} from '@mood-tracker/store';
import { ColorTheme, spacing, radii, typography, shadows } from '@mood-tracker/ui';
import { useTheme } from '../context/ThemeContext';
import { MoodSelector } from '../components/MoodSelector';
import { WellbeingQuestions } from '../components/WellbeingQuestions';
import { useLocation } from '../hooks/useLocation';
import { TextView } from '../components/TextView';

export function LogMoodScreen() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { fetchLocation, loading: locationLoading } = useLocation();

  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState('');
  const [showWellbeing, setShowWellbeing] = useState(false);
  const [trackLocation, setTrackLocation] = useState(false);
  const [wellbeing, setWellbeing] = useState<WellbeingAnswers>({
    sleepQuality: 3,
    energyLevel: 3,
    stressLevel: 3,
    socialConnection: 3,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!selectedMood) {
      Alert.alert('Select a mood', 'Please choose how you are feeling before logging.');
      return;
    }

    setSubmitting(true);
    try {
      const location = trackLocation ? await fetchLocation() : undefined;

      dispatch(
        addEntry({
          id: uuidv4(),
          mood: selectedMood,
          moodScore: MOODS[selectedMood].score,
          timestamp: new Date().toISOString(),
          note: note.trim() || undefined,
          wellbeing: showWellbeing ? wellbeing : undefined,
          location: location ?? undefined,
        })
      );

      setSelectedMood(null);
      setNote('');
      setShowWellbeing(false);
      setTrackLocation(false);
      setWellbeing({ sleepQuality: 3, energyLevel: 3, stressLevel: 3, socialConnection: 3 });

      Alert.alert('Mood logged!', 'Your entry has been saved.');
    } finally {
      setSubmitting(false);
    }
  }, [selectedMood, note, showWellbeing, wellbeing, trackLocation, fetchLocation, dispatch]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setShowWellbeing((v) => !v)}
            activeOpacity={0.7}
          >
            <TextView
              texts={[
                { label: 'Wellbeing Check-In', style: styles.sectionTitle },
                { label: '4 quick questions (optional)', style: styles.sectionSubtitle },
              ]}
            />
            <Text style={styles.toggleIcon}>{showWellbeing ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showWellbeing && <WellbeingQuestions answers={wellbeing} onChange={setWellbeing} />}
        </View>

        <View style={styles.card}>
          <TextView
            texts={[
              { label: 'Add a Note', style: styles.sectionTitle },
              { label: "Optional — what's on your mind?", style: styles.sectionSubtitle },
            ]}
          />
          <TextInput
            style={styles.noteInput}
            placeholder="Write something…"
            placeholderTextColor={colors.textTertiary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{note.length}/500</Text>
        </View>

        <View style={[styles.card, styles.locationRow]}>
          <TextView
            texts={[
              { label: 'Track Location', style: styles.sectionTitle },
              { label: 'Log where you are right now', style: styles.sectionSubtitle },
            ]}
          />
          <Switch
            value={trackLocation}
            onValueChange={setTrackLocation}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor={colors.white}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !selectedMood && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!selectedMood || submitting}
          activeOpacity={0.8}
        >
          {submitting || locationLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitText}>Log Mood</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    scroll: { flex: 1 },
    content: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xxl },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      ...shadows.sm,
    },
    toggleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toggleIcon: { fontSize: 14, color: colors.textSecondary },
    sectionTitle: { ...typography.bodyMedium, color: colors.textPrimary, marginBottom: 2 },
    sectionSubtitle: { ...typography.caption, color: colors.textSecondary },
    noteInput: {
      marginTop: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      padding: spacing.sm,
      ...typography.body,
      color: colors.textPrimary,
      minHeight: 96,
      ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
    },
    charCount: {
      ...typography.caption,
      color: colors.textTertiary,
      textAlign: 'right',
      marginTop: 4,
    },
    locationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      alignItems: 'center',
      ...shadows.md,
    },
    submitDisabled: { opacity: 0.5 },
    submitText: { ...typography.bodyMedium, color: colors.white, fontWeight: '700' },
  });
