import type { MoodConfig, MoodLevel, WellbeingQuestion } from './types';

export const MOODS: Record<MoodLevel, MoodConfig> = {
  great: { score: 5, label: 'Great', emoji: '😁', color: '#22C55E' },
  good: { score: 4, label: 'Good', emoji: '😊', color: '#84CC16' },
  neutral: { score: 3, label: 'Neutral', emoji: '😐', color: '#F59E0B' },
  bad: { score: 2, label: 'Bad', emoji: '😔', color: '#F97316' },
  terrible: { score: 1, label: 'Terrible', emoji: '😢', color: '#EF4444' },
};

export const MOOD_LEVELS: MoodLevel[] = ['terrible', 'bad', 'neutral', 'good', 'great'];

export const WELLBEING_QUESTIONS: WellbeingQuestion[] = [
  { key: 'sleepQuality', label: 'Sleep Quality', icon: '🌙', lowLabel: 'Poor', highLabel: 'Great' },
  { key: 'energyLevel', label: 'Energy Level', icon: '⚡', lowLabel: 'Low', highLabel: 'High' },
  {
    key: 'stressLevel',
    label: 'Stress Level',
    icon: '🌀',
    lowLabel: 'Calm',
    highLabel: 'Stressed',
  },
  {
    key: 'socialConnection',
    label: 'Social Connection',
    icon: '🤝',
    lowLabel: 'Isolated',
    highLabel: 'Connected',
  },
];

export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;
export const WEEK_MS = 7 * DAY_MS;
export const MONTH_MS = 30 * DAY_MS;
