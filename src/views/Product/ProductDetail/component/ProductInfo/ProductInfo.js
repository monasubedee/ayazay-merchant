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

const ProductInfo = props => {

  const { proInfo, className, ...rest } = props;
  const classes = useStyles();

  return (
    <div>
      {/* <p>Cosmic nails <br /><small>1 item found</small></p> */}
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      // style={{ boxShadow: '1px 1px 5px -1px #000000' }}
      >
        <CardContent className={classes.content}>
          <div className={classes.stats}>
            <Typography variant="h6" >{proInfo.name_myanmar}</Typography>
            <Typography variant="body2" >Product Name(MM)</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6" >{proInfo.name_english}</Typography>
            <Typography variant="body2" >Product Name(EN)</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6" >{proInfo.categorymm}</Typography>
            <Typography variant="body2">Category(MM)</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6">{proInfo.category}</Typography>
            <Typography variant="body2">Category(EN)</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6">{proInfo.sub_categorymm}</Typography>
            <Typography variant="body2">Sub category(MM)</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="h6">{proInfo.sub_category}</Typography>
            <Typography variant="body2">Sub category</Typography>
          </div>
          {

          }
          <div className={classes.stats}>
            <Typography variant="h6">{proInfo.brand}</Typography>
            <Typography variant="body2">Brand</Typography>
          </div>
          {/* <div className={classes.stats}>
      <Typography variant="h6">{proInfo.qty}</Typography>
      <Typography variant="body2">Qty</Typography>
     </div>
     <div className={classes.stats}>
      <Typography variant="h6">{proInfo.color}</Typography>
      <Typography variant="body2">Color</Typography>
     </div> */}
        </CardContent>
      </Card>

    </div>
  );
};



export default ProductInfo;
