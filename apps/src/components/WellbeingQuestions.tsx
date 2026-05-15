import { WELLBEING_QUESTIONS, WellbeingAnswers } from '@mood-tracker/store';
import { ColorTheme, radii, spacing, typography } from '@mood-tracker/ui';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TextView } from './TextView';

interface WellbeingQuestionsProps {
  answers: WellbeingAnswers;
  onChange: (answers: WellbeingAnswers) => void;
}


export function WellbeingQuestions({ answers, onChange }: WellbeingQuestionsProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const update = (key: keyof WellbeingAnswers, value: number) =>
    onChange({ ...answers, [key]: value });

  return (
    <View style={styles.container}>
      {WELLBEING_QUESTIONS.map((q) => (
        <View key={q.key} style={styles.question}>
          <TextView
            viewStyle={styles.questionHeader}
            texts={[
              { label: q.icon, style: styles.icon },
              { label: q.label, style: styles.questionLabel },
            ]}
          />
          <View style={styles.scaleRow}>
            <Text style={styles.scaleLabel}>{q.lowLabel}</Text>
            <View style={styles.buttons}>
              {([1, 2, 3, 4, 5] as const).map((n) => {
                const active = answers[q.key] === n;
                return (
                  <TouchableOpacity
                    key={n}
                    style={[styles.pip, active && styles.pipActive]}
                    onPress={() => update(q.key, n)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pipText, active && styles.pipTextActive]}>{n}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.scaleLabel}>{q.highLabel}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: { marginTop: spacing.md, gap: spacing.md },
    question: {},
    questionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    icon: { fontSize: 16 },
    questionLabel: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: '500' },
    scaleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    scaleLabel: { ...typography.caption, color: colors.textTertiary, width: 54 },
    buttons: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
    pip: {
      width: 36,
      height: 36,
      borderRadius: radii.full,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
    },
    pipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    pipText: { ...typography.label, color: colors.textSecondary },
    pipTextActive: { color: colors.white },
  });
