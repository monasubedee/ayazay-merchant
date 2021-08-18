import React, { Suspense, useState, useContext, Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { NavBar, TopBar } from './components';
import { AuthContext } from '../../context/AuthContext';
import { LoadingProvider } from '../../context/LoadingContext';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    height: '94vh'
  }
}));

const Dashboard = props => {
  const { route } = props;
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Fragment>
      {auth.isAuthenticated() ? (
        <div className={classes.root}>
          <TopBar
            className={classes.topBar}
            onOpenNavBarMobile={handleNavBarMobileOpen}
          />
          <div className={classes.container}>
            <NavBar
              className={classes.navBar}
              onMobileClose={handleNavBarMobileClose}
              openMobile={openNavBarMobile}
            />
            <main className={classes.content}>
              <Suspense fallback={<LinearProgress />}>
                <LoadingProvider>{renderRoutes(route.routes)}</LoadingProvider>
              </Suspense>
            </main>
          </div>
        </div>
      ) : (
          <Redirect to="/auth/login" />
        )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
