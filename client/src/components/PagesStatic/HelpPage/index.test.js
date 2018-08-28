import React from 'react';
import { shallow } from 'enzyme';

import HelpPage from './index';

describe( '<HelpPage />', () => {
  it( 'renders without crashing', () => {
    shallow( <HelpPage /> );
  } );
} );

