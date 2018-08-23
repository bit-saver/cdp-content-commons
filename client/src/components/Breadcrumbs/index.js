import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breadcrumbs.css';

const Breadcrumbs = ( props ) => {
  const paths = ( props.location.pathname ).split( '/' ).slice( 1 ).filter( Boolean );

  let pathCounter = 0;
  return (
    <Breadcrumb size="small">
      <Breadcrumb.Section><Link to="/">Content Commons</Link></Breadcrumb.Section>
      { paths.map( ( pathname, i, arr ) => {
        pathCounter += 1;
        return (
          <span key={ pathCounter }>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active={ arr.length - 1 === i } className="pathname">{ pathname }</Breadcrumb.Section>
          </span>
        );
      } ) }
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  location: PropTypes.object
};

export default withRouter( Breadcrumbs );
