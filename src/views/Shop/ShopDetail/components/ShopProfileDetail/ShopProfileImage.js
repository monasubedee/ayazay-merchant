import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
 Card,
 CardContent
} from '@material-ui/core';
import ImageDetailUpload from 'components/utils/ImageDetailUpload';

const useStyles = makeStyles(theme => ({
 root: {
  minHeight: 290,
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1)
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
 }
}));

const ShopProfileDetail = props => {
 const { image, timeline, className, ...rest } = props;
 const [url, setUrl] = useState("");

 const classes = useStyles();

 useEffect(() => {
  setUrl(image)
 }, [image])

 const uploadImage = (url) => {
  console.log("URL", url);
  setUrl(url)

 }

 return (
  <Card
   {...rest}
   className={clsx(classes.root, className)}
  >
   <CardContent className={classes.content}>

    <ImageDetailUpload disabled="true" shopUrl={url} uploadImage={uploadImage}></ImageDetailUpload>
    {
     timeline ? <p>Shop Timeline Image</p> : <p>Shop Image</p>
    }

   </CardContent>
  </Card>
 );
};

export default ShopProfileDetail;
