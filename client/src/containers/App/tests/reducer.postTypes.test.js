
import postTypesReducer from '../reducers/postTypes';

describe( 'languagesReducer', () => {
  it( 'returns the initial state', () => {
    expect( postTypesReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
