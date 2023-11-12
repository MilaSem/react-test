import '../App.css';

interface PaginationProps {
  onClick: () => void;
  char: string;
}

const PaginationButton = (props: PaginationProps) => {
  return (
    <button className="pagination__button" onClick={props.onClick}>
      {props.char}
    </button>
  );
};

export { PaginationButton };
