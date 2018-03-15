import React, { Component } from 'react';
import moment from 'moment';
import { func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Grid, Header, Item } from 'semantic-ui-react';
import './Recents.css';
import defaultImage from '../../assets/images/default_image.png';

class Recents extends Component {
  componentWillMount() {
    this.props.recentsRequest( this.props.type );
  }

  render() {
    let items;
    if ( this.props.recents.items.response ) {
      items = this.props.recents.items.response.hits.hits;
    } else {
      items = [];
    }

    const itemsright = [];

    items.slice( 1 ).forEach( ( item ) => {
      let categories = '';
      item._source.categories.forEach( ( cat, index ) => {
        categories += ( item._source.categories.length === index + 1 )
          ? cat.name.toLowerCase()
          : `${cat.name.toLowerCase()}  ·`;
      } );

      itemsright.push( {
        childKey: item._id,
        image: ( item._source.featured_image ) ? item._source.featured_image.sizes.medium.url : defaultImage,
        header: item._source.title,
        meta: moment( item._source.published ).format( 'MMMM DD, YYYY' ),
        extra: categories,
        as: 'a'
      } );
    } );

    if ( items[0] ) {
      return (
        <section className="recents">
          <Header as="h1" size="large">Most Recent { this.props.label }</Header>
          <Grid columns="equal" stackable stretched>
            <Grid.Column width={ 8 }>
              <div
                className="recentsleft"
                style={ {
                  backgroundImage: `url( ${( items[0]._source.featured_image ) ?
                    items[0]._source.featured_image.sizes.large.url :
                    defaultImage} )`
                } }
              >
                <div className="recentsoverlay">{ items[0]._source.title }</div>
              </div>
            </Grid.Column>
            <Grid.Column width={ 8 }>
              <Item.Group items={ itemsright } />
            </Grid.Column>
          </Grid>
        </section>
      );
    }
    return [];
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
