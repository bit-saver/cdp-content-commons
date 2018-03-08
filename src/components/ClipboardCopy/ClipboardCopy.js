import React, { Component } from 'react';
import { string } from 'prop-types';
import { Button } from 'semantic-ui-react';
import './ClipboardCopy.css';

class ClipboardCopy extends Component {
  constructor( props ) {
    super( props );

    this.handleCopyClick = this.handleCopyClick.bind( this );
  }

  handleCopyClick( e ) {
    const btn = e.target;

    // Copy input value to document clipboard
    this.input.select();
    document.execCommand( 'copy' );

    // Notify selection copied
    btn.classList.add( 'copied' );
    setTimeout( () => btn.classList.remove( 'copied' ), 1200 );
  }

  render() {
    const { copyItem, label, info } = this.props;

    return (
      <div className="clipboardcopy_wrapper">
        <div className="clipboardcopy">
          <div className="clipboardcopy_label_wrapper">
            <p className="clipboardcopy_label">{ label }</p>
          </div>
          <div className="clipboardcopy_item">
            <div className="ui disabled input">
              <input
                ref={ ( input ) => {
                  this.input = input;
                } }
                type="text"
                defaultValue={ copyItem }
                tabIndex="-1"
              />
            </div>
            <Button primary content="Copy" onClick={ this.handleCopyClick } />
          </div>
        </div>
        <span className="clipboardcopy_info">{ info }</span>
      </div>
    );
  }
}

ClipboardCopy.propTypes = {
  copyItem: string,
  label: string,
  info: string
};

export default ClipboardCopy;
