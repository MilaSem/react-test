import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const searchRef = useRef<HTMLInputElement>(null);
  const searchValue = searchRef.current?.value || '';

  return (
    <form>
      <input ref={searchRef} type="text" defaultValue={searchTerm} className="search__input" />
      <button
        onClick={() => {
          router.push({
            pathname: '/',
            query: {
              ...router.query,
              search: searchValue,
            },
          });
        }}
        type="button"
        className="search__button"
      >
        Search
      </button>
    </form>
  );
};

export { SearchForm };
