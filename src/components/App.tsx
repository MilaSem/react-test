import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, details] = [Number(searchParams.get('page')), Number(searchParams.get('details'))];

  const [state, setState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    artworks: [],
    isLoading: false,
    page: page || 1,
    limit: 10,
    totalPages: 12339, // set on first boot 123386/10!
  });

  useEffect(() => {
    setSearchParams((last) => ({ ...last, page: String(state.page) }));
  }, [state.page, setSearchParams]);

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
        totalPages: Math.min(Math.ceil(totalItems / state.limit), 10),
      }));

      setIsLoading(false);
      return artworks;
    },
    [state.page, state.limit],
  );

  const loadArtwork = useCallback(
    async (searchTerm: string) => {
      setState((last) => ({
        ...last,
        page: 1,
      }));

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
              // page: 1,
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
              page: 1,
            }));
          }}
        />
      </div>
      <section className="result">
        <ResultList artworks={state.artworks} />
      </section>
      <ButtonToBreak />

      {details ? (
        <div id="detail">
          <Outlet />
        </div>
      ) : null}
    </>
  );
};

export { App };
