import { PureComponent } from 'react';
import '../App.css';

interface ResultListItemProps {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

class ResultListItem extends PureComponent<ResultListItemProps> {
  render() {
    return (
      <div className="result__item">
        <p>
          name: <b>{this.props.name}</b>
        </p>
        <p>
          description: height {this.props.height} cm, mass {this.props.mass} kg, birth year{' '}
          {this.props.birth_year}
        </p>
      </div>
    );
  }
}

export { ResultListItem };
