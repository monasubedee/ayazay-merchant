import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import {
  Header
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  statistics: {
    marginTop: theme.spacing(3)
  },
  notifications: {
    marginTop: theme.spacing(6)
  },
  projects: {
    marginTop: theme.spacing(6)
  },
  todos: {
    marginTop: theme.spacing(6)
  }
}));

const Overview = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Overview"
    >
      <Header />
    </Page>
  );
};

export default Overview;
