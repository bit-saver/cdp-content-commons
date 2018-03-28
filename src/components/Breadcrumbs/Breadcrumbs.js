import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Breadcrumbs.css';

const Breadcrumbs = ( props ) => {
  const paths = ( props.location.pathname ).split( '/' ).slice( 1 ).filter( Boolean );

  return (
    <Breadcrumb size="small">
      <Breadcrumb.Section href="/">Content Commons</Breadcrumb.Section>
      { paths.map( ( pathname, i, arr ) => (
        <span key={ pathname }>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active={ arr.length - 1 === i } className="pathname">{ pathname }</Breadcrumb.Section>
        </span>
      ) ) }
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  location: object
};

export default withRouter( Breadcrumbs );
