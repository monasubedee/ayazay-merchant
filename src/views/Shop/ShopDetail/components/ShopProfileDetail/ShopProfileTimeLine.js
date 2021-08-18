import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
 Card,
 CardContent
} from '@material-ui/core';
import TimeImageUpload from 'components/utils/TimeImageUpload';

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

const ShopProfileTimeLine = props => {

 const { timeLine, uploadTimeLine, className, ...rest } = props;
 const classes = useStyles();

 return (
  <Card
   {...rest}
   className={clsx(classes.root, className)}
  >
   <CardContent className={classes.content}>

    <TimeImageUpload disabled="true" shopUrl={timeLine} uploadImage={uploadTimeLine}></TimeImageUpload>

   </CardContent>
  </Card>
 );
};

export default ShopProfileTimeLine;
