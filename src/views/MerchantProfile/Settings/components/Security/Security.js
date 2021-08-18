import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  colors,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const Security = props => {
  const { passObj, handlerChange, disable, loading, updatePassword, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Change password" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Old password"
              name="password"
              onChange={handlerChange}
              type="password"
              value={passObj.password}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{passObj.passwordError}</div>
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="New password"
              name="new_password"
              onChange={handlerChange}
              type="password"
              value={passObj.new_password}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{passObj.new_passwordError}</div>
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Confirm password"
              name="confirm_password"
              onChange={handlerChange}
              type="password"
              value={passObj.confirm_password}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{passObj.confirm_passwordError}</div>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        {
          loading === true ? <CircularProgress /> :
            <Button
              className={classes.saveButton}
              disabled={disable}
              onClick={() => updatePassword()}
              variant="contained"
            >
              Save changes
            </Button>
        }
      </CardActions>
    </Card>
  );
};

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
