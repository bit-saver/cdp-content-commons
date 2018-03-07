import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import { Header } from 'semantic-ui-react';
import Title from '../Title';
import Search from '../Search';

const HeaderItem = ( props ) => {
  const barClass = ( `${props.location.pathname}bar` ).substr( 1 );

  return (
    <header className={ barClass }>
      <Header as="h1" textAlign="center">
        <Title />
        <Header.Subheader className="subtitle">
          Welcome to the Content Commons. Here you can discover, find, and reuse public diplomacy
          content from U.S. Department of State resources.
        </Header.Subheader>
      </Header>
      <Search />
    </header>
  );
};

HeaderItem.propTypes = {
  location: object
};

export default withRouter( HeaderItem );
