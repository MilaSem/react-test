import '../App.css';

interface ResultListItemProps {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

const ResultListItem = (props: ResultListItemProps) => {
  const { name, height, mass, birth_year } = props;

  return (
    <div className="result__item">
      <p>
        name: <b>{name}</b>
      </p>
      <p>
        description: height {height} cm, mass {mass} kg, birth year {birth_year}
      </p>
    </div>
  );
};

export { ResultListItem };
