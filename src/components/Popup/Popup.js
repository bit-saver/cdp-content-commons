import React from 'react';
import { string, node } from 'prop-types';
import { Header } from 'semantic-ui-react';
import './Popup.css';

const Popup = props => (
  <div>
    <Header as="h2">{ props.title }</Header>
    { props.children }
  </div>
);

Popup.propTypes = {
  title: string,
  children: node
};

export default Popup;
