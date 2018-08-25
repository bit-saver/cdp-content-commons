import React from 'react';
import Recents from 'containers/Recents';
import './PageLanding.css';

const PageLanding = () => (
  <section className="landing">
    <Recents postType="video" />
    <Recents postType="post" />
  </section>
);

export default PageLanding;
