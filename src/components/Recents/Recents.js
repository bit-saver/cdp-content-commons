import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Grid, Header, Item } from 'semantic-ui-react';
import './Recents.css';
import { normalizeItem } from '../../utils/parser';

class Recents extends Component {
  componentDidMount() {
    this.props.recentsRequest( this.props.type );
  }

  render() {
    let items;
    if ( this.props.recents.items.response ) {
      items = this.props.recents.items.response.hits.hits;
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
          : `${cat.name.toLowerCase()}  ·`;
      } );

      itemsright.push( (
        <Item as={ Link } to={ item.sourcelink } key={ item.id }>
          <Item.Image src={ item.thumbnail } alt={ item.title } />
          <Item.Content>
            <Item.Header>{ item.title }</Item.Header>
            <div className="meta">
              <span className="date">{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</span>
              <span className="categories">{ categories }</span>
              <img src={ item.icon } className="metaicon" alt={ `${this.props.type} icon` } />
            </div>
          </Item.Content>
        </Item>
      ) );
    } );

    return (
      <section className="recents">
        <Header as="h1" size="large">Most Recent { this.props.label }</Header>
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } style={ { paddingRight: '0' } }>
            { items[0] &&
            <a
              href={ items[0].sourcelink }
              className="recentsleft"
              style={ {
                backgroundImage: `url( ${items[0].thumbnail} )`
              } }
            >
              <div className="recentsoverlay">
                <div className="recentsoverlay_title">{ items[0].title }</div>
                <img src={ items[0].icon } className="recentsoverlay_icon" alt={ `${this.props.type} icon` } />
              </div>
            </a>
            }
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Item.Group>{ itemsright }</Item.Group>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  recents: state.recents
} );

Recents.propTypes = {
  recentsRequest: func,
  recents: object,
  type: string,
  label: string
};

export default connect( mapStateToProps, actions )( Recents );
