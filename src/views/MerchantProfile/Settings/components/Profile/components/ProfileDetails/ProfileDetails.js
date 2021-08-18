import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Badge
} from '@material-ui/core';

const StyledBadge = withStyles((theme) => ({
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

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlgin: 'center'
  },
  name: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    height: 100,
    width: 100
  },
  myProfile: {
    width: '100%',
    textAlign: 'center'

  }

}));

const ProfileDetails = props => {
  const { profile, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar} src={`/images/avatars/merchantProfile.jpeg`}
          />
        </StyledBadge>

        <Typography
          className={classes.name}
          gutterBottom
          variant="h3"
        >
          {profile.merchant_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {profile.merchant_code}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {profile.timezone}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          className={classes.myProfile}
          variant="text"
        >
          My Profile
        </Typography>
      </CardActions>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
