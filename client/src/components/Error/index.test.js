import React from 'react';
import { shallow } from 'enzyme';

import Error from './index';

describe( '<Error />', () => {
  it( 'renders without crashing', () => {
    shallow( <Error /> );
  } );
} );
