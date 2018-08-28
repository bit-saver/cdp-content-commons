import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from './index';

describe( '<Breadcrumbs />', () => {
  it( 'renders without crashing', () => {
    shallow( <Breadcrumbs /> );
  } );
} );
