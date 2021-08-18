import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import TimeImageUpload from 'components/utils/TimeImageUpload';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 290,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: '50px'
  },
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
  removeBotton: {
    width: '100%'
  },
  spanText: {
    paddingBottom: '5px'
  },
  spanErrorText: {
    marginBottom: '5px',
    color: 'red',
    textAlign: 'center',
    paddingBottom: '5px'
  }
}));

const ShopProfileEditTimeLine = props => {
  const { shopInfo, uploadImage, imgLoading, className, ...rest } = props;
  const [url, setUrl] = useState("");
  const [imageError, setImageError] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setUrl(shopInfo.timeline_image)
  }, [shopInfo.timeline_image])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>

        <TimeImageUpload shopUrl={url} imageError={setImageError} imgLoading={imgLoading} uploadImage={uploadImage}></TimeImageUpload>

        {
          imageError.length > 0 ?
            <span className={classes.spanErrorText}>{imageError}</span>
            :
            null
        }

        <span className={classes.spanText}>Shop Timeline Image <span style={{ color: 'red' }}>*</span></span>
        <span className={classes.spanText}>Accept Image Size 2MB</span>
        <span className={classes.spanText}>Only accept (.jpg),(.png) and (.jpeg)</span>

      </CardContent>
    </Card>
  );
};

export default ShopProfileEditTimeLine;
