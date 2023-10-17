import { Component } from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import { ResultList } from './ResultList/ResultList';
import { type People } from '../types/people';
import './App.css';

interface AppState {
  searchTerm: string;
  heroes: People[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      heroes: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('searchTerm')) {
      this.setState((last) => ({
        ...last,
        searchTerm: localStorage.getItem('searchTerm') || '',
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('searchTerm', this.state.searchTerm);
  }

  render() {
    return (
      <>
        <h1>Let{`'`}s find a character from Star Wars!</h1>
        <section className="search">
          <SearchInput
            searchTerm={this.state.searchTerm}
            setSearchTerm={(term) => this.setState({ searchTerm: term })}
          />
          <SearchButton
            searchTerm={this.state.searchTerm}
            heroes={(data) => this.setState({ heroes: data })}
          />
        </section>
        <section className="result">
          <ResultList heroes={this.state.heroes} />
        </section>
        <section className="total">
          There are {this.state.heroes.length} {this.state.heroes.length === 1 ? 'item ' : 'items '}{' '}
          in the database
        </section>
      </>
    );
  }
}

export { App };
