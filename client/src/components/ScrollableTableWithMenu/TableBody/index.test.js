import React from 'react';
import { shallow } from 'enzyme';

import TableBody from './index';

describe( '<TableBody />', () => {
  it( 'renders without crashing', () => {
    shallow( <TableBody /> );
  } );
} );
