import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from '../PageTmpl';
import Breadcrumbs from 'components/Breadcrumbs';
import Error from 'components/Error';
import config from 'config';
import withMarkdown from 'hocs/withMarkdown';

const ContactPage = props => (
  <Page title="Contact" description="Contact IIP">
    <Breadcrumbs />
    <Header as="h1">Contact Us</Header>
    { props.error ? <Error /> : <ReactMarkdown source={ props.markdown } /> }
  </Page>
);

ContactPage.propTypes = {
  markdown: PropTypes.string,
  error: PropTypes.bool
};

const WrappedComponent = withMarkdown( ContactPage, config.CONTACT_URL );

export default WrappedComponent;
