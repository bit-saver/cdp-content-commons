import React from 'react';
import { Header } from 'semantic-ui-react';
import { string } from 'prop-types';
import Title from '../Title';

const Heading = props => (
  <Header as="h1">
    <Title />
    { props.page === 'landing' &&
      <section>
        <Header.Subheader className="subtitle">Discover, share, connect.</Header.Subheader>
        <Header.Subheader className="subtext">
          The Commons is the portal to find, use, and share content from the U.S. Department of State.
        </Header.Subheader>
        <Header.Subheader className="subtext">
          Connecting people with content. To get started, search or browse below.
        </Header.Subheader>
      </section>
    }
  </Header>
);

Heading.propTypes = {
  page: string
};

export default Heading;
