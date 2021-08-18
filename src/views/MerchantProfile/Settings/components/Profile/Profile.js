import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ProfileDetails, ProfileSettings } from './components';


const useStyles = makeStyles(() => ({
  root: {}
}));

const Profile = props => {
  const { className, profileInfo, merchantInfo, fetchData, ...rest } = props;

  const classes = useStyles();
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    console.log("Hello ProfileInfo.");
  }, [])

  //componetDidAmount and componentDidUpdate
  useEffect(() => {
    setProfile(profileInfo);
  }, [profileInfo]);

  if (!profile) {
    return null;
  }

  return (

    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ProfileDetails profile={profile} />
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <ProfileSettings profile={profile} />
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};



export default Profile;
