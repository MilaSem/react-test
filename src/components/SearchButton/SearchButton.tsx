import { Component } from 'react';
import '../App.css';
import { getSW } from '../../api/api';
import { type People } from '../../types/people';

interface SearchButtonProps {
  searchTerm: string;
  heroes: (data: People[]) => void;
}

class SearchButton extends Component<SearchButtonProps> {
  constructor(props: SearchButtonProps) {
    super(props);
  }

  handleClick = async () => {
    console.log('click search btn!');
    console.log(await getSW(this.props.searchTerm));
    this.props.heroes(await getSW(this.props.searchTerm));
  };

  render() {
    return (
      <>
        <button type="submit" onClick={this.handleClick} className="search__button">
          Search
        </button>
      </>
    );
  }
}

export { SearchButton };
