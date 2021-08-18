import React, { useContext, useEffect } from 'react';
import { Page } from 'components';
import { Grid, Button } from '@material-ui/core';
import { ProductProfileDetail } from './component/ProductProfileDetail';
import { connect } from 'react-redux';
import { FetchContext } from '../../../context/FetchContext';
import { fetchData } from '../../../store/action';
import { withRouter } from 'react-router';


const ProductDetail = ({ product, fetchData, history, match }) => {

  const fetchContext = useContext(FetchContext);

  useEffect(() => {
    const sId = match.params.sId;
    const pId = match.params.pId;
    fetchData(fetchContext.getShopIdProduct(sId, pId));

  }, [fetchData, fetchContext, match])

  useEffect(() => {
    console.log("PRODUCT ", product);
  }, [product])

  const viewList = () => {
    history.push('/admin/product/list');
  }

  return (
    <Page
      title="Product Detail"
    >
      <Grid
        container
      >
        <Grid
          item
          md={1}
          xl={1}
          xs={12}
        />
        <Grid
          item
          md={10}
          xl={10}
          xs={12}
        >
          <Button color="primary" variant="contained" onClick={viewList} style={{ marginTop: '30px', marginLeft: '10px' }}>View List</Button>
        </Grid>
      </Grid>
      <Grid
        container
      >
        <Grid
          item
          md={1}
          xl={1}
          xs={12}

        />
        <Grid
          item
          md={10}
          xl={10}
          xs={12}
          style={{ marginLeft: '10px', marginRight: '10px' }}
        >
          <ProductProfileDetail proInfo={product} />
        </Grid>
      </Grid>
    </Page>
  )

}

const mapStateToProps = ({ product }) => {
  return {
    product: product.product
  }
}

export default withRouter(connect(mapStateToProps, { fetchData })(ProductDetail));