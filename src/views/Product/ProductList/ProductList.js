import React, { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../../../context/FetchContext';
import { fetchData } from '../../../store/action';
import ProductListCard from './components/ProductListCard';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),

  },
  results: {
    marginTop: theme.spacing(3),
    marginRight: '10px',
    marginLeft: '10px'
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  productCreate: {
    display: 'flex',
    spaceBetween: 'end'
  },
  deleteButton: {
    backgroundColor: '#D30000',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    fontSize: '16px',
    margin: '4px 2px',
    outline: 'none',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#1261A0',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    fontSize: '16px',
    margin: '4px 2px',
    outline: 'none',
    cursor: 'pointer'
  }
}));

const ProductList = ({ history, fetchData, products, status, enqueueSnackbar }) => {
  const classes = useStyles();
  const fetchContext = useContext(FetchContext);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchData(fetchContext.getMerchantProducts())
  }, [fetchData, fetchContext])

  useEffect(() => {
    if (status === 'Success') {
      fetchData(fetchContext.getMerchantProducts());
      enqueueSnackbar('Successfully Delete.', { variant: 'success' });
      fetchData(fetchContext.cleanEthic());
    } else if (status === 'Error') {
      enqueueSnackbar('Something Wrong!', { variant: 'error' });
      fetchData(fetchContext.cleanEthic());
    }
  }, [fetchData, fetchContext, status])

  useEffect(() => {
    if (products.length > 0) {
      setShops(products);
    }

  }, [products])

  const productCreate = () => {
    history.push('/admin/product/create/productinfo')
  }

  const productDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <img style={{ marginLeft: '38px' }} src="/images/icons/icon-72x72.png" alt="img"></img>
            <p style={{ textAlign: 'center' }}>Are you sure to delete ?</p>
            <button style={{ marginLeft: '10px' }} className={classes.deleteButton} onClick={() => {
              fetchData(fetchContext.productDelete(id))
              onClose()
            }}>Yes</button>
            <button className={classes.cancelButton} onClick={onClose}>No</button>
          </div>
        )
      }
    })


  }

  return (
    <div className={classes.results}>
      {/* <Filter /> */}
      <div className={classes.productCreate}>
        <Button color="primary" variant="contained" onClick={productCreate}>Product Create</Button>
      </div>

      {
        shops.length > 0 ? shops.map((obj, id) =>
          <div key={id}>
            {
              obj.products.length > 1 || obj.products.length === 1 ?
                <h1 style={{ marginTop: '10px', paddingTop: '10px' }} >{obj.name}</h1> : ''
            }

            {
              <p>
                <small style={{ color: 'gray' }}>
                  {
                    obj.products.length > 1 ? `${obj.products.length} items found.` :
                      obj.products.length === 1 ? `${obj.products.length} item found.` : ''
                  }
                </small>
              </p>
            }
            <p style={{ marginLeft: '10px' }} />
            {obj.products.map((obj2, id) =>
              <ProductListCard
                key={id}
                obj2={obj2}
                shopId={obj.id}
                deleteProduct={productDelete}
              />
            )}
          </div>

        ) : null
      }

    </div>
    // <div>Hello</div>

  )
}

const mapStateToProps = ({ product }) => {
  return {
    products: product.productList,
    status: product.status
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(withSnackbar(ProductList)));