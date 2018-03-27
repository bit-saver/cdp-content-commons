import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Breadcrumbs.css';

const Breadcrumbs = ( props ) => {
  const paths = ( props.location.pathname ).split( '/' ).slice( 1 ).filter( Boolean );

  return (
    <Breadcrumb>
      <Breadcrumb.Section href="/">Content Commons</Breadcrumb.Section>
      { paths.map( ( pathname, i, arr ) => {
        const breadcrumbSection = ( arr.length - 1 === i )
          ? <Breadcrumb.Section active className="pathname">{ pathname }</Breadcrumb.Section>
          : <Breadcrumb.Section className="pathname">{ pathname }</Breadcrumb.Section>;

        return (
          <span key={ pathname }>
            <Breadcrumb.Divider icon="right angle" />
            { breadcrumbSection }
          </span>
        );
      } ) }
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  location: object
};

export default withRouter( Breadcrumbs );
