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

// limit * totalPages <= 1000!
// else API answers 403
// "You have requested too many results. Please refine your parameters."
const TOTAL_ITEMS_API = 1000;

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

async function getDetails(url: string) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}

export { getArt, TOTAL_ITEMS_API, getTotalItems, getDetails };
