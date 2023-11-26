import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Artwork } from '../../../api/artwork';
import { HYDRATE } from 'next-redux-wrapper';

interface ArtworkListParams {
  q: string;
  page: number;
  limit: number;
}

interface Pagination {
  total: number;
}

interface GetArtworksResponse {
  data: Artwork[];
  pagination: Pagination;
}

interface GetArtworkDetailResponse {
  data: Artwork;
}

export const artworkApi = createApi({
  reducerPath: 'artworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Artworks'],
  endpoints: (builder) => ({
    getArtworks: builder.query<GetArtworksResponse, ArtworkListParams>({
      query(initialParams) {
        const fieldArray = [
          'id',
          'title',
          'image_id',
          'artist_title',
          'thumbnail',
          'date_end',
          'medium_display',
          '_score',
          'api_model',
          'api_link',
          'is_boosted',
          'timestamp',
        ];
        const fields = fieldArray.join(',');
        const params = {
          ...initialParams,
          fields,
        };
        return {
          url: '/artworks/search',
          params,
        };
      },
    }),
    getArtworkDetail: builder.query<GetArtworkDetailResponse, number>({
      query(imageId) {
        const fieldArray = [
          'id',
          'title',
          'image_id',
          'artist_title',
          'thumbnail',
          'date_end',
          'medium_display',
          '_score',
          'api_model',
          'api_link',
          'is_boosted',
          'timestamp',
        ];
        const fields = fieldArray.join(',');
        const params = {
          fields,
        };
        return {
          url: `/artworks/${imageId}`,
          params,
        };
      },
    }),
  }),
});

export const { useGetArtworksQuery, usePrefetch, useGetArtworkDetailQuery } = artworkApi;
