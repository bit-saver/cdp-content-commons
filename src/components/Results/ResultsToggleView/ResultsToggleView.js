import React from 'react';
import { func } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './ResultsToggleView.css';

const ResultsToggleView = props => (
  <div className="results_toggleView">
    <Icon name="grid layout" data-view="gallery" onClick={ props.toggle } />
    <Icon name="list" data-view="list" onClick={ props.toggle } />
  </div>
);

ResultsToggleView.propTypes = {
  toggle: func
};

export default ResultsToggleView;
