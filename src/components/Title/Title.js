import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import DosSealLanding from '../../assets/images/DOS_Seal_Landing.png';
import DosSealHeader from '../../assets/images/DOS_Seal_Header.png';
import './Title.css';

const Title = props => (
  <div className={ props.isLanding ? 'title_wrapper title_wrapper--landing' : 'title_wrapper title_wrapper--header' }>
    <img
      className={ props.isLanding ? 'title_seal title_seal--landing' : 'title_seal title_seal--header' }
      src={ props.isLanding ? DosSealLanding : DosSealHeader }
      alt="Department of State Seal"
    />
    <Link to="/" className="title" target="_self">Content Commons</Link>
  </div>
);

Title.propTypes = {
  isLanding: bool
};

export default Title;
