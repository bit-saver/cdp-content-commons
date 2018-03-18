import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { array } from 'prop-types';
import './Video.css';

const ClosedCaptions = ( props ) => {
  const renderFormItem = ( file, index ) => {
    const downloadUrl = file.downloadUrl || '';
    const label =
      file.size && file.size.width && file.size.height ? `${file.size.width} x ${file.size.height}` : 'Medium';

    return (
      <div key={ `${file}_${index}` }>
        <Form.Group inline>
          <Form.Field id={ `fic-${index}` } control={ Input } label={ label } value={ downloadUrl } />
          <Form.Field>
            <a className="ui button" href={ downloadUrl }>
              Download
            </a>
          </Form.Field>
        </Form.Group>
      </div>
    );
  };

  return (
    <div>
      <span className="form-group_instructions">
        Download this video with the closed captions in the language selected. This download option is best for
        uploading this video to web pages.
      </span>
      <Form className="form-group_tabbed">{ props.files && props.files.map( renderFormItem ) }</Form>
    </div>
  );
};

ClosedCaptions.propTypes = {
  files: array
};

export default ClosedCaptions;
