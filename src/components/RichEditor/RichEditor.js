import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { blockRenderMap } from './utils';

const useStyles = makeStyles(theme => ({
  root: {},
  editorContainer: {
    padding: theme.spacing(2),
    minHeight: 400,
    '& .public-DraftEditorPlaceholder-root': {
      ...theme.typography.body2
    },
    '& .public-DraftEditorPlaceholder-hasFocus': {
      display: 'none'
    },
    '& .public-DraftEditor-content': {
      '& p': {
        ...theme.typography.body1
      },
      '& h1': {
        ...theme.typography.h1
      },
      '& h2': {
        ...theme.typography.h2
      },
      '& h3': {
        ...theme.typography.h3
      },
      '& h4': {
        ...theme.typography.h4
      },
      '& h5': {
        ...theme.typography.h5
      },
      '& h6': {
        ...theme.typography.h6
      },
      '& blockquote': {
        ...theme.typography.subtitle1
      },
      '& ul': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& ol': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& pre': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    }
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textAlignJustify: {
    textAlign: 'justify'
  }
}));

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const RichEditor = props => {
  const { placeholder, value, className, onChangeEditor, ...rest } = props;

  const classes = useStyles();


  const [editorState, setEditorState] = useState(value);


  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    onChangeEditor(editorState);
  }

  function blockStyleFn(contentBlock) {
    const textAlign = contentBlock.getData().get('text-align');

    if (textAlign) {
      const className = `textAlign${capitalize(textAlign)}`;

      return classes[className];
    }

    return '';
  }

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.editorContainer}
      >
        <Editor
          blockRenderMap={blockRenderMap}
          blockStyleFn={blockStyleFn}
          editorClassName="demo-editor"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          placeholder={placeholder}
          spellCheck
          wrapperClassName="demo-wrapper"
        />
      </div>
    </Paper>
  );
};

RichEditor.propTypes = {
  className: PropTypes.string,
  onChangeEditor: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired
};

export default RichEditor;
