
import languagesReducer from '../reducers/languages';

describe( 'languagesReducer', () => {
  it( 'returns the initial state', () => {
    expect( languagesReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
