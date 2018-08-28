import React from 'react';
import { shallow } from 'enzyme';

import Nav from './index';

describe( '<Nav />', () => {
  it( 'renders without crashing', () => {
    shallow( <Nav /> );
  } );
} );
