import pageSearchReducer from '../reducer';

describe( 'pageSearchReducer', () => {
  it( 'returns the initial state', () => {
    expect( pageSearchReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
