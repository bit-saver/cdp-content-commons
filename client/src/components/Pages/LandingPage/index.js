import React from 'react';
import Recents from 'containers/Recents';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing">
    <Recents postType="video" />
    <Recents postType="post" />
  </section>
);

export default LandingPage;
