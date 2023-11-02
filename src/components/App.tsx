import { useState, useEffect, useCallback } from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import { ResultList } from './ResultList/ResultList';
import { type Artwork } from '../api/artwork';
import './App.css';
import { getArt } from '../api/api';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';
import { Pagination } from './Pagination/Pagination';
import { Dropdown } from './Pagination/Dropdown';

interface AppState {
  searchTerm: string;
  artworks: Artwork[];
  isLoading: boolean;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    artworks: [],
    isLoading: false,
  });

  const setIsLoading = (isLoading: boolean) => {
    setState((last) => ({
      ...last,
      isLoading,
    }));
  };

  const fetchArtwork = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    const artworks = await getArt(searchTerm);
    setIsLoading(false);
    return artworks;
  }, []);

  const loadArtwork = useCallback(
    async (searchTerm: string) => {
      const artworks = await fetchArtwork(searchTerm);

      setState((last) => ({
        ...last,
        artworks,
      }));
      localStorage.setItem('searchTerm', searchTerm);
    },
    [fetchArtwork],
  );

  useEffect(() => {
    let ignore = false;
    async function init() {
      const searchTerm = localStorage.getItem('searchTerm') || '';
      const artworks = await fetchArtwork(searchTerm);

      if (!ignore) {
        setState((last) => ({
          ...last,
          artworks,
        }));
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, [fetchArtwork]);

  return (
    <>
      {state.isLoading ? (
        <div className="shadow">
          <div className="spinner"></div>
        </div>
      ) : null}
      <h1>Let{`'`}s find artwork at the Art Institute of Chicago!</h1>
      <section className="search">
        <SearchInput
          searchTerm={state.searchTerm}
          setSearchTerm={(term) =>
            setState((last) => ({
              ...last,
              searchTerm: term,
            }))
          }
          onKeyDown={(event: { keyCode: number }) => {
            if (event.keyCode === 13) {
              console.log('enter key pressed');
              loadArtwork(state.searchTerm);
              return false;
            }
          }}
        />
        <SearchButton onClick={() => loadArtwork(state.searchTerm)} />
      </section>
      <section className="result">
        <ResultList artworks={state.artworks} />
      </section>
      <Pagination />
      <Dropdown />
      <ButtonToBreak />
    </>
  );
};

export { App };
