import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Page from '../PageTmpl';
import Breadcrumbs from 'components/Breadcrumbs';
import Error from 'components/Error';
import config from 'config';
import withMarkdown from 'hocs/withMarkdown';

const HelpPage = props => (
  <Page title="Help" description="Get help">
    <Breadcrumbs />
    <Header as="h1">
    Help
      <Header.Subheader>Common questions and solutions for Content Commons.</Header.Subheader>
    </Header>
    { props.error ? <Error /> : <ReactMarkdown source={ props.markdown } /> }
  </Page>
);

HelpPage.propTypes = {
  markdown: PropTypes.string,
  error: PropTypes.bool
};

const WrappedComponent = withMarkdown( HelpPage, config.HELP_URL );

export default WrappedComponent;
