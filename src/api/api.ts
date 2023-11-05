import { type Artwork } from './artwork';

async function getArt(
  searchTerm: string,
  page: number = 1,
  limit: number = 10,
): Promise<Artwork[]> {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=${limit}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}

async function getTotalItems(searchTerm: string): Promise<number> {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.pagination.total;
    });
}

async function getDetails(url: string): Promise<number> {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}

export { getArt, getTotalItems, getDetails };
