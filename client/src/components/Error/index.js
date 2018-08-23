/**
 *
 * Error
 *
 */

import React from 'react';
import config from 'config';

function Error() {
  return (
    <div className="errormsg">
      { config.ERROR_MESSAGE } at <a href={ `mailto:${config.EMAIL}` }>{ config.EMAIL }</a>.
    </div>
  );
}

export default Error;
