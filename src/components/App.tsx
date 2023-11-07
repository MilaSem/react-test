import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { SearchForm } from './SearchForm/SearchForm';
import { ResultList } from './ResultList/ResultList';
import { type Artwork } from '../api/artwork';
import './App.css';
import { getArt, TOTAL_ITEMS_API, getTotalItems } from '../api/api';
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
    totalPages: 100,
  });

  useEffect(() => {
    setSearchParams((last) => ({
      ...last,
      page: String(state.page),
    }));
  }, [state.page, setSearchParams]);

  const setIsLoading = (isLoading: boolean) => {
    setState((last) => ({
      ...last,
      isLoading,
    }));
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      const artworks = await getArt(state.searchTerm, state.page, state.limit);
      const totalItems = await getTotalItems(state.searchTerm);
      setState((last) => ({
        ...last,
        artworks,
        totalPages: Math.min(TOTAL_ITEMS_API / state.limit, Math.ceil(totalItems / state.limit)),
      }));
      setIsLoading(false);
    };

    fetchArtworks();
  }, [state.page, state.limit, state.searchTerm]);

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    setState((last) => ({
      ...last,
      searchTerm,
    }));
  }, []);

  function handleSearchSubmit(searchTerm: string) {
    localStorage.setItem('searchTerm', searchTerm);
    setState((last) => ({
      ...last,
      page: 1,
      searchTerm,
    }));
  }

  return (
    <>
      {state.isLoading ? (
        <div className="shadow">
          <div className="spinner"></div>
        </div>
      ) : null}
      <h1>Let{`'`}s find artwork at the Art Institute of Chicago!</h1>
      <section className="search">
        <SearchForm searchTerm={state.searchTerm} onSubmit={(value) => handleSearchSubmit(value)} />
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
