import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './BasePage.css';

const Page = props => (
  <section className="cdp_static_page">
    <Helmet>
      <title>{ props.title }</title>
      <meta
        name="description"
        content={ props.description }
      />
    </Helmet>
    { props.children }
  </section>
);

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Page;
