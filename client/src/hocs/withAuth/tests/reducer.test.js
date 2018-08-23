import withAuthReducer from '../reducer';

describe( 'withAuthReducer', () => {
  it( 'returns the initial state', () => {
    expect( withAuthReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
