import React, { Component } from 'react';
import moment from 'moment';
import { func, string, object } from 'prop-types';
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

    this.props.loadPostTypes();
  }

  onFetchResult = ( response ) => {
    this.setState( {
      recents: response
    } );
  }

  getLabel = ( type ) => {
    if ( !type.list.length ) return '';
    const typeObj = type.list.find( item => item.key === this.props.postType );
    if ( !typeObj.display ) return '';
    return typeObj.display;
  }

  handleClick( e ) {
    e.preventDefault();

    // send blank payload to clear pre-checked options
    this.props.categoryUpdate();
    this.props.postTypeUpdate();
    this.props.sourceUpdate();
    this.props.languageUpdate();
    this.props.dateUpdate();

    // enable post type in filter
    this.props.postTypeUpdate( {
      type: this.props.postType,
      display_name: this.getLabel( this.props.type ),
      checked: true
    } );

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
          <Header as="h1" size="large">Most Recent { this.getLabel( this.props.type ) }s</Header>
          <Link to="/results" className="browseAll" onClick={ this.handleClick } >
            Browse All { this.getLabel( this.props.type ) }s
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
  loadPostTypes: func,
  languageUpdate: func,
  categoryUpdate: func,
  postTypeUpdate: func,
  sourceUpdate: func,
  dateUpdate: func,
  postType: string,
  type: object,
  history: object
};

export default withRouter( connect( mapStateToProps, actions )( Recents ) );
