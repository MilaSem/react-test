import { Component } from 'react';
import './App.css';

type People = {
  name: string,
  birth_year: string,
  eye_color: string,
  gender: string,
  hair_color: string,
  height: string,
  mass: string,
  skin_color: string,
  homeworld: string,
  films: string[],
  species: string[],
  starships: string[],
  vehicles: string[],
  url: string,
  created: string,
  edited: string
}

type Peoples = People[];

let searchTerm = '';

async function getSW(searchTerm: string): Promise<Peoples> {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}`;
  return fetch(url)
  .then((response) => {return response.json()})
  .then((data) => {return data.results});
}

async function printResult() {
  console.log(searchTerm);
  const result = await getSW(searchTerm);
  console.log(result);
}

class SearchInput extends Component {
  state = {
    searchTerm: '',
  };

  handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  render() {
    return (
      <input type="text" value={this.state.searchTerm} onChange={this.handleSearchInputChange}  className="search__input"/>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('searchTerm')) {
      this.setState({
        searchTerm: localStorage.getItem('searchTerm'),
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('searchTerm', this.state.searchTerm);
    searchTerm = this.state.searchTerm;
  }
}

class SearchButton extends Component {
  testBtn = () => {
    console.log('click search btn!');  
    printResult();    
  }  

  render() {
    return (
      <button type="submit" onClick={this.testBtn} className='search__button'>Search</button>
    );
  }
}

class ResultList extends Component {
  render() {
    return (
      <div />
    );
  }
}

export { SearchInput, SearchButton, ResultList };
