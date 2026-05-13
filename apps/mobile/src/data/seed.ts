import { MoodEntry } from '@mood-tracker/store';

const daysAgo = (n: number, hour = 9) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
  return d.toISOString();
};

export const SEED_ENTRIES: MoodEntry[] = [
  {
    id: 'seed-1',
    mood: 'good',
    moodScore: 4,
    timestamp: daysAgo(0, 8),
    note: 'Morning coffee and a productive team standup.',
    wellbeing: { sleepQuality: 4, energyLevel: 4, stressLevel: 2, socialConnection: 3 },
    location: { latitude: 32.7767, longitude: -96.797, city: 'Dallas' },
  },
  {
    id: 'seed-2',
    mood: 'great',
    moodScore: 5,
    timestamp: daysAgo(1, 18),
    note: 'Evening run cleared my head completely.',
    wellbeing: { sleepQuality: 5, energyLevel: 5, stressLevel: 1, socialConnection: 4 },
    location: { latitude: 32.7767, longitude: -96.797, city: 'Dallas' },
  },
  {
    id: 'seed-3',
    mood: 'neutral',
    moodScore: 3,
    timestamp: daysAgo(2, 12),
    note: 'Just a regular Tuesday.',
    wellbeing: { sleepQuality: 3, energyLevel: 3, stressLevel: 3, socialConnection: 2 },
  },
  {
    id: 'seed-4',
    mood: 'bad',
    moodScore: 2,
    timestamp: daysAgo(3, 15),
    note: 'Stressful deadline. Didn\'t sleep well.',
    wellbeing: { sleepQuality: 2, energyLevel: 2, stressLevel: 5, socialConnection: 1 },
  },
  {
    id: 'seed-5',
    mood: 'good',
    moodScore: 4,
    timestamp: daysAgo(4, 10),
    wellbeing: { sleepQuality: 4, energyLevel: 3, stressLevel: 2, socialConnection: 4 },
    location: { latitude: 32.7767, longitude: -96.797, city: 'Dallas' },
  },
  {
    id: 'seed-6',
    mood: 'great',
    moodScore: 5,
    timestamp: daysAgo(5, 11),
    note: 'Weekend hike with friends — exactly what I needed.',
    wellbeing: { sleepQuality: 5, energyLevel: 5, stressLevel: 1, socialConnection: 5 },
  },
  {
    id: 'seed-7',
    mood: 'good',
    moodScore: 4,
    timestamp: daysAgo(6, 9),
    wellbeing: { sleepQuality: 4, energyLevel: 4, stressLevel: 2, socialConnection: 3 },
  },
];
