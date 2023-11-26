import { artworkApi } from '@/redux/services/artworks/artworkApi';
import { wrapper } from '@/redux/store';
import { App } from '@/components/App';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(
    artworkApi.endpoints.getArtworks.initiate({
      q: String(context.query.search),
      limit: Number.parseInt(context.query.limit as string) || 1,
      page: Number.parseInt(context.query.page as string) || 1,
    }),
  );

  await Promise.all(store.dispatch(artworkApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default App;
