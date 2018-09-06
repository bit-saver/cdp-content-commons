import paneProjectsReducer from '../reducer';

describe( 'paneProjectsReducer', () => {
  it( 'returns the initial state', () => {
    expect( paneProjectsReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
