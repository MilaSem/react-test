import { Component } from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import { ResultList } from './ResultList/ResultList';
import { type People } from '../types/people';
import './App.css';
import { getSW } from '../api/api';
import { ButtonToBreak } from './ButtonToBreak/ButtonToBreak';

interface AppState {
  searchTerm: string;
  heroes: People[];
  isLoading: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      heroes: [],
      isLoading: false,
    };
    this.setIsLoading = this.setIsLoading.bind(this);
  }

  setIsLoading(isLoading: boolean) {
    this.setState((last) => ({
      ...last,
      isLoading,
    }));
  }

  loadPeople = async (searchTerm: string) => {
    this.setIsLoading(true);
    const heroes = await getSW(searchTerm);
    this.setIsLoading(false);

    this.setState((last) => ({
      ...last,
      heroes,
    }));
  };

  componentDidMount() {
    let searchTerm = this.state.searchTerm;
    if (localStorage.getItem('searchTerm')) {
      searchTerm = localStorage.getItem('searchTerm') || '';
      this.setState((last) => ({
        ...last,
        searchTerm,
      }));
    }
    this.loadPeople(searchTerm);
  }

  componentDidUpdate() {
    localStorage.setItem('searchTerm', this.state.searchTerm);
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div className="shadow">
            <div className="spinner"></div>
          </div>
        ) : null}
        <h1>Let{`'`}s find a character from Star Wars!</h1>
        <section className="search">
          <SearchInput
            searchTerm={this.state.searchTerm}
            setSearchTerm={(term) =>
              this.setState((last) => ({
                ...last,
                searchTerm: term,
              }))
            }
            handleKeyDown={(event: { keyCode: number }) => {
              if (event.keyCode === 13) {
                console.log('enter key pressed');
                this.loadPeople(this.state.searchTerm);
                return false;
              }
            }}
          />
          <SearchButton handleClick={() => this.loadPeople(this.state.searchTerm)} />
        </section>
        <section className="result">
          <ResultList heroes={this.state.heroes} />
        </section>
        <ButtonToBreak />
      </>
    );
  }
}

export { App };
