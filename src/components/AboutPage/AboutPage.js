import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import './AboutPage.css';

const AboutPage = () => (
  <section className="about">
    <Header as="h1">About Content Commons</Header>
    <Container>
      <Header as="h2">Discover and share public diplomacy content from the U.S. Department of State</Header>
      <p>The Content Commons is the portal to search and share content from the U.S. Department of State’s Bureau of International Information Programs (IIP).</p>
      <p>Share, embed, or download public diplomacy content to use on any channel or website — a campaign, program, or Embassy website, as well as Facebook, Twitter, and YouTube.</p>
      <Header as="h2">How the Content Commons works</Header>
      <p>Content embedded on your website will be automatically synced if you have installed our plugin. U.S. Department of State staff can add content to the Content Commons by installing the plugin or using the Content Publisher, which will allow U.S. Department of State staff and the public to search, discover, and share your content through the Content Commons.</p>
      <p>The Content Commons is currently indexing videos with plans to add articles, courses, images, PDFs, audio, and more.</p>
      <p>The Content Commons makes finding and sharing public diplomacy content a better experience, to reach more people, tailor content to your audiences, and increase the influence of your content.</p>
      <p className="aboutStarted"><Link to="/">To get started, search or browse our content.</Link></p>
      <Header as="h2">Contact IIP</Header>
      <p>For more information about the Content Commons, Content Publisher, or Content Distribution Platform (CDP), or to discuss opportunities to share or host content from IIP or the Department of State on your website, <a href="mailto:design@america.gov">contact IIP</a>.</p>
      <p>To explore the Department’s global social media presence, see a list of links to <a href="https://www.state.gov/r/pa/ode/socialmedia/index.htm" target="_blank" rel="noopener noreferrer">official social media accounts</a> managed by U.S. embassies, consulates, and other missions.</p>
      <p>Follow the IIP Bureau on Twitter <a href="https://twitter.com/IIPState" target="_blank" rel="noopener noreferrer">@IIPState</a>.</p>
      <Header as="h2">About IIP</Header>
      <p>The Bureau of International Information Programs (IIP) belongs to the State Department’s <a href="https://www.state.gov/r/index.htm" target="_blank" rel="noopener noreferrer">public diplomacy</a> (PD) family of bureaus, where it provides highly impactful content to PD practitioners and foreign publics to advance American foreign policy goals.</p>
      <p>IIP supports people-to-people conversations with foreign publics on U.S. policy priorities. To carry out this mission, the bureau leverages digital communications technology to reach across platforms - from traditional forms of communications to new media channels. IIP takes a strategic, data-driven approach to develop multimedia, digital communications products and to manage an overseas network of bricks-and-mortar <a href="https://americanspaces.state.gov/home/" target="_blank" rel="noopener noreferrer">American Spaces</a>.</p>
      <p>Whether discussions take place in person or in virtual spaces, the bureau’s top goal is to connect people with policy through dialogue that is relatable and understandable.</p>
    </Container>
  </section>
);

export default AboutPage;
