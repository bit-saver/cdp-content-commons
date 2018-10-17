import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Header.css';
import Heading from '../Heading';
import Nav from '../Nav';
import Search from '../Search';

const HeaderItem = ( props ) => {
  const barClass = ( `${( props.location.pathname ).split( '/' ).slice( 1 )[0]}bar` );

  return (
    <section className={ barClass }>
      <div className="ui container">
        <header>
          <Heading isLanding={ barClass === 'bar' } />
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
