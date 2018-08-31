import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from './index';

describe( '<LoadingIndicator />', () => {
  it( 'renders without crashing', () => {
    shallow( <LoadingIndicator /> );
  } );
} );
