import { configureStore } from '@reduxjs/toolkit';
import artworkReducer from './features/artworks/artworkSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { artworkApi } from './services/artworks/artworkApi';

export const store = configureStore({
  reducer: {
    artworkState: artworkReducer,
    [artworkApi.reducerPath]: artworkApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([artworkApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
