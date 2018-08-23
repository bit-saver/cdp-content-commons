import recentsReducer from '../reducer';

describe( 'recentsReducer', () => {
  it( 'returns the initial state', () => {
    expect( recentsReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
