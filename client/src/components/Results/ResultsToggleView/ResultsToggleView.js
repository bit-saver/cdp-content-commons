import React from 'react';
import ReactTooltip from 'react-tooltip';
import { func, string } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './ResultsToggleView.css';

const ResultsToggleView = props => (
  <div className="results_toggleView">
    <span data-tip="Gallery View">
      <Icon
        name="grid layout"
        data-view="gallery"
        onClick={ props.toggle }
        className={ props.currentView === 'gallery' ? 'active' : '' }
      />
      <ReactTooltip multiline place="bottom" />
    </span>
    <span data-tip="List View">
      <Icon
        name="list"
        data-view="list"
        onClick={ props.toggle }
        className={ props.currentView === 'list' ? 'active' : '' }
      />
      <ReactTooltip multiline place="bottom" />
    </span>
  </div>
);

ResultsToggleView.propTypes = {
  toggle: func,
  currentView: string
};

export default ResultsToggleView;
