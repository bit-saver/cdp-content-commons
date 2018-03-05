import React from 'react';

import Nav from '../Nav';
import Header from '../Header';
import Search from '../Search';
import Results from '../Results';

const ResultsPage = () => (
  <div>
    <header>
      <Nav />
      <Header />
      <Search />
    </header>
    <main>
      <Results />
    </main>
  </div>
);

export default ResultsPage;
