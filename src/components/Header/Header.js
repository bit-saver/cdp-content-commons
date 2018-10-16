import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Header.css';
import Heading from '../Heading';
import Nav from '../Nav';
import Search from '../Search';

const HeaderItem = ( props ) => {
  let page = props.location.pathname.split( '/' ).join( ' ' ).trim();
  if ( page === '' ) page = 'landing';
  if ( page === '404' ) page = 'notfound';

  return (
    <section className={ `${page} headerbar` }>
      <div className="ui container">
        <header>
          <Heading page={ page } />
          <Search />
        </header>
        <Nav />
      </div>
    </section>
  );
};

HeaderItem.propTypes = {
  location: object
};

export default withRouter( HeaderItem );
