import React from 'react';
import { Header } from 'semantic-ui-react';
import Title from '../Title';

const Heading = () => (
  <Header as="h1">
    <Title />
    <Header.Subheader className="subtitle">
      Welcome to the Content Commons. Here you can discover, find, and reuse public diplomacy
      content from U.S. Department of State resources.
    </Header.Subheader>
  </Header>
);

export default Heading;
