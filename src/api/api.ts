import { type People } from '../types/people';

async function getSW(searchTerm: string): Promise<People[]> {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.results;
    });
}

export { getSW };
