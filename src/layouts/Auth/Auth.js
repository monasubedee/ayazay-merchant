import React, { Fragment, Suspense, useContext } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
  }
}));

const Auth = props => {
  const authState = useContext(AuthContext);

  const { route } = props;

  const classes = useStyles();

  return (
    <Fragment>
      {authState.isAuthenticated() ? (
        <Redirect to="/admin" />
      ) : (
          <main className={classes.content}>
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
          </main>
        )}
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
