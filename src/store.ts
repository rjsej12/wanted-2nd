import { configureStore } from '@reduxjs/toolkit';
import cacheReducer from '@/reducers/cacheSlice';

const store = configureStore({
  reducer: {
    cache: cacheReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
