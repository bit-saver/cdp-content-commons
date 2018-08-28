import React from 'react';
import { shallow } from 'enzyme';

import GlobalLoggedOutNav from './index';

describe( '<GlobalLoggedOutNav />', () => {
  it( 'renders without crashing', () => {
    shallow( <GlobalLoggedOutNav /> );
  } );
} );

