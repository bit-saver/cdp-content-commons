import authReducer from '../reducer';

describe( 'authReducer', () => {
  it( 'returns the initial state', () => {
    expect( authReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
