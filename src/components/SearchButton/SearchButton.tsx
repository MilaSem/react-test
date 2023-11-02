import '../App.css';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = (props: SearchButtonProps) => {
  return (
    <>
      <button type="submit" onClick={props.onClick} className="search__button">
        Search
      </button>
    </>
  );
};

export { SearchButton };
