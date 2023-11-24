// import { getServerSideProps } from './server_side_props/app';

import { artworkApi } from '@/redux/services/artworks/artworkApi';
import { wrapper } from '@/redux/store';
import { App } from '@/components/App';
export default App;

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

// const myComponent = () => {
//   return <div>Hello world</div>;
// };

// export default myComponent;
// export default App;
