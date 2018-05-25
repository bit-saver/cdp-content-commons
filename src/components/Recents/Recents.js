import React, { Component } from 'react';
import moment from 'moment';
import { func, string, shape } from 'prop-types';
import { typeRecentsRequest } from '../../utils/api';
import { Grid, Header, Item, Modal } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Recents.css';
import { normalizeItem } from '../../utils/parser';
import ModalContent from '../Modals/ModalContent';

class Recents extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  componentWillMount() {
    const currentLang = 'en-us';
    typeRecentsRequest( this.props.postType, currentLang )
      .then( response => this.onFetchResult( response ) );
  }

  onFetchResult = ( response ) => {
    this.setState( {
      recents: response
    } );
  }

  handleClick( e ) {
    e.preventDefault();

    // remove video due to being defaulted
    this.props.postTypeUpdate( { type: 'video', display_name: 'Video', checked: false } );

    // enable post type in filter
    this.props.postTypeUpdate( { type: this.props.postType, display_name: this.props.label, checked: true } );

    this.props.createRequest();
    this.props.history.push( '/results' );
  }

  render() {
    let items;
    if ( this.state && this.state.recents.hits ) {
      items = this.state.recents.hits.hits;
    } else {
      return <div />;
    }

    const itemsright = [];

    items = items.map( item => normalizeItem( item ) );

    items.slice( 1 ).forEach( ( item ) => {
      let categories = '';
      item.categories.forEach( ( cat, index ) => {
        categories += ( item.categories.length === index + 1 )
          ? cat.name.toLowerCase()
          : `${cat.name.toLowerCase()}  · `;
      } );

      itemsright.push( (
        <Modal
          key={ item.id }
          closeIcon
          trigger={
            <Item className="recentsItem">
              <div
                className="recentsItem_img"
                style={ { backgroundImage: `url( ${item.thumbnail} )` } }
              >
                <img src={ item.icon } className="metaicon" alt={ `${this.props.postType} icon` } />
              </div>
              <Item.Content>
                <Item.Header>{ item.title }</Item.Header>
                <div className="meta">
                  <span className="date">{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</span>
                  <span className="categories">{ categories }</span>
                </div>
              </Item.Content>
            </Item>
          }
        >
          <Modal.Content>
            <ModalContent item={ item } />
          </Modal.Content>
        </Modal>
      ) );
    } );

    return (
      <section className="recents">
        <div className="recentstitle">
          <Header as="h1" size="large">Most Recent { this.props.label }s</Header>
          <Link to="/results" className="browseAll" onClick={ this.handleClick } >
            Browse All { this.props.label }s
          </Link>
        </div>
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } className="recentsgridleft" >
            { items[0] &&
              <Modal
                closeIcon
                trigger={
                  <div className="recentsleft" style={ { backgroundImage: `url( ${items[0].thumbnail} )` } }>
                    <div className="recentsoverlay">
                      <div className="recentsoverlay_title">{ items[0].title }</div>
                      <img
                        src={ items[0].icon }
                        className="recentsoverlay_icon"
                        alt={ `${this.props.postType} icon` }
                      />
                    </div>
                  </div>
                }
              >
                <Modal.Content>
                  <ModalContent item={ items[0] } />
                </Modal.Content>
              </Modal>
            }
          </Grid.Column>
          <Grid.Column width={ 8 } className="recentsgridright">
            <Item.Group>{ itemsright }</Item.Group>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  type: state.type
} );

Recents.propTypes = {
  createRequest: func,
  postTypeUpdate: func,
  postType: string,
  label: string,
  history: shape( {
    push: func
  } )
};

export default withRouter( connect( mapStateToProps, actions )( Recents ) );
