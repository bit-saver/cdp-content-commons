import React from 'react';
import { shallow } from 'enzyme';

import PrivacyPage from './index';

describe( '<PrivacyPage />', () => {
  it( 'renders without crashing', () => {
    shallow( <PrivacyPage /> );
  } );
} );
