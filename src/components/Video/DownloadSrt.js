import React, { Component } from 'react';
import downloadIcon from '../../assets/icons/icon_download.svg';
import { array, string } from 'prop-types';

class DownloadSrt extends Component {
  renderFormItems( units ) {
    const srts = units.filter( unit => unit.srt && unit.srt.srcUrl ).map( ( unit, i ) => this.renderFormItem( unit, i ) );
    return srts.length ? srts : 'There are no SRTs available for download at this time';
  }

  renderFormItem = ( unit, i ) => (
    <div key={ `fs_${i}` } style={ { marginBottom: '1em' } }>
      <a href={ unit.srt.srcUrl } download={ `${unit.language.display_name}_SRT` } title="Download SRT">
        <img src={ downloadIcon } width="16" height="16" alt="Download SRT" style={ { marginRight: '.8em' } } />
      </a>
      { `${unit.language.display_name} SRT` }
    </div>
  );

  render() {
    const { units } = this.props;
    return (
      <div>
        <div className="form-group_instructions">{ this.props.instructions }</div>
        { units && this.renderFormItems( units ) }
      </div>
    );
  }
}

DownloadSrt.propTypes = {
  units: array,
  instructions: string
};

export default DownloadSrt;
