
import categoriesReducer from '../reducers/categories';

describe( 'languagesReducer', () => {
  it( 'returns the initial state', () => {
    expect( categoriesReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
