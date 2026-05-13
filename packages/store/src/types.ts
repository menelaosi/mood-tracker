export type MoodLevel = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
export type MoodStateStatus = 'idle' | 'loading' | 'failed';

export interface MoodConfig {
  score: number;
  label: string;
  emoji: string;
  color: string;
}

export interface WellbeingAnswers {
  sleepQuality: number;
  energyLevel: number;
  stressLevel: number;
  socialConnection: number;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
}

export interface MoodEntry {
  id: string;
  mood: MoodLevel;
  moodScore: number;
  timestamp: string;
  note?: string;
  wellbeing?: WellbeingAnswers;
  location?: GeoLocation;
}

export interface MoodState {
  entries: MoodEntry[];
  status: MoodStateStatus;
}

export interface DayData {
  label: string;
  score: number | null;
}

export interface WellbeingQuestion {
  key: keyof WellbeingAnswers;
  label: string;
  icon: string;
  lowLabel: string;
  highLabel: string;
}

export type TimeFilter = 'today' | 'week' | 'month' | 'all';
