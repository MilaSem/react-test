import { ChangeEvent } from 'react';
import '../App.css';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onKeyDown: (event: { keyCode: number }) => false | undefined;
}

const SearchInput = (props: SearchInputProps) => {
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={props.searchTerm}
      onChange={handleSearchInputChange}
      className="search__input"
      onKeyDown={props.onKeyDown}
    />
  );
};

export { SearchInput };
