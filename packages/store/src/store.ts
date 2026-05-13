import { configureStore } from '@reduxjs/toolkit';
import moodReducer from './slices/moodSlice';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
