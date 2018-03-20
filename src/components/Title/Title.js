import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

const Title = () => (
  <Link to="/" className="title" target="_self">Content Commons</Link>
);

export default Title;
