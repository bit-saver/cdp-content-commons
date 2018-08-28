import React from 'react';
import { shallow } from 'enzyme';

import GlobalLoggedinNav from './index';

describe( '<GlobalLoggedinNav />', () => {
  it( 'renders without crashing', () => {
    shallow( <GlobalLoggedinNav /> );
  } );
} );
