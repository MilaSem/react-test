import { artworkApi } from '@/redux/services/artworks/artworkApi';
import { wrapper } from '@/redux/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const name = context.params?.name;
  if (typeof name === 'string') {
    store.dispatch(
      artworkApi.endpoints.getArtworks.initiate({
        q: store.getState().artworkState.searchTerm,
        limit: store.getState().artworkState.limit,
        page: 1,
      }),
    );
  }

  await Promise.all(store.dispatch(artworkApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
