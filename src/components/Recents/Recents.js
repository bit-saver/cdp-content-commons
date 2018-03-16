import React, { Component } from 'react';
import moment from 'moment';
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

      const metadiv = (
        <div className="meta">
          <span className="date">{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</span>
          <span className="categories">{ categories }</span>
        </div>
      );

      itemsright.push( {
        childKey: item._id,
        image: item.thumbnail,
        header: item.title,
        meta: metadiv,
        as: 'a'
      } );
    } );

    return (
      <section className="recents">
        <Header as="h1" size="large">Most Recent { this.props.label }</Header>
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } style={ { paddingRight: '0' } }>
            <div
              className="recentsleft"
              style={ {
                backgroundImage: `linear-gradient(to bottom,
                  rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
                  url( ${items[0].thumbnail} )`
              } }
            >
              <div className="recentsoverlay">{ items[0].title }</div>
            </div>
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Item.Group items={ itemsright } />
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
