import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import Heading from '../Heading';
import Nav from '../Nav';
import Search from '../Search';

const HeaderItem = ( props ) => {
  const barClass = ( `${props.location.pathname}bar` ).substr( 1 );

  return (
    <section className={ barClass }>
      <div className="ui container">
        <header>
          <Heading />
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
