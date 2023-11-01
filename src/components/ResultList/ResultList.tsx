import '../App.css';
import { type People } from '../../types/people';
import { ResultListItem } from '../ResultListItem/ResultListItem';
import { NothingFound } from '../NothingFound/NothingFound';
interface ResultListProps {
  heroes: People[];
}

const ResultList = (props: ResultListProps) => {
  if (props.heroes.length !== 0) {
    return (
      <>
        {props.heroes.map((hero) => (
          <ResultListItem
            key={hero.name}
            name={hero.name}
            height={hero.height}
            mass={hero.mass}
            birth_year={hero.birth_year}
          />
        ))}
      </>
    );
  } else {
    return <NothingFound />;
  }
};

export { ResultList };
