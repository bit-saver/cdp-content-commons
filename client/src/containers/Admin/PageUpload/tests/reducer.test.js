import pageUploadReducer from '../reducer';

describe( 'pageUploadReducer', () => {
  it( 'returns the initial state', () => {
    expect( pageUploadReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
