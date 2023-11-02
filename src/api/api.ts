import { type Artwork } from './artwork';

async function getArt(searchTerm: string): Promise<Artwork[]> {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}

export { getArt };
