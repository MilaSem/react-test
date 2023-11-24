import { configureStore } from '@reduxjs/toolkit';
import artworkReducer from './features/artworks/artworkSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { artworkApi } from './services/artworks/artworkApi';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    artworkState: artworkReducer,
    [artworkApi.reducerPath]: artworkApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([artworkApi.middleware]),
});

setupListeners(store.dispatch);

const makeStore = () => store;
type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(() => store, { debug: true });
