import '../App.css';

interface ResultListItemProps {
  title: string;
  alt_text: string;
}

const ResultListItem = (props: ResultListItemProps) => {
  const { title, alt_text } = props;

  return (
    <div className="result__item">
      <p>
        <b>{title}</b>
      </p>
      <p>{alt_text}</p>
    </div>
  );
};

export { ResultListItem };
