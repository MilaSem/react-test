import '../App.css';

interface SearchButtonProps {
  handleClick: () => void;
}

const SearchButton = (props: SearchButtonProps) => {
  return (
    <>
      <button type="submit" onClick={props.handleClick} className="search__button">
        Search
      </button>
    </>
  );
};

export { SearchButton };
