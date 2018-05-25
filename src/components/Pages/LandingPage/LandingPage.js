import React from 'react';
import Recents from '../../Recents';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing">
    <Recents postType="video" />
    <Recents postType="post" />
  </section>
);

export default LandingPage;
