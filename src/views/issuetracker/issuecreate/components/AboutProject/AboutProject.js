import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, TextField } from '@material-ui/core';
import { FilesDropzone } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const AboutProject = props => {
  const {
    className,
    onchangeFile,
    onchange,
    phError,
    nameError,
    issueError,
    data,
    ...rest
  } = props;

  const classes = useStyles();

  const handleChangeFile = files => {
    onchangeFile(files);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <form>
          <div className={classes.formGroup}>
            <TextField
              autoComplete="off"
              error={nameError !== null ? true : false}
              fullWidth
              helperText={nameError !== null ? nameError : ''}
              label="Name"
              name="name"
              onChange={onchange}
              required
              value={data.name}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              autoComplete="off"
              error={phError !== null ? true : false}
              fullWidth
              helperText={phError !== null ? phError : ''}
              label="Phone"
              name="phone"
              onChange={onchange}
              required
              value={data.phone}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              autoComplete="off"
              error={issueError !== null ? true : false}
              fullWidth
              helperText={issueError !== null ? issueError : ''}
              label="what happened ?"
              name="issue"
              onChange={onchange}
              required
              value={data.issue}
              variant="outlined"
            />
          </div>
        </form>
        <div className={classes.formGroup}>
          <FilesDropzone
            images={[]}
            onChangeFile={handleChangeFile}
            red={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

AboutProject.propTypes = {
  className: PropTypes.string
};

export default AboutProject;
