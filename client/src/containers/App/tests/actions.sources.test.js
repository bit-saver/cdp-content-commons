import { defaultAction } from '../actions/source';
import { DEFAULT_ACTION } from '../constants';

describe( '[DESCRIPTION]', () => {
  describe( 'Default Action', () => {
    it( 'has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect( defaultAction() ).toEqual( expected );
    } );
  } );
} );
