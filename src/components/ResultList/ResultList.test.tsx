import { render, screen, describe, expect, it } from '../../../config/tests/setup_tests';
import { Artwork } from '../../api/artwork';

import { ResultList } from './ResultList';

import { AppContext } from '../App';

const artwork1: Artwork = {
  _score: 19955.172,
  thumbnail: {
    width: 5376,
    lqip: 'data:image/gif;base64,R0lGODlhBAAFAPQAABw/Zhg/aBRBaBZBahRCaxxBahxEahNIchZJcR9LdB9OdiZIZSBEbShLbjxRZyBPeipRcSpReUpWaitXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURoMJIDhJAywAcAlEkxhNNTQgAOw==',
    height: 6112,
  },
  api_model: 'artworks',
  is_boosted: true,
  api_link: 'https://api.artic.edu/api/v1/artworks/129884',
  id: 129884,
  title: 'Starry Night and the Astronauts',
  timestamp: '2023-11-10T23:26:18-06:00',
};

const artwork2: Artwork = {
  _score: 9977.586,
  thumbnail: {
    width: null,
    lqip: 'data:image/gif;base64,R0lGODlhBgAFAPQAAHhwV3N+bnh/aXR8dJtsG6VsAJx4IIp8PIx0QYZ2SoZ/bIx+b3CGboiAQoKAVoWAVpiLYZqNYIiAcoeIc5SNdJeJfJiKfXyCgneAkXmLp3eFqomMgIWJmZOerAAAAAAAACH5BAAAAAAALAAAAAAGAAUAAAUYoMYEXJdhgwBF1wM4RIE01HYYiVJZk7SEADs=',
    height: null,
  },
  api_model: 'artworks',
  is_boosted: true,
  api_link: 'https://api.artic.edu/api/v1/artworks/28560',
  id: 28560,
  title: 'The Bedroom',
  timestamp: '2023-11-10T23:32:55-06:00',
};

describe('ResultList tests', () => {
  it('Should render NothingFound component', () => {
    render(
      <AppContext.Provider value={{ searchTerm: '', artworks: [] }}>
        <ResultList />
      </AppContext.Provider>,
    );
    expect(screen.getByText(/Nothing found/)).toBeInTheDocument();
  });
  it('Should render the speciified number of cards', () => {
    const { container } = render(
      <AppContext.Provider value={{ searchTerm: '', artworks: [artwork1, artwork2] }}>
        <ResultList />
      </AppContext.Provider>,
    );
    const collection = container.getElementsByClassName('result__item');
    expect(collection.length).toEqual(2);
  });
});
