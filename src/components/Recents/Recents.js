import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import { typeRecentsRequest } from '../../utils/api';
import { Grid, Header, Item, Modal } from 'semantic-ui-react';
import './Recents.css';
import { normalizeItem } from '../../utils/parser';
import ModalContent from '../Modals/ModalContent';

class Recents extends Component {
  componentWillMount() {
    const currentLang = 'en-us';
    typeRecentsRequest( this.props.type, currentLang )
      .then( response => this.onFetchResult( response ) );
  }

  onFetchResult = ( response ) => {
    this.setState( {
      recents: response
    } );
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
                <img src={ item.icon } className="metaicon" alt={ `${this.props.type} icon` } />
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
        <Header as="h1" size="large">Most Recent { this.props.label }</Header>
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } className="recentsgridleft" >
            { items[0] &&
              <Modal
                closeIcon
                trigger={
                  <div className="recentsleft" style={ { backgroundImage: `url( ${items[0].thumbnail} )` } }>
                    <div className="recentsoverlay">
                      <div className="recentsoverlay_title">{ items[0].title }</div>
                      <img src={ items[0].icon } className="recentsoverlay_icon" alt={ `${this.props.type} icon` } />
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

Recents.propTypes = {
  type: string,
  label: string
};

export default Recents;
