import { type Artwork } from '../../src/api/artwork';

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
  image_id: '6789',
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
  image_id: '1234',
};

export const artworkMocks = [artwork1, artwork2];
