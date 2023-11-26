import { ChangeEvent, useEffect, useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { ResultList } from './ResultList/ResultList';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';
import { Dropdown } from './Pagination/Dropdown';
import { PaginationButton } from './Pagination/PaginationButton';
import { useGetArtworksQuery } from '../redux/services/artworks/artworkApi';
import { TOTAL_ITEMS_API } from '../api/api';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

interface AppState {
  page: number;
  searchTerm: string;
  limit: number;
}

const App = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number.parseInt(searchParams.get('page') as string) || 1;
  const search = searchParams.get('search') || '';
  const limit = Number.parseInt(searchParams.get('limit') as string) || 10;

  const [state, setState] = useState<AppState>({
    page,
    limit,
    searchTerm: search,
  });

  const { data } = useGetArtworksQuery({
    q: search,
    limit,
    page,
  });
  const artworks = data?.data || [];

  let totalPages = 100;
  if (data) {
    totalPages = Math.min(TOTAL_ITEMS_API / limit, Math.ceil(data?.pagination.total / limit));
  }

  useEffect(() => {
    if (state.page !== page || state.limit !== limit || state.searchTerm !== search) {
      router.push({
        pathname: '/',
        query: { ...router.query, page: state.page, limit: state.limit, search: state.searchTerm },
      });
    }
  }, [router, state, limit, page, search]);

  return (
    <>
      <main className="main">
        <h1>Let{`'`}s find artwork at the Art Institute of Chicago!</h1>
        <section className="search">
          <SearchForm />
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
            <span className="pagination__number">{page}</span>
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
              console.log('test');
              setState((last) => ({
                ...last,
                page: 1,
                limit: Number(e.target.value),
              }));
            }}
          />
        </div>
        <section className="result">
          <ResultList artworks={artworks} />
        </section>
        <ButtonToBreak />
      </main>
    </>
  );
};

export { App };
