import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import Error from 'components/Error';
import config from 'config';
import withMarkdown from 'hocs/withMarkdown';

const PrivacyPage = props => (
  <Page title="Privacy" description="Privacy policy">
    <Breadcrumbs />
    <Header as="h1">Privacy Policy</Header>
    { props.error ? <Error /> : <ReactMarkdown source={ props.markdown } /> }
  </Page>
);

PrivacyPage.propTypes = {
  markdown: PropTypes.string,
  error: PropTypes.bool
};

const WrappedComponent = withMarkdown( PrivacyPage, config.PRIVACY_URL );

export default WrappedComponent;
