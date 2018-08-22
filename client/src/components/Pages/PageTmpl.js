import React from 'react';
import { node } from 'prop-types';
import './BasePage.css';

const Page = props => (
  <section className="cdp_static_page">
    { props.children }
  </section>
);

Page.propTypes = {
  children: node
};

export default Page;
