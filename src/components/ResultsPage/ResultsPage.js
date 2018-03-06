import React from 'react';

import Nav from '../Nav';
import Results from '../Results';

const ResultsPage = () => (
  <div className="resultspage">
    <header>
      <Nav />
    </header>
    <main className="ui container">
      <Results />
    </main>
  </div>
);

export default ResultsPage;
