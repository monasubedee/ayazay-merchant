import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
  },
  label: {
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Header = props => {
  const { disable, onSubmitClick } = props;

  const classes = useStyles();
  const [loading, setLoading] = useState(false);


  const handleApplicationOpen = () => {
    //DO SOMETHING
    if (!loading) {
      setLoading(true);
    }
    onSubmitClick();
  };

  return (
    <Grid
      alignItems="flex-end"
      container
      justify="space-between"
    >
      <Grid
        item
      >
        <Typography
          component="h2"
          gutterBottom
          variant="overline"
        >
          Browse projects
        </Typography>
        <Typography
          component="h1"
          gutterBottom
          variant="h3"
        >
          Create New Product
        </Typography>
      </Grid>
      <Grid
        item
      >
        <div className={classes.wrapper}>
          <Button
            color="primary"
            disabled={loading || disable}
            onClick={handleApplicationOpen}
            variant="contained"
          >
            CREATE PRODUCT
          </Button>
          {loading && <CircularProgress
            className={classes.buttonProgress}
            size={24}
          />}
        </div>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onSubmitClick: PropTypes.func.isRequired
};

Header.defaultProps = {};

export default Header;
