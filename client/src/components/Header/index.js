import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import './Header.css';

import Nav from 'components/Nav';
import SearchBar from 'containers/SearchBar';

const HeaderItem = ( props ) => {
  const pagePath = props.location.pathname.split( '/' ).slice( 1 );
  const barClass = `bar ${pagePath[0] === '' ? 'bar--home' : pagePath.map( path => `bar--${path}` ).join( ' ' )}`;

  return (
    <section className={ barClass }>
      <div className="ui container">
        <header>
          <Header as="h1">
            <Link to="/" className="title">Content Commons<span className="beta">BETA</span></Link>
            <Header.Subheader className="subtitle">Discover, share, connect.</Header.Subheader>
            <Header.Subheader className="subtext">
              The Commons is the portal to find, use, and share content from the U.S. Department of State.
            </Header.Subheader>
            <Header.Subheader className="subtext">
              Connecting people with content. To get started, search or browse below.
            </Header.Subheader>
          </Header>
          <SearchBar />
          <Nav />
        </header>
      </div>
    </section>
  );
};

HeaderItem.propTypes = {
  location: PropTypes.object
};

export default withRouter( HeaderItem );
