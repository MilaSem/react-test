import { App } from '@/components/App';
import { Details } from '@/components/Details/Details';
import { wrapper } from '@/redux/store';
import { artworkApi } from '@/redux/services/artworks/artworkApi';

const DetailsPage = () => {
  return (
    <App>
      <Details />
    </App>
  );
};

export default DetailsPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const details = Number.parseInt(context.params?.details as string);
  if (typeof details === 'number') {
    store.dispatch(artworkApi.endpoints.getArtworkDetail.initiate(details));
  }

  await Promise.all(store.dispatch(artworkApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
