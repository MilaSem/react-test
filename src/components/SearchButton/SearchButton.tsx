import { Component } from 'react';
import '../App.css';
import { getSW } from '../../api/api';

interface SearchButtonProps {
  searchTerm: string;
}

class SearchButton extends Component<SearchButtonProps> {
  constructor(props: SearchButtonProps) {
    super(props);
  }

  testBtn = async () => {
    console.log('click search btn!');
    console.log(await getSW(this.props.searchTerm));
  };

  render() {
    return (
      <button type="submit" onClick={this.testBtn} className="search__button">
        Search
      </button>
    );
  }
}

export { SearchButton };
