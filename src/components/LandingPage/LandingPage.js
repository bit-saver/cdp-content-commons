import React from 'react';

import Nav from '../Nav';
import Header from '../Header';
import Search from '../Search';

const LandingPage = () => (
  <div className="landingpage">
    <header>
      <Nav />
    </header>
    <main className="ui container">
      <Header />
      <Search />
    </main>
  </div>
);

export default LandingPage;
