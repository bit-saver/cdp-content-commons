
import sourcesReducer from '../reducers/sources';

describe( 'languagesReducer', () => {
  it( 'returns the initial state', () => {
    expect( sourcesReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
