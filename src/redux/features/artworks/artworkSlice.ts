import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { artworkApi } from '../../services/artworks/artworkApi';

interface ArtworkState {
  searchTerm: string;
  limit: number;
  isLoadingList: boolean;
  isLoadingDetail: boolean;
}

const initialState: ArtworkState = {
  searchTerm: '',
  limit: 10,
  isLoadingList: false,
  isLoadingDetail: false,
};

export const artworkSlice = createSlice({
  name: 'artworkSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(artworkApi.endpoints.getArtworks.matchPending, (state) => {
      state.isLoadingList = true;
    });
    builder.addMatcher(artworkApi.endpoints.getArtworks.matchFulfilled, (state) => {
      state.isLoadingList = false;
    });
    builder.addMatcher(artworkApi.endpoints.getArtworks.matchRejected, (state) => {
      state.isLoadingList = false;
    });
    builder.addMatcher(artworkApi.endpoints.getArtworkDetail.matchPending, (state) => {
      state.isLoadingDetail = true;
    });
    builder.addMatcher(artworkApi.endpoints.getArtworkDetail.matchFulfilled, (state) => {
      state.isLoadingDetail = false;
    });
    builder.addMatcher(artworkApi.endpoints.getArtworkDetail.matchRejected, (state) => {
      state.isLoadingDetail = false;
    });
  },
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
  },
});

export const { changeIsLoadingDetail, changeIsLoadingList, changeLimit, changeSearchTerm } =
  artworkSlice.actions;

export default artworkSlice.reducer;
