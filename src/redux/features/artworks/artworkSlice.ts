import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from '../../../api/artwork';

interface ArtworkState {
  searchTerm: string;
  limit: number;
  isLoadingList: boolean;
  isLoadingDetail: boolean;
  artworks: Artwork[];
}

const initialState: ArtworkState = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  limit: 10,
  isLoadingList: false,
  isLoadingDetail: false,
  artworks: [],
};

export const artworkSlice = createSlice({
  name: 'artworkSlice',
  initialState,
  reducers: {
    changeLimit: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        limit: action.payload,
      };
    },

    changeSearchTerm: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchTerm', action.payload);
      return {
        ...state,
        searchTerm: action.payload,
      };
    },

    changeIsLoadingDetail: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDetail = action.payload;
    },

    changeIsLoadingList: (state, action: PayloadAction<boolean>) => {
      state.isLoadingList = action.payload;
    },

    changeArtworks: (state, action: PayloadAction<Artwork[]>) => {
      state.artworks = action.payload;
    },
  },
});

export const {
  changeIsLoadingDetail,
  changeArtworks,
  changeIsLoadingList,
  changeLimit,
  changeSearchTerm,
} = artworkSlice.actions;

export default artworkSlice.reducer;
