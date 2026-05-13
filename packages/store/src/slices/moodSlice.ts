import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoodEntry, MoodState } from '../types';

const initialState: MoodState = {
  entries: [],
  status: 'idle',
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<MoodEntry>) {
      // Prepend so the list is always newest-first
      state.entries.unshift(action.payload);
    },
    removeEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
    loadSeedData(state, action: PayloadAction<MoodEntry[]>) {
      state.entries = action.payload;
    },
    clearEntries(state) {
      state.entries = [];
    },
  },
});

export const { addEntry, removeEntry, loadSeedData, clearEntries } =
  moodSlice.actions;

export default moodSlice.reducer;
