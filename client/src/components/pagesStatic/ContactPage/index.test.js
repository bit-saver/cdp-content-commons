import React from 'react';
import { shallow } from 'enzyme';

import ContactPage from './index';

describe( '<ContactPage />', () => {
  it( 'renders without crashing', () => {
    shallow( <ContactPage /> );
  } );
} );
