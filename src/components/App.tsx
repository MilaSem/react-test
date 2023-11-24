import { useState, ChangeEvent, createContext } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { ResultList } from './ResultList/ResultList';
import { type Artwork } from '../api/artwork';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';
import { Dropdown } from './Pagination/Dropdown';
import { PaginationButton } from './Pagination/PaginationButton';
import { useGetArtworksQuery } from '../redux/services/artworks/artworkApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeLimit, changeSearchTerm } from '../redux/features/artworks/artworkSlice';
import { TOTAL_ITEMS_API } from '../api/api';
// import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';

interface AppState {
  page: number;
}

interface AppContextValues {
  artworks: Artwork[];
}

const AppContext = createContext<AppContextValues>({
  artworks: [],
});

const App = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<AppState>({
    page: 1,
  });

  const searchTerm = useAppSelector((state) => state.artworkState.searchTerm);
  const dispatch = useAppDispatch();
  const limit = useAppSelector((state) => state.artworkState.limit);
  const { data } = useGetArtworksQuery({
    q: searchTerm,
    limit,
    page: state.page,
  });
  const artworks = data?.data || [];

  let totalPages = 100;
  if (data) {
    totalPages = Math.min(TOTAL_ITEMS_API / limit, Math.ceil(data?.pagination.total / limit));
  }

  // useEffect(() => {
  //   setSearchParams((last) => {
  //     last.set('page', String(state.page));
  //     return last;
  //   });
  // }, [state.page, setSearchParams]);

  const handleSearchSubmit = (searchTerm: string) => {
    dispatch(changeSearchTerm(searchTerm));
    setState((last) => ({
      ...last,
      page: 1,
    }));
  };

  const handleMainClick = (event: { preventDefault: () => void }) => {
    // if (!details) {
    //   return;
    // }

    event.preventDefault();
    router.push('/');
    // setSearchParams((last) => {
    //   last.delete('details');
    //   return last;
    // });
  };

  return (
    <AppContext.Provider value={{ artworks }}>
      <main className="main" onClick={handleMainClick}>
        <h1>Let{`'`}s find artwork at the Art Institute of Chicago!</h1>
        <section className="search">
          <SearchForm onSubmit={(value) => handleSearchSubmit(value)} />
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
                    page: last.page - 1,
                  }));
              }}
            />
            <span className="pagination__number">{state.page}</span>
            <PaginationButton
              char=">"
              onClick={() => {
                state.page < totalPages &&
                  setState((last) => ({
                    ...last,
                    page: last.page + 1,
                  }));
              }}
            />
            <PaginationButton
              char=">>"
              onClick={() => {
                setState((last) => ({
                  ...last,
                  page: totalPages,
                }));
              }}
            />
          </div>
          <Dropdown
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(changeLimit(Number(e.target.value)));
              setState((last) => ({
                ...last,
                page: 1,
              }));
            }}
          />
        </div>
        <section className="result">
          <ResultList />
        </section>
        <ButtonToBreak />
      </main>
      {/* {details ? (
        <div id="details" className="details">
          <Outlet />
        </div>
      ) : null} */}
      {children}
    </AppContext.Provider>
  );
};

export { App, AppContext };
