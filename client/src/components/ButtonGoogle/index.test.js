import React from 'react';
import { shallow } from 'enzyme';

import ButtonGoogle from './index';

describe( '<ButtonGoogle />', () => {
  it( 'renders without crashing', () => {
    shallow( <ButtonGoogle /> );
  } );
} );
