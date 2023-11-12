import { useState, ChangeEvent, useContext } from 'react';
import { AppContext } from '../App';

type SearchFormProps = {
  onSubmit: (value: string) => void;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const { searchTerm } = useContext(AppContext);

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
