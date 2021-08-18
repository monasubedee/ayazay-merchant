import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
 Card,
 CardContent,
 Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
 root: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
 },
 content: {
  padding: theme.spacing(2),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
   width: '100%',
   flexWrap: 'wrap'
  },
  '&:last-child': {
   paddingBottom: theme.spacing(2)
  }
 },
 stats: {
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
   flexBasis: '30%'
  }
 },

}));

const ProductVariantInfo = props => {

 const { proInfo, className, ...rest } = props;
 const classes = useStyles();


 return (
  <div>

   {
    proInfo[0] !== undefined ?

     <Card

      {...rest}
      style={{ boxShadow: '1px 1px 5px -1px #000000' }}
      className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
       <div className={classes.stats}>
        <Typography variant="h6">{proInfo[0].variant_id.price}</Typography>
        <Typography variant="body2">Price</Typography>
       </div>
       <div className={classes.stats}>
        <Typography variant="h6">{proInfo[0].variant_id.qty}</Typography>
        <Typography variant="body2">Quantity</Typography>
       </div>
       <div className={classes.stats}>
        <Typography variant="h6">{proInfo[0].variant_id.color}</Typography>
        <Typography variant="body2">Color</Typography>
       </div>
       <div className={classes.stats}>
        <Typography variant="h6">{proInfo[0].variant_id.size}</Typography>
        <Typography variant="body2">Size</Typography>
       </div>
      </CardContent>
     </Card>
     : null
   }

  </div>
 );
};



export default ProductVariantInfo;
