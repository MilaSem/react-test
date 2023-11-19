import { useState, ChangeEvent } from 'react';
import { useAppSelector } from '../../redux/hooks';

type SearchFormProps = {
  onSubmit: (value: string) => void;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const searchTerm = useAppSelector((state) => state.artworkState.searchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValue);
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchInputChange}
        className="search__input"
      />
      <button className="search__button">Search</button>
    </form>
  );
};

export { SearchForm };
