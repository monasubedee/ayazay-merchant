import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, colors, Button } from '@material-ui/core';
import { Page } from 'components';
import {
  Header,
  ProductInfo,
  Variants,
  ProductDescription
} from './components';
import { connect } from 'react-redux';
import { FetchContext } from '../../../context/FetchContext';
import { fetchData } from '../../../store/action';
import { EditorState } from 'draft-js';
import { uploadImage } from '../../../store/action';
import { useSnackbar } from 'notistack';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    // width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  },
  spacing: {
    marginTop: '10px',
    marginLeft: '4px'
  }
}));

const ProductCreate = ({
  fetchData,
  match,
  history,
  categories,
  brands,
  shops,
  subcategories,
  createSuccess
}) => {
  const classes = useStyles();
  const { tab } = match.params;
  const fetch = useContext(FetchContext);
  const { enqueueSnackbar } = useSnackbar();
  const [nexDisable, setNexDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(false);
  const [variantDisable, setVariantDisable] = useState(false);
  const [imageDisable, setImageDisable] = useState(false);
  let myDisable = true;
  let infoDisable = false;

  const [product, setProduct] = useState({
    info: {
      category_id: 0,
      subcategory_id: 0,
      brand_id: 0,
      specification: 'specification',
      rating: 5,
      name_myanmar: '',
      name_english: '',
      description_myanmar: EditorState.createEmpty(),
      description_english: EditorState.createEmpty(),
      shop_id: 0
    },
    variants: [{
      qty: parseInt(0),
      color: '',
      size: '',
      images: []
    }]
  });

  const [data, setData] = useState([
    {
      qty: parseInt(0),
      color: '',
      size: '',
      price: parseInt(0),
      images: []
    }
  ]);

  const [errors, setErrors] = useState({
    name_myanmarError: "",
    name_englishError: "",
    category_idError: "",
    subcategory_idError: "",
    brand_idError: "",
    shop_idError: "",
  });

  const [errorDescription, setErrorDescription] = useState({
    description_myanmarError: "",
    description_englishError: ""
  })


  useEffect(() => {
    fetchData(fetch.getCategory());
    fetchData(fetch.getBrands());
    fetchData(fetch.getShops());

    if (createSuccess != null) {

      enqueueSnackbar(createSuccess, { variant: 'success' });
      fetchData(fetch.cleanEthic());
      history.push('/admin/product/list');

    }

  }, [createSuccess, fetchData, fetch, history, enqueueSnackbar]);

  useEffect(() => {

    if (tab === 'productinfo') {
      setPrevDisable(true);
      setNexDisable(false);
    }
    if (tab === 'productdescription') {
      setPrevDisable(false);
      setNexDisable(false);
    }
    if (tab === 'productvariant') {
      setPrevDisable(false);
      setNexDisable(true);
    }

  }, [tab])

  const errorChange = (error, name, value) => {
    setErrors({
      ...errors,
      [error]: `${name.toUpperCase().replace(/_/g, ' ')} is required.`
    })
    setProduct({
      ...product,
      info: { ...product.info, [name]: value }
    });
  }

  const errorLimitChange = (error, name, value, length) => {
    setErrors({
      ...errors,
      [error]: `Characters should be ${length} characters or less.`
    })
    setProduct({
      ...product,
      info: { ...product.info, [name]: value }
    });
  }

  const errorClearChange = (error, name, value) => {
    setErrors({
      ...errors,
      [error]: ``
    })
    setProduct({
      ...product,
      info: { ...product.info, [name]: value }
    });
  }


  const handleDataChange = (name, value) => {
    const error = name + "Error";

    if (value.length < 1) {

      errorChange(error, name, value);
    }

    else if (name === "name_myanmar" ||
      name === 'name_english') {
      if (value.length > 40) {
        errorLimitChange(error, name, value, 40);
      } else if (value.length <= 40) {
        errorClearChange(error, name, value);
      }
    }

    else if (parseInt(value) === 0 &&
      ((name === "brand_id") ||
        (name === "shop_id") ||
        (name === "category_id") ||
        (name === "subcategory_id"))) {

      errorChange(error, name, value);
    }

    else {
      errorClearChange(error, name, value);
    };
  }


  const handleVariantChange = variants => {

    setProduct({ ...product, variants: [...variants] });
  };

  const handleVariantRemove = (index) => {

    product.variants.splice(index, 1);
    setProduct({
      ...product,
      variants: [...product.variants]
    })

  }

  const handleVariantFileChange = variants => {
    console.log('Variants ... ' + variants);
    setProduct({ ...product, variants: [...variants] });
  };

  const nextTab = () => {
    if (tab === 'productinfo') {
      history.push('/admin/product/create/productdescription');
    }
    if (tab === 'productdescription') {
      history.push('/admin/product/create/productvariant')
    }
  }

  const previousTab = () => {
    if (tab === 'productdescription') {
      history.push('/admin/product/create/productinfo');
    }
    if (tab === 'productvariant') {
      history.push('/admin/product/create/productdescription');
    }
  }

  const handleSubmit = async () => {
    let body = {
      specification: product.info.specification,
      rating: 5,
      name_myanmar: product.info.name_myanmar,
      name_english: product.info.name_english,
      description_myanmar: draftToHtml(
        convertToRaw(product.info.description_myanmar.getCurrentContent())
      ),
      description_english: draftToHtml(
        convertToRaw(product.info.description_english.getCurrentContent())
      ),
      variant: [...product.variants],
      category_id: product.info.category_id,
      subcategory_id: product.info.subcategory_id,
      brand_id: product.info.brand_id
    };

    for (let i = 0; i < product.variants.length; i++) {
      let images = [];
      let variant = product.variants[i];
      for (let j = 0; j < variant.images.length; j++) {
        let file = variant.images[j];
        const url = await uploadImage(file);
        images.push(url);
      }
      body.variant[i].images = images;
    }

    fetchData(fetch.postShopByProduct(product.info.shop_id, body));
  };

  useEffect(() => {

    if (product.info.category_id > 0) {
      fetchData(fetch.getSubCategory(product.info.category_id));
    }
  }, [product.info.category_id, fetch, fetchData]);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'productinfo', label: 'Product Info' },
    { value: 'productdescription', label: 'Product Description' },
    { value: 'productvariant', label: 'Product Variant' }
  ];

  useEffect(() => {

    product.variants.map((obj) => {
      console.log(obj.color.length);
      if (parseInt(obj.qty) > 0 && parseInt(obj.qty) <= 999999 &&
        parseInt(obj.price) > 0 && parseInt(obj.price) <= 9999999999 &&
        obj.images.length > 0 &&
        obj.qty !== "" &&
        obj.qty !== "-" &&
        obj.price !== "" &&
        obj.price !== "-" &&
        (obj.color.length === 0 ||
          obj.color.length <= 20) &&
        (obj.size.length === 0 ||
          obj.size.length <= 20)) {
        setVariantDisable(true);
        setImageDisable(true);
      }

      else {
        setVariantDisable(false);
        setImageDisable(false);
      }
    })

  }, [product.variants])

  if (!tab) {
    return <Redirect to={'/admin/product/create/productinfo'} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/admin/product/create" />;
  }


  if ((product.info.category_id !== 0 && product.info.category_id !== "0") &&
    (product.info.subcategory_id !== 0 && product.info.subcategory_id !== "0") &&
    (product.info.brand_id !== 0 && product.info.brand_id !== "0") &&
    (product.info.name_myanmar.length > 0 && product.info.name_myanmar.length <= 40) &&
    (product.info.name_english.length > 0 && product.info.name_english.length <= 40) &&
    (product.info.description_myanmar.getCurrentContent().getPlainText().length > 0 &&
      product.info.description_myanmar.getCurrentContent().getPlainText().length <= 300) &&
    (product.info.description_english.getCurrentContent().getPlainText().length > 0 &&
      product.info.description_english.getCurrentContent().getPlainText().length <= 300) &&
    product.info.description_english.getCurrentContent().getPlainText().length > 0 &&
    parseInt(product.info.shop_id) !== 0) {
    infoDisable = true;
  }

  if (infoDisable && variantDisable && imageDisable) {
    myDisable = false;
  }

  if (variantDisable === false) {
    myDisable = true;
  }


  return (
    <Page
      className={classes.root}
      title="Product Create"
    >
      <Header disable={myDisable} onSubmitClick={handleSubmit} />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <div className={classes.content}>
        {tab === 'productinfo' && (
          <ProductInfo
            brands={brands}
            categories={categories}
            info={product.info}
            onChange={handleDataChange}
            shops={shops}
            errors={errors}
            subcategories={subcategories}
          />
        )}
        {tab === 'productdescription' && (
          <ProductDescription
            error={errorDescription}
            setError={setErrorDescription}
            description={product.info}
            onChange={handleDataChange}
          />
        )}
        {tab === 'productvariant' && (
          <Variants
            data={data}
            setData={setData}
            onRemove={handleVariantRemove}
            onChange={handleVariantChange}
            onChangeFile={handleVariantFileChange}
          />
        )}
      </div>
      <Button disabled={prevDisable} onClick={previousTab} className={classes.spacing} color="primary" variant="contained">Back</Button>
      <Button disabled={nexDisable} onClick={nextTab} className={classes.spacing} color="primary" variant="contained">Next</Button>
    </Page>
  );
};

ProductCreate.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ category, subcategory, brand, shop, product }) => ({
  categories: category.categories,
  subcategories: subcategory.subcategories,
  brands: brand.brands,
  shops: shop.shopArray,
  createSuccess: product.successCreate
});

export default withRouter(connect(mapStateToProps, { fetchData })(ProductCreate));
