import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import { oneOfType, func, string, node } from 'prop-types';
import './FileDownload.css';

class FileDownload extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      btnText: 'on',
      btnIcon: 'off',
      fieldInput: 'idle'
    };
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  cb = ( percent ) => {
    // console.log( Math.round( percent ) );
    // this.setState( { percent: Math.round( percent ) } );

    if ( this._ismounted ) {
      if ( Math.round( percent ) === 100 ) {
        this.setState( {
          btnText: 'off',
          btnIcon: 'on'
        } );

        setTimeout( () => {
          this.setState( {
            btnText: 'on',
            btnIcon: 'off',
            fieldInput: 'idle'
          } );
        }, 5000 );
      }
    }
  };

  handleDownloadClick = ( e ) => {
    this.setState( {
      btnText: 'loading',
      fieldInput: 'processing'
    } );

    this.props.onClick( this.props.url, this.cb );
  };

  render() {
    return (
      <div>
        <Form.Group inline>
          <Form.Field>
            { /* eslint-disable-next-line jsx-a11y/label-has-for */ }
            <label htmlFor="inputFld">{ this.props.label }</label>
            <Input id="inputFld" value={ this.props.value } className={ this.state.fieldInput } />
          </Form.Field>
          <Button
            id="btnText"
            style={ { width: '6.42em' } }
            onClick={ this.handleDownloadClick }
            className={ this.state.btnText }
          >
            Download
          </Button>
          <Button id="btnIcon" style={ { width: '6.42em' } } className={ this.state.btnIcon } icon>
            <Icon name="check" />
          </Button>
        </Form.Group>
      </div>
    );
  }
}

FileDownload.propTypes = {
  onClick: func,
  label: oneOfType( [string, node] ),
  value: string,
  url: string
};

export default FileDownload;
