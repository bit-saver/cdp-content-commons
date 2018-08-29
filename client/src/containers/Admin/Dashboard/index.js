/**
 *
 * Dashboard
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectDashboard from './selectors';

import { Grid, Menu } from 'semantic-ui-react';
import userIcon from 'assets/icons/icon_user_profile.svg';

import './Dashboard.css';

const menuItems = [
  { key: 1, name: 'dashboard', disabled: true },
  { key: 2, name: 'projects', disabled: false },
  { key: 3, name: 'my projects', disabled: true },
  { key: 4, name: 'team projects', disabled: true },
  { key: 5, name: 'favorites', disabled: true },
  { key: 6, name: 'collections', disabled: true }
];

/* eslint-disable react/prefer-stateless-function */
class Dashboard extends React.Component {
  state = { activeItem: 'projects' };

  handleItemClick = ( e, { name } ) => this.setState( { activeItem: name } );

  render() {
    return (
      <section className="dashboard">
        <Menu stackable borderless secondary>
          <Menu.Item>
            <img src={ userIcon } className="userIcon" alt="User Profile Icon" />
            <span className="currentDashboard">{ this.state.activeItem }</span>
          </Menu.Item>
          { menuItems.map( item => (
            <Menu.Item
              key={ item.key }
              name={ item.name }
              active={ this.state.activeItem === item.name }
              onClick={ this.handleItemClick }
              disabled={ item.disabled }
            />
          ) ) }
        </Menu>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={ 3 }>
              [ FILTERS ]
            </Grid.Column>
            <Grid.Column width={ 13 }>
              [ DASHBOARD CONTENT ]
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    );
  }
}

Dashboard.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  dashboard: makeSelectDashboard()
} );

export default connect( mapStateToProps, actions )( Dashboard );
