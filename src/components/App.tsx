import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import { ResultList } from './ResultList/ResultList';
import { type Artwork } from '../api/artwork';
import './App.css';
import { getArt, getTotalItems } from '../api/api';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';
import { Dropdown } from './Pagination/Dropdown';
import { PaginationButton } from './Pagination/PaginationButton';

interface AppState {
  searchTerm: string;
  artworks: Artwork[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    artworks: [],
    isLoading: false,
    page: 1,
    limit: 10,
    totalPages: 12339, // set on first boot 123386/10!
  });

  const setIsLoading = (isLoading: boolean) => {
    setState((last) => ({
      ...last,
      isLoading,
    }));
  };

  const fetchArtwork = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);
      const artworks = await getArt(searchTerm, state.page, state.limit);
      const totalItems = await getTotalItems(searchTerm);
      setState((last) => ({
        ...last,
        totalPages: Math.ceil(totalItems / state.limit),
      }));

      setIsLoading(false);
      return artworks;
    },
    [state.page, state.limit],
  );

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

  useEffect(() => {
    setState((last) => ({
      ...last,
      page: 1,
      limit: 10,
    }));
  }, [state.searchTerm]); //when characters in search input are removed, the page is rendered! Why?!

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
      <div className="pagination__nav">
        <div className="pagination">
          <PaginationButton
            char="<<"
            onClick={() => {
              setState((last) => ({
                ...last,
                page: 1,
              }));
            }}
          />
          <PaginationButton
            char="<"
            onClick={() => {
              state.page > 1 &&
                setState((last) => ({
                  ...last,
                  page: state.page - 1,
                }));
            }}
          />
          <span className="pagination__number">{state.page}</span>
          <PaginationButton
            char=">"
            onClick={() => {
              state.page < state.totalPages &&
                setState((last) => ({
                  ...last,
                  page: state.page + 1,
                }));
            }}
          />
          <PaginationButton
            char=">>"
            onClick={() => {
              setState((last) => ({
                ...last,
                page: state.totalPages,
              }));
            }}
          />
        </div>
        <Dropdown
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setState((last) => ({
              ...last,
              limit: Number(e.target.value),
            }));
          }}
        />
      </div>

      <div className="temp">
        page {state.page}, limit {state.limit}, total pages {state.totalPages}
      </div>

      <section className="result">
        <ResultList artworks={state.artworks} />
      </section>

      <ButtonToBreak />
    </>
  );
};

export { App };
