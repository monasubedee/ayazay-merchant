import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    minWidth: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    minWidth: '200px',
    maxWidth: '200px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '45%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  img: {
    width: 50,
  },
  issueimg: {
    display: 'inline-block',
    maxHeight: '60px',
    width: '100%',
    marginRight: 15,
    '&:first-child': {
      marginLeft: '50px',
    },
  },
  imgCon: {
    maxWidth: '160px',
    display: 'flex',
    justifyContent: 'flex-start',
    overflowX: 'scroll',
    overflowY: 'hidden',
    margin: '0 auto',

    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  para: {
    whiteSpace: 'now-wrap',
    maxHeight: '90px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
}));

const ProjectCard = props => {
  const { project, className, ...rest } = props;

  const classes = useStyles();

  console.log(project.images)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>

        <div className={classes.stats}>
          <Typography variant="h6">Email</Typography>
          <Typography variant="body2">{project.email_address}</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">Phone number</Typography>
          <Typography variant="body2">{project.phone_number}</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(project.created_at).format('DD MMMM YYYY')}
          </Typography>
          <Typography variant="body2">Created</Typography>
        </div>
        <div className={classes.stats}>
          <Typography
            variant="h6"
          >
            Issue
          </Typography>
          <div className={classes.para}>
            <Typography variant="body2">{project.issue}</Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <div className={classes.imgCon}>
            {Object.keys(project.images).length === 0 ? null :
              project.images.map(item => {
                return (
                  <div className={classes.issueimg}>
                    <img
                      alt="/#"
                      className={classes.img}
                      onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.REACT_APP_IMAGE_URL}aya-zay/merchant/9944aaf9-13ec-4694-9794-d9a3c678b441.jpeg` }}
                      src={`${process.env.REACT_APP_IMAGE_URL}${item}`}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
