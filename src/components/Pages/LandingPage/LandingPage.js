import React from 'react';
import Recents from '../../Recents';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing">
    <Recents label="Video" postType="video" />
    <Recents label="Article" postType="post" />
  </section>
);

export default LandingPage;
