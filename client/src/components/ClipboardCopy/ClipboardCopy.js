import React, { Component } from 'react';
import { string } from 'prop-types';
import { Button } from 'semantic-ui-react';
import './ClipboardCopy.css';

class ClipboardCopy extends Component {
  constructor( props ) {
    super( props );
    this.timeoutID = null;
    this.state = {
      label: 'Copy',
      cls: ''
    };
  }

  /**
   * CLear timer created in handleCopyClick method in the
   * event component is unmoumted before timer has completed
   */
  componentWillUnmount() {
    window.clearTimeout( this.timeoutID );
  }

  toggleCls( label = 'Copy', cls = '' ) {
    this.setState( { label, cls } );
  }


  handleCopyClick = ( e, data ) => {
    // Notify selection copied
    this.toggleCls( '✓ Copied', 'copied' );

    // select text
    window.getSelection().selectAllChildren( this.div );

    // Copy input value to document clipboard
    document.execCommand( 'copy' );

    // Reset button
    this.timeoutID = setTimeout( () => {
      this.toggleCls();
    }, 5000 );
  };

  render() {
    const { copyItem, label } = this.props;

    return (
      <div className="clipboardcopy_wrapper">
        <div className="clipboardcopy">
          <div className="clipboardcopy_label_wrapper">
            <p className="clipboardcopy_label">{ label }</p>
          </div>
          <div className="clipboardcopy_item">
            <div
              className="clipboardcopy_item_text"
              ref={ ( div ) => {
                this.div = div;
              } }
            >
              { copyItem }

            </div>
            <Button className={ this.state.cls } primary onClick={ this.handleCopyClick }>{ this.state.label }</Button>
          </div>
        </div>
      </div>
    );
  }
}

ClipboardCopy.propTypes = {
  copyItem: string,
  label: string
};

export default ClipboardCopy;
