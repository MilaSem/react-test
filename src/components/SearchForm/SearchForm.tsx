import { useState, ChangeEvent } from 'react';

type SearchFormProps = {
  searchTerm: string;
  onSubmit: (value: string) => void;
};

const SearchForm = ({ searchTerm, onSubmit }: SearchFormProps) => {
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
