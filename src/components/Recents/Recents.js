import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Grid, Card, Image, Header } from 'semantic-ui-react';
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
    return (
      <section>
        <Header as="h1" size="large">Recent { this.props.label }</Header>
        <Grid columns="equal" stackable stretched>
          { items.map( ( item, index ) => (
            <Grid.Column key={ item._id } width={ ( index === 0 ) ? 8 : 4 } >
              <Card>
                <Image
                  src={ ( item._source.featured_image ) ? item._source.featured_image.sizes.medium.url : defaultImage }
                  fluid
                />
                <Card.Content>
                  <Card.Header>{ ( item._source ) ? item._source.title : '' }</Card.Header>
                  <Card.Description>{ ( item._source && index !== 0 ) ? item._source.excerpt : '' }</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ) ) }
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
