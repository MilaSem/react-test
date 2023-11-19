import { HttpResponse, http } from 'msw';
import { artworkMocks } from './mocks';
import { type Artwork } from '../../src/api/artwork';

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get('https://api.artic.edu/api/v1/artworks/search', () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return HttpResponse.json(
      {
        pagination: {
          total: 10,
        },
        data: artworkMocks,
      },
      {
        status: 200,
      },
    );
  }),
  http.get('https://api.artic.edu/api/v1/artworks/:imageId', ({ params }) => {
    const { imageId } = params;
    const artwork: Artwork = { ...artworkMocks[0], id: Number(imageId) };
    return HttpResponse.json({
      data: artwork,
    });
  }),
];
