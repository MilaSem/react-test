import { useState, useEffect, useCallback } from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import { ResultList } from './ResultList/ResultList';
import { type People } from '../types/people';
import './App.css';
import { getSW } from '../api/api';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';
import { Pagination } from './Pagination/Pagination';
import { Dropdown } from './Pagination/Dropdown';

interface AppState {
  searchTerm: string;
  heroes: People[];
  isLoading: boolean;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    heroes: [],
    isLoading: false,
  });

  const setIsLoading = (isLoading: boolean) => {
    setState((last) => ({
      ...last,
      isLoading,
    }));
  };

  const fetchPeople = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    const heroes = await getSW(searchTerm);
    setIsLoading(false);
    return heroes;
  }, []);

  const loadPeople = useCallback(
    async (searchTerm: string) => {
      const heroes = await fetchPeople(searchTerm);

      setState((last) => ({
        ...last,
        heroes,
      }));
      localStorage.setItem('searchTerm', searchTerm);
    },
    [fetchPeople],
  );

  useEffect(() => {
    let ignore = false;
    async function init() {
      const searchTerm = localStorage.getItem('searchTerm') || '';
      const heroes = await fetchPeople(searchTerm);

      if (!ignore) {
        setState((last) => ({
          ...last,
          heroes,
        }));
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, [fetchPeople]);

  return (
    <>
      {state.isLoading ? (
        <div className="shadow">
          <div className="spinner"></div>
        </div>
      ) : null}
      <h1>Let{`'`}s find a character from Star Wars!</h1>
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
              loadPeople(state.searchTerm);
              return false;
            }
          }}
        />
        <SearchButton onClick={() => loadPeople(state.searchTerm)} />
      </section>
      <section className="result">
        <ResultList heroes={state.heroes} />
      </section>
      <Pagination />
      <Dropdown />
      <ButtonToBreak />
    </>
  );
};

export { App };
