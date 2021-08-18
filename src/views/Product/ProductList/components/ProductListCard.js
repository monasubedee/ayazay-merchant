import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
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
  card: {
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
    width: 150,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2),
    '&::last-child': {
      marginRight: 0
    }
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

  },
  stats: {
    minWidth: '130px',
    maxWidth: '130px',
    height: '60px',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '30%'
    }

  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }, gridList: {
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'scroll',
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  productListImg: {
    display: 'inline-block',
    maxHeight: '60px',
    width: '100%',
    marginRight: 15,
    '&:first-child': {
      marginLeft: '5px',

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
  img: {
    display: 'inline-block',
    maxHeight: '60px',
    width: '50%',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  Img: {
    width: 60,
    height: 40
  },

  stats: {
    minWidth: '200px',
    maxWidth: '200px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '45%'
    }
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

}));

const ProductListCard = props => {

  const { obj2, deleteProduct, shopId, className, ...rest } = props;
  const classes = useStyles();

  return (

    <Card
      {...rest}
      className={clsx(classes.root, className)}
      style={{ paddingBottom: '0px' }}
    >
      <CardContent className={classes.content}>
        <div>
          <div className={classes.stats}>
            <div className={classes.imgCon} >

              {obj2.productImageVariants[0] !== undefined ?
                obj2.productImageVariants.map((obj, id) => (
                  <div
                    className={classes.productListImg}
                    key={obj.id}
                  >
                    <img
                      alt="img"
                      className={classes.Img}
                      key={id}
                      onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.REACT_APP_IMAGE_URL}aya-zay/merchant/9944aaf9-13ec-4694-9794-d9a3c678b441.jpeg` }}
                      src={`${process.env.REACT_APP_IMAGE_URL}${obj.image_id.image_url}`}
                      style={{
                        borderRadius: '8px',
                        height: '50px', width: '50px',
                        boxShadow: '1px 1px 2px 1px #000000'
                      }}
                    />
                  </div>
                )) : null}
            </div>
          </div>
          <p style={{
            paddingLeft: '15px',
            fontSize: '14px',
            color: 'black',
            fontWeight: '60px',
            maxWidth: '120px'
          }}>{obj2.name_english}</p>
        </div>
        {
          obj2.productCategorySubcategory[0] !== undefined ?
            <div className={classes.stats}>
              <Typography variant="h6">{obj2.productCategorySubcategory[0].category_id.name_english}</Typography>
              <Typography variant="body2">(Category)</Typography>
            </div>
            :
            <div className={classes.stats}>
              <Typography variant="h6">Category not found!</Typography>
              <Typography variant="body2">(Category)</Typography>
            </div>
        }
        {
          obj2.productCategorySubcategory[0] !== undefined ?
            <div className={classes.stats}>
              <Typography variant="h6">{obj2.productCategorySubcategory[0].subcategory_id.name_english}</Typography>
              <Typography variant="body2">(Sub category)</Typography>
            </div>
            :
            <div className={classes.stats}>
              <Typography variant="h6">Sub category not found!</Typography>
              <Typography variant="body2">(Category)</Typography>
            </div>
        }

        {
          obj2.productBrands[0] !== undefined ?
            <div className={classes.stats}>
              <Typography variant="h6">{obj2.productBrands[0].brand_id.name}</Typography>
              <Typography variant="body2">(Brand)</Typography>
            </div>
            :

            <div className={classes.stats}>
              <Typography variant="h6">Brand not found!</Typography>
              <Typography variant="body2">(Brand)</Typography>
            </div>
        }

        <div className={classes.stats}>
          <Typography variant="h6">Active</Typography>
          <Typography variant="body2">(Status)</Typography>
        </div>
        {
          obj2.created_at !== undefined ?

            <div className={classes.stats}>
              <Typography variant="h6">
                {moment(obj2.created_at).format('DD MMMM YYYY')}
              </Typography>
              <Typography variant="body2">(Project created)</Typography>
            </div>

            :

            <div className={classes.stats}>
              <Typography variant="h6">
                Date not found !
              </Typography>
              <Typography variant="body2">(Project created)</Typography>
            </div>

        }

        <div className={classes.actions}>
          <a
            href={`/admin/product/${shopId}/detail/${obj2.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              color="primary"
              size="small"
              variant="outlined"
            >
              detail
            </Button>
          </a>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => deleteProduct(obj2.id)}
          >
            delete
            </Button>
        </div>
        {/* <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            edit
          </Button>
        </div> */}
      </CardContent>
    </Card>

  );
};



export default ProductListCard;
