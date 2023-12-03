import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CountriesFile {
  data: string[];
}

async function fetchCountries(): Promise<string[]> {
  const response = await fetch('countries.json');
  return ((await response.json()) as CountriesFile).data;
}

interface SharedState {
  countries: string[];
}

const initialState: SharedState = {
  countries: await fetchCountries(),
};

export const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    changeCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export default sharedSlice.reducer;
