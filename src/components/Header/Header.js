import React from 'react';
import { Header } from 'semantic-ui-react';
import Title from '../Title';

const HeaderItem = () => (
  <section>
    <Header as="h1" textAlign="center">
      <Title />
      <Header.Subheader className="subtitle">
        Welcome to the Content Commons. Here you can discover, find, and reuse public diplomacy
        content from U.S. Department of State resources.
      </Header.Subheader>
    </Header>
  </section>
);

export default HeaderItem;
