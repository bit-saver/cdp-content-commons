import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Breadcrumbs.css';

const Breadcrumbs = ( props ) => {
  const path = ( props.location.pathname ).substr( 1 );

  return (
    <Breadcrumb>
      <Breadcrumb.Section href="/">Content Commons</Breadcrumb.Section>
      <Breadcrumb.Divider icon="right angle" />
      <Breadcrumb.Section active className="path">{ path }</Breadcrumb.Section>
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  location: object
};

export default withRouter( Breadcrumbs );
