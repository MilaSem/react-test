import { Component } from 'react';
import '../App.css';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

class SearchInput extends Component<SearchInputProps> {
  constructor(props: SearchInputProps) {
    super(props);
  }

  handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchTerm(e.target.value);
  };

  render() {
    return (
      <input
        type="text"
        value={this.props.searchTerm}
        onChange={this.handleSearchInputChange}
        className="search__input"
      />
    );
  }
}

export { SearchInput };
