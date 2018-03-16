import React from 'react';
import Recents from '../Recents';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing">
    <Recents label="Videos" type="video" />
  </section>
);

export default LandingPage;
