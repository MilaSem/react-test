import { Component } from 'react';
import '../App.css';

interface SearchButtonProps {
  handleClick: () => void;
}

class SearchButton extends Component<SearchButtonProps> {
  constructor(props: SearchButtonProps) {
    super(props);
  }

  render() {
    return (
      <>
        <button type="submit" onClick={this.props.handleClick} className="search__button">
          Search
        </button>
      </>
    );
  }
}

export { SearchButton };
