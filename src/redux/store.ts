import { configureStore } from '@reduxjs/toolkit';
import formHookedReducer from './features/hook/hookSlice';
import formUncontrolledReducer from './features/uncontrolled/uncontrolledSlice';
import sharedReducer from './features/shared/sharedSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    formHookedState: formHookedReducer,
    formUncontrolledState: formUncontrolledReducer,
    sharedSlice: sharedReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
