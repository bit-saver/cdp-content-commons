/**
 *
 * Asynchronously loads the component for PageUpload
 *
 */

import Loadable from 'react-loadable';

export default Loadable( {
  loader: () => import( './index' ),
  loading: () => null
} );
