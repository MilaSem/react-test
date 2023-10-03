import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SearchInput, SearchButton, ResultList } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>Let{`'`}s find a character from Star Wars!</h1>
    <section className="search">
      <SearchInput />
      <SearchButton />
    </section>
    <section className="result">
      <ResultList />
      The result is temporarily in the console
    </section>
  </React.StrictMode>,
);
