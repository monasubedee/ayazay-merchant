import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Grid
} from '@material-ui/core';
import ProductVariantCard from './ProductVariantCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4),

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
  },
  gridList: {
    flexWrap: 'nowrap',

    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.text.white,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const ProductVariantDetail = props => {

  const { proVariants, des } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={3}
      >

        {
          proVariants[0] !== undefined ?
            proVariants.map((obj, id) => (
              obj.images.map((obj2, id) => (
                <Grid
                  item
                  key={id}
                  md={4}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <ProductVariantCard proInfo={obj} proImage={obj2}></ProductVariantCard>
                </Grid>
              ))
            )) : null

        }

      </Grid>
      <div className={classes.root}>
        <Grid
          item
          style={{ paddingTop: '20px', paddingRight: '10px' }}
          xl={6}
          md={6}
          sm={12}
        >
          <Paper
            className={classes.paper}
          >
            <p dangerouslySetInnerHTML={{ __html: `${des.desMM}` }} ></p>
          </Paper>

        </Grid>
        <Grid
          item
          style={{ paddingTop: '20px', paddingRight: '10px' }}
          xl={6}
          md={6}
          sm={12}
        >
          <Paper
            className={classes.paper}
          >
            <p dangerouslySetInnerHTML={{ __html: `${des.desEN}` }} style={{ textAlign: 'justify!important' }} ></p>
          </Paper>

        </Grid>
      </div>
    </div >
  );
};

export default ProductVariantDetail;
