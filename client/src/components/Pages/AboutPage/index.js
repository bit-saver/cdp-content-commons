import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from '../PageTmpl';
import Breadcrumbs from 'components/Breadcrumbs';
import Error from 'components/Error';
import config from 'config';
import withMarkdown from 'hocs/withMarkdown';
// add helmet stuff
const AboutPage = props => (
  <Page title="About" description="About Content Commons">
    <Breadcrumbs />
    <Header as="h1">About Content Commons</Header>
    { props.error ? <Error /> : <ReactMarkdown source={ props.markdown } /> }
  </Page>
);

AboutPage.propTypes = {
  markdown: PropTypes.string,
  error: PropTypes.bool
};

const WrappedComponent = withMarkdown( AboutPage, config.ABOUT_URL );

export default WrappedComponent;
