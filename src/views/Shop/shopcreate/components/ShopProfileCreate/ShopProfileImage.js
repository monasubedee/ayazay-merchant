import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent
} from '@material-ui/core';
import ImageUpload from 'components/utils/ImageUpload';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 290,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
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
    marginBottom: '5px',
    textAlign: 'center'
  },
  spanErrorText: {
    marginBottom: '5px',
    color: 'red',
    textAlign: 'center'
  }
}));

const ShopProfileImage = props => {
  const { image, uploadImage, imgLoading, className, ...rest } = props;
  const classes = useStyles();

  const [imageError, setImageError] = useState("");

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>

        <ImageUpload shopUrl={image} imageError={setImageError} imgLoading={imgLoading} uploadImage={uploadImage}></ImageUpload>
        {
          imageError.length > 0 ?
            <span className={classes.spanErrorText}>{imageError}</span>
            :
            null
        }

        <span className={classes.spanText}>Shop Image <span style={{ color: 'red' }}>*</span></span>
        <span className={classes.spanText}>Accept Image Size 2MB</span>
        <span className={classes.spanText}>Only accept (.jpg),(.png) and (.jpeg)</span>

      </CardContent>
    </Card>
  );
};

export default ShopProfileImage;
