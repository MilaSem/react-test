import { Component } from 'react';
import '../App.css';
import { type People } from '../../types/people';
import { ResultListItem } from '../ResultListItem/ResultListItem';
interface ResultListProps {
  heroes: People[];
}

class ResultList extends Component<ResultListProps> {
  render() {
    return (
      <>
        {this.props.heroes.map((item) => (
          <ResultListItem
            key={item.name}
            name={item.name}
            height={item.height}
            mass={item.mass}
            birth_year={item.birth_year}
          />
        ))}
      </>
    );
  }
}

export { ResultList };
