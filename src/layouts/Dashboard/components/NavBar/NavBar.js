import React, { Fragment, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Drawer, Divider, Paper, Avatar, Typography, Badge, Button, } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import useRouter from 'utils/useRouter';
import { Navigation } from 'components';
import navigationConfig from './navigationConfig';
import { AuthContext } from '../../../../context/AuthContext';
import InputIcon from '@material-ui/icons/Input';
import { useNavigatorOnline } from '@oieduardorabelo/use-navigator-online';

const OnLineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const OffLineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'rgb(148, 153, 149)',
    color: '#020b0c',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflowY: 'scroll',

  },
  content: {
    padding: theme.spacing(2),
    marginBottom: '40px'
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const router = useRouter();
  let { isOnline } = useNavigatorOnline();
  const merchantInfo = auth.authState.merchantInfo;

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);
  const handleLogout = () => {
    auth.logout();
    router.history.push('/')
    // dispatch(logout());
  };

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        {
          isOnline ?
            <OnLineBadge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              overlap="circle"
              variant="dot"
            >
              <Avatar
                className={classes.avatar}
                src={'/images/avatars/merchantProfile.jpeg'}
              />
            </OnLineBadge>
            :
            <OffLineBadge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              overlap="circle"
              variant="dot"
            >
              <Avatar
                className={classes.avatar}
                src={'/images/avatars/merchantProfile.jpeg'}
              />
            </OffLineBadge>
        }


        <Typography
          className={classes.name}
          variant="h4"
        >
          {merchantInfo.merchant_name}
        </Typography>
        <Typography variant="body2">{merchantInfo.email}</Typography>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
        <Hidden lgUp >
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
