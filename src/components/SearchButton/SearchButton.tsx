import { Component } from 'react';
import '../App.css';
import { getSW } from '../../api/api';
import { type People } from '../../types/people';

interface SearchButtonProps {
  searchTerm: string;
  setHeroes: (data: People[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

class SearchButton extends Component<SearchButtonProps> {
  constructor(props: SearchButtonProps) {
    super(props);
  }

  handleClick = async () => {
    console.log('click search btn!');

    this.props.setIsLoading(true);
    const heroes = await getSW(this.props.searchTerm);
    this.props.setIsLoading(false);

    this.props.setHeroes(heroes);
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
