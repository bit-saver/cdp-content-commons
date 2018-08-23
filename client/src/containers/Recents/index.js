import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { v4 } from 'uuid';
import * as globalActions from 'containers/App/actions';
import * as actions from './actions';
import { Grid, Header, Item, Modal, Loader, Message } from 'semantic-ui-react';
import './Recents.css';

import { makeSelectPostTypes, makeSelectPostTypeLabel } from 'containers/App/selectors';
import {
  makeSelectRecentsByType,
  makeSelectRecentsWithMeta,
  makeSelectLoading,
  makeSelectError
} from './selectors';

import ModalContent from 'components/Modals/ModalContent';

class Recents extends Component {
  componentDidMount() {
    this.props.loadPostTypes();
    this.props.loadRecents( this.props.postType, 'en-us' );
  }

  handleClick = ( e ) => {
    e.preventDefault();
    // NOTE: filters are cleared from search component when on landing page
    // so no need to clear filters here

    // enable post type in filter
    this.props.postTypeUpdate( {
      key: this.props.postType,
      display_name: this.props.postTypeLabel,
      checked: true
    } );

    this.props.createRequest();
    this.props.history.push( '/results' );
  }

  renderRecentsWithMeta() {
    return this.props.recentsWithMeta.slice( 1 ).map( recent => (
      <Modal
        key={ v4() }
        closeIcon
        trigger={
          <Item className="recentsItem">
            <div
              className="recentsItem_img"
              style={ { backgroundImage: `url( ${recent.thumbnail} )` } }
            >
              <img src={ recent.icon } className="metaicon" alt={ `${this.props.postType} icon` } />
            </div>
            <Item.Content>
              <Item.Header>{ recent.title }</Item.Header>
              <div className="meta">
                <span className="date">{ moment( recent.published ).format( 'MMMM DD, YYYY' ) }</span>
                <span className="categories">{ recent.categories }</span>
              </div>
            </Item.Content>
          </Item>
        }
      >
        <Modal.Content>
          <ModalContent item={ recent } />
        </Modal.Content>
      </Modal>
    ) );
  }

  render() {
    const {
      recents, recentsWithMeta, recentsLoading, recentsError, postTypeLabel
    } = this.props;

    return (
      <section className="recents">
        <div className="recentstitle">
          <Header as="h1" size="large">Most Recent { this.props.postTypeLabel }s</Header>
          <Link to="/results" className="browseAll" onClick={ this.handleClick } >
            Browse All { this.props.postTypeLabel }s
          </Link>
        </div>
        <Loader active={ recentsLoading } />
        { recentsError && (
          <Message>
            { `Oops, something went wrong.  We are unable to load the most recent ${postTypeLabel.toLowerCase()}s.` }
          </Message>
        ) }
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } className="recentsgridleft" >
            { recents && recents[0] &&
            <Modal
              closeIcon
              trigger={
                <div className="recentsleft" style={ { backgroundImage: `url( ${recents[0].thumbnail} )` } }>
                  <div className="recentsoverlay">
                    <div className="recentsoverlay_title">{ recents[0].title }</div>
                    <img
                      src={ recents[0].icon }
                      className="recentsoverlay_icon"
                      alt={ `${this.props.postType} icon` }
                    />
                  </div>
                </div>
                }
            >
              <Modal.Content>
                <ModalContent item={ recents[0] } />
              </Modal.Content>
            </Modal>
            }
          </Grid.Column>
          <Grid.Column width={ 8 } className="recentsgridright">
            <Item.Group>{ recentsWithMeta && this.renderRecentsWithMeta() }</Item.Group>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}


Recents.propTypes = {
  postType: PropTypes.string,
  recents: PropTypes.array,
  recentsWithMeta: PropTypes.array,
  recentsLoading: PropTypes.bool,
  recentsError: PropTypes.bool,
  postTypeLabel: PropTypes.string,
  createRequest: PropTypes.func,
  loadPostTypes: PropTypes.func,
  postTypeUpdate: PropTypes.func,
  loadRecents: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  postTypes: makeSelectPostTypes(),
  postTypeLabel: makeSelectPostTypeLabel( props ),
  recents: makeSelectRecentsByType(),
  recentsWithMeta: makeSelectRecentsWithMeta(),
  recentsLoading: makeSelectLoading(),
  recentsError: makeSelectError()
} );


export default withRouter( connect( mapStateToProps, { ...globalActions, ...actions } )( Recents ) );
