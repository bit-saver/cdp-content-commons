import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getItemRequest } from '../../../utils/api';
import { normalizeItem } from '../../../utils/parser';
import Video from '../../Types/Video/Video';

class VideoPage extends Component {
  state = {};

  componentDidMount() {
    const parsed = queryString.parse( this.props.location.search );
    this.loadPage( parsed );
  }

  loadPage( parsed ) {
    getItemRequest( parsed.site, parsed.id )
      .then( ( response ) => {
        if ( response.hits && response.hits.hits && response.hits.hits[0] ) {
          const item = normalizeItem( response.hits.hits[0], parsed.language );
          this.setState( { item } );
        }
      } )
      .catch( ( err ) => {
        // handle errors
      } );
  }

  render() {
    if ( !this.state.item ) {
      return <div />;
    }

    return (
      <section style={ { maxWidth: '1200px', margin: '9em auto 0 auto' } }>
        <Video item={ this.state.item } />
      </section>
    );
  }
}

VideoPage.propTypes = {
  location: object
};

export default withRouter( connect( null, actions )( VideoPage ) );
