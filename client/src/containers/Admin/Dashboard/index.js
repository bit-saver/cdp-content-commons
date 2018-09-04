/**
 *
 * Dashboard
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectDashboard from './selectors';
import { makeSelectUser } from 'containers/Auth/selectors';
import PaneProjects from 'containers/Admin/PaneProjects';

import { Grid, Tab } from 'semantic-ui-react';
import userIcon from 'assets/icons/icon_user_profile_dark.svg';

import './Dashboard.css';

const panes = [
  { menuItem: 'Projects', render: () => <Tab.Pane ><PaneProjects /></Tab.Pane> },
  { menuItem: 'Team Projects', render: () => <Tab.Pane /> },
  { menuItem: 'Favorites', render: () => <Tab.Pane /> },
  { menuItem: 'Collections', render: () => <Tab.Pane /> }
];

/* eslint-disable react/prefer-stateless-function */
class Dashboard extends React.Component {
  state = {
    activeIndex: 0
  }

  tabChange( i ) {
    // Temporarily disable tabs other than Projects (index === 0)
    if ( i === 0 ) this.setState( { activeIndex: i } );
  }

  render() {
    const { user } = this.props;
    return (
      <section className="dashboard">
        <Grid stackable>
          <Grid.Column width={ 2 }>
            <img src={ userIcon } className="userIcon" alt="User Profile Icon" />
            { user && <span className="currentDashboard">{ user.name }</span> }
            <div className="filters">[ FILTERS ]</div>
          </Grid.Column>
          <Grid.Column width={ 14 }>
            <Tab
              menu={ { text: true } }
              panes={ panes }
              activeIndex={ this.state.activeIndex }
              onTabChange={ ( e, { activeIndex } ) => this.tabChange( activeIndex ) }
            />
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.oneOfType( [PropTypes.object, PropTypes.func] )
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  dashboard: makeSelectDashboard(),
  user: makeSelectUser()
} );

export default connect( mapStateToProps, actions )( Dashboard );
