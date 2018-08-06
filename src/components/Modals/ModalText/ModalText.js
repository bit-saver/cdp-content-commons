import React, { Component } from 'react';
import { string } from 'prop-types';
import Parser from 'html-react-parser';
import './ModalText.css';

class ModalText extends Component {
  static grabScriptContent( item, scriptsArr ) {
    let scriptContent;
    if ( item.dangerouslySetInnerHTML ) {
      scriptContent = { innerHTML: true, content: item.dangerouslySetInnerHTML.__html };
    } else if ( item.props.src ) {
      scriptContent = { src: true, content: item.props.src };
    }

    const isScriptContentInArray = scriptsArr.some( el => el.content === scriptContent.content );
    if ( !isScriptContentInArray ) {
      scriptsArr.push( scriptContent );
    }
  }

  constructor( props ) {
    super( props );
    this.traverseParsedHTML = this.traverseParsedHTML.bind( this );
    this.appendScripts = this.appendScripts.bind( this );
    this.state = {
      parsedHTML: Parser( props.textContent )
    };
  }

  componentDidMount() {
    const parsedHTMLScripts = [];
    const { parsedHTML } = this.state;

    parsedHTML.forEach( ( el ) => {
      if ( !el.props ) return;
      this.traverseParsedHTML( el, parsedHTMLScripts );
    } );
    this.appendScripts( parsedHTMLScripts );
  }

  traverseParsedHTML( el, scriptsArr ) {
    Object
      .values( el )
      .filter( item => item !== null )
      .forEach( ( item ) => {
        // If not an object, most likely a string so return
        if ( typeof item !== 'object' ) return;
        // Store JS content and return
        if ( item.type && ( item.type === 'text/javascript' || item.type === 'script' ) ) {
          return ModalText.grabScriptContent( item, scriptsArr );
        }
        // if 'children' prop is an object & item.type is script
        // store the JS content
        if ( item.children && typeof item.children === 'object' ) {
          if ( item.children.type === 'script' ) {
            return ModalText.grabScriptContent( item.children, scriptsArr );
          }
          // Otherwise, recursively traverse nested props
          if ( typeof item.children.props === 'object' ) {
            this.traverseParsedHTML( item.children.props, scriptsArr );
          }
        }
        if ( item.children && Array.isArray( item.children ) ) {
          item.children.forEach( i => this.traverseParsedHTML( i, scriptsArr ) );
        }
      } );
  }

  appendScripts( scriptsArr ) {
    scriptsArr.forEach( ( s ) => {
      const domScript = document.createElement( 'script' );
      if ( s.innerHTML ) {
        domScript.innerHTML = s.content;
      } else if ( s.src ) {
        domScript.src = s.content;
      }
      this.contentDiv.appendChild( domScript );
    } );
  }

  render() {
    const { parsedHTML } = this.state;
    const parsedHTMLRemovedScripts = parsedHTML.filter( ( el ) => {
      if ( !el.props ) return false;
      return el.props.children && el.props.children.type !== 'script';
    } );

    return (
      <section className="modal_section modal_section--textContent">
        <div className="textContent" ref={ ( node ) => { this.contentDiv = node; } }>
          { parsedHTMLRemovedScripts }
        </div>
      </section>
    );
  }
}

ModalText.propTypes = {
  textContent: string
};

export default ModalText;
