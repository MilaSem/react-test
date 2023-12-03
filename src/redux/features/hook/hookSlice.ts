import { createSlice } from '@reduxjs/toolkit';
import { initialFormState, formReducers } from '../common';

export const formHookSlice = createSlice({
  name: 'formHookSlice',
  initialState: initialFormState,
  reducers: formReducers,
});

export default formHookSlice.reducer;
