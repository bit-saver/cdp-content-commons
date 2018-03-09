import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import './Recent.css';
import defaultImage from '../../assets/images/default_image.png';

const Recent = () => (
  <Grid columns={ 2 } divided className="recentgrid">
    <Grid.Row>
      <Grid.Column>
        <Image src={ defaultImage } />
      </Grid.Column>
      <Grid.Column>
        <Image src={ defaultImage } />
        <Image src={ defaultImage } />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Recent;
