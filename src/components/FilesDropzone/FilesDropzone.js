import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  colors
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';

import bytesToSize from 'utils/bytesToSize';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const FilesDropzone = props => {
  const { className, red, images, onChangeFile, ...rest } = props;

  const classes = useStyles();

  const [files, setFiles] = useState([...images]);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = f => {
    console.log('INE', f);
    const newFiles = files.filter(file => file !== f);
    setFiles([...newFiles]);
    onChangeFile([...newFiles]);
  };

  const handleDrop = useCallback(
    acceptedFiles => {
      let myFile = null;

      let filterFiles = acceptedFiles.filter(obj => {
        let splitName = obj.name.split('.').pop();

        if (splitName !== "png" && splitName !== "jpeg") {
          enqueueSnackbar(`Your files (${splitName}) type is wrong.`, { variant: 'error', autoHideDuration: 5000 })
        }

        else if (obj.size > 250000) {
          enqueueSnackbar(
            `${obj.name} (${obj.size}) files size is greater than 2MB.`,
            { variant: 'error', autoHideDuration: 5000 }
          );
        }

        else if (obj.size <= 250000) {
          return obj;
        }
      });

      setFiles(files => {
        myFile = [...files].concat(filterFiles);
        return myFile;
      });
      onChangeFile([...myFile]);
    },
    [onChangeFile]
  );

  const handleRemoveAll = () => {
    setFiles([]);
    onChangeFile([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: '.jpeg, .png'
  });

  const asteriokRed = name => {
    return (
      <span>
        {name} <span style={{ color: 'red' }}>*</span>
      </span>
    );
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h4">
            {red === true
              ? asteriokRed('Select files only (.png/.jpeg)')
              : 'Select files only (.png/.jpeg)'}
          </Typography>
          <Typography gutterBottom variant="h6">
            Accept Image Size 2MB
          </Typography>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1">
            Drop files here or click <Link underline="always">here</Link>{' '}
          </Typography>
        </div>
      </div>
      {files.length > 0 && (
        <Fragment>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={uuid()}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    color="primary"
                    onClick={e => handleDelete(file)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <div className={classes.actions}>
              <Button
                color="primary"
                onClick={handleRemoveAll}
                size="small"
                variant="contained">
                Remove all
              </Button>
            </div>
          </PerfectScrollbar>
        </Fragment>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string,
  onChangeFile: PropTypes.func.isRequired
};

export default FilesDropzone;
