import pageLoginReducer from '../reducer';

describe( 'pageLoginReducer', () => {
  it( 'returns the initial state', () => {
    expect( pageLoginReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
