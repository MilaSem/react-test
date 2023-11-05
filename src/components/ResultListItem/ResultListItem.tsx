import '../App.css';

interface ResultListItemProps {
  title: string;
  alt_text: string;
  onClick: () => void;
  id: number;
}

const ResultListItem = (props: ResultListItemProps) => {
  const { title, alt_text } = props;

  return (
    <div className="result__item" onClick={props.onClick}>
      <p>
        <b>{title}</b>
      </p>
      <p>{alt_text}</p>
    </div>
  );
};

export { ResultListItem };
