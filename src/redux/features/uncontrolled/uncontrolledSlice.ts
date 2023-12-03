import { createSlice } from '@reduxjs/toolkit';
import { initialFormState, formReducers } from '../common';

export const formUncontrolledSlice = createSlice({
  name: 'formUncontrolledSlice',
  initialState: initialFormState,
  reducers: formReducers,
});

export default formUncontrolledSlice.reducer;
